vec2 position;
uniform vec2 resolution;
uniform sampler2D u_texture;
uniform float u_angle;

const vec3 grayness_mixer = vec3(0.2126, 0.7152, 0.0722);

void main(void) {
  // get the current position
  vec2 position = (gl_FragCoord.xy / resolution.xy);
  vec4 color = texture2D(u_texture, position);

  // Set the output color to the modified color
  gl_FragColor = color;
}