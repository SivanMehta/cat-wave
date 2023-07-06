vec2 position;
uniform float time;
uniform vec2 resolution;
uniform sampler2D u_texture;

const vec3 grayness_mixer = vec3(0.2126, 0.7152, 0.0722);

void main(void) {
  // get the current position
  vec2 position = (gl_FragCoord.xy / resolution.xy);
  vec2 origin = vec2(0.0, 0.0);
  // the color at the given position
  vec4 color = texture2D(u_texture, position);
  // all red color for debugging
  // vec4 color = vec4(1.0, 0.0, 0.0, 1.0);

  // determine how much to apply the mixer by the distance to the origin;
  float value = distance(position, origin) * 10.0 - time * 4.0;
  float dampening;
  if(sin(value) < 0.0) {
    dampening = 1.0;
  } else {
    dampening = 0.0;
  }

  // Mix the color with the grayness
  color.r = mix(color.r, dot(color.rgb, grayness_mixer), dampening);
  color.g = mix(color.g, dot(color.rgb, grayness_mixer), dampening);
  color.b = mix(color.b, dot(color.rgb, grayness_mixer), dampening);

  // Set the output color to the modified color
  gl_FragColor = color;
}