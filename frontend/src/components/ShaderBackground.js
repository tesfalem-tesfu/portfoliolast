import { useEffect, useRef } from 'react';

const VERT = `
attribute vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const FRAG = `
precision mediump float;

uniform float u_time;
uniform vec2  u_resolution;
uniform vec2  u_mouse;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  vec2 mouse = u_mouse / u_resolution;
  float t = u_time * 0.4;

  // --- Base dark gradient ---
  vec3 col = mix(vec3(0.04, 0.02, 0.10), vec3(0.02, 0.04, 0.14), uv.y);

  // --- Grid lines ---
  float gridSize = 40.0;
  vec2 gridUV = gl_FragCoord.xy / gridSize;

  // Warp grid toward mouse
  vec2 toMouse = uv - mouse;
  float mDist = length(toMouse);
  float warp = 0.18 * smoothstep(0.6, 0.0, mDist);
  vec2 warpDir = normalize(toMouse + 0.001) * warp;
  vec2 warpedUV = gridUV - warpDir * (gridSize / u_resolution) * 12.0;

  vec2 gridFract = fract(warpedUV);
  float lineX = smoothstep(0.97, 1.0, gridFract.x) + smoothstep(0.03, 0.0, gridFract.x);
  float lineY = smoothstep(0.97, 1.0, gridFract.y) + smoothstep(0.03, 0.0, gridFract.y);
  float grid = max(lineX, lineY);

  // Grid color — subtle purple tint, brighter near mouse
  float gridBright = 0.07 + 0.18 * smoothstep(0.5, 0.0, mDist);
  col += vec3(0.3, 0.15, 0.6) * grid * gridBright;

  // --- Dot at grid intersections ---
  vec2 dotUV = fract(warpedUV) - 0.5;
  float dot = smoothstep(0.06, 0.0, length(dotUV));
  float dotBright = 0.12 + 0.3 * smoothstep(0.4, 0.0, mDist);
  col += vec3(0.5, 0.3, 1.0) * dot * dotBright;

  // --- Floating gradient orbs (3 slow-moving blobs) ---
  vec2 o1 = vec2(0.5 + 0.35 * sin(t * 0.7),       0.5 + 0.3  * cos(t * 0.5));
  vec2 o2 = vec2(0.2 + 0.25 * cos(t * 0.9 + 1.0), 0.6 + 0.25 * sin(t * 0.6 + 2.0));
  vec2 o3 = vec2(0.8 + 0.2  * sin(t * 0.5 + 3.0), 0.3 + 0.3  * cos(t * 0.8 + 1.5));

  float b1 = smoothstep(0.55, 0.0, length(uv - o1));
  float b2 = smoothstep(0.45, 0.0, length(uv - o2));
  float b3 = smoothstep(0.40, 0.0, length(uv - o3));

  col += vec3(0.20, 0.02, 0.45) * b1 * 0.55;
  col += vec3(0.05, 0.10, 0.50) * b2 * 0.45;
  col += vec3(0.45, 0.02, 0.30) * b3 * 0.40;

  // --- Mouse spotlight glow on grid ---
  float spotlight = smoothstep(0.35, 0.0, mDist) * 0.12;
  col += vec3(0.4, 0.2, 0.9) * spotlight;

  // --- Vignette ---
  float vig = smoothstep(0.9, 0.3, length(uv - 0.5) * 1.4);
  col *= 0.3 + 0.7 * vig;

  gl_FragColor = vec4(col, 1.0);
}
`;

function compileShader(gl, type, src) {
  const s = gl.createShader(type);
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(s));
    return null;
  }
  return s;
}

const ShaderBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) return;

    const vert = compileShader(gl, gl.VERTEX_SHADER, VERT);
    const frag = compileShader(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vert || !frag) return;

    const prog = gl.createProgram();
    gl.attachShader(prog, vert);
    gl.attachShader(prog, frag);
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1,-1, 1,-1, -1,1, -1,1, 1,-1, 1,1
    ]), gl.STATIC_DRAW);

    const pos = gl.getAttribLocation(prog, 'a_position');
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(prog, 'u_time');
    const uRes  = gl.getUniformLocation(prog, 'u_resolution');
    const uMouse= gl.getUniformLocation(prog, 'u_mouse');

    let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let sm    = { ...mouse };
    let animId;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', e => {
      mouse.x = e.clientX;
      mouse.y = window.innerHeight - e.clientY;
    });

    const start = performance.now();
    const render = () => {
      sm.x += (mouse.x - sm.x) * 0.08;
      sm.y += (mouse.y - sm.y) * 0.08;
      gl.uniform1f(uTime, (performance.now() - start) / 1000);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform2f(uMouse, sm.x, sm.y);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animId = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      gl.deleteProgram(prog);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full pointer-events-none z-0" />;
};

export default ShaderBackground;
