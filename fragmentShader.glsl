vec2 position;
uniform float time;
uniform vec2 resolution;
uniform sampler2D u_texture;

const vec3 grayness_mixer = vec3(0.2126, 0.7152, 0.0722);

void main(void) {
  // get the current position
  vec2 position = (gl_FragCoord.xy / resolution.xy);
  // the color at the given position
  vec4 color = texture2D(u_texture, position);
  
  float scale = 0.5 + 0.5 * sin(position.x * 50.0 + time * 10.0);
  // Mix the color with the grayness
  color.r = mix(color.r, dot(color.rgb, grayness_mixer), scale);
  color.g = mix(color.g, dot(color.rgb, grayness_mixer), scale);
  color.b = mix(color.b, dot(color.rgb, grayness_mixer), scale);

  // Set the output color to the modified color
  gl_FragColor = color;
}