uniform vec2 resolution;
uniform sampler2D u_texture;
uniform float u_angle;

void main(void) {
  // get the current position
  vec2 position = (gl_FragCoord.xy / resolution.xy);
  vec4 color = texture2D(u_texture, position);

  // Right now just an unmodified color
  gl_FragColor = color;
}