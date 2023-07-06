vec2 position;
uniform vec2 resolution;
uniform sampler2D u_texture;
uniform float blurRadius;

// pre computed kernel from
// https://www.w3.org/Talks/2012/0125-HTML-Tehran/Gaussian.xhtml#:~:text=The%20Gaussian%20blur%20is%20a,x%202%202%20%CF%83%202
mat3 kernel = mat3(
  0.045, 0.122, 0.045,
  0.122, 0.332, 0.122,
  0.045, 0.122, 0.045);

vec4 getAverageColor(vec2 uv) {
  vec4 color = vec4(0.0);
  float total = 0.0;

  for(float x = -blurRadius; x <= blurRadius; x++) {
    for(float y = -blurRadius; y <= blurRadius; y++) {
      vec4 currentColor = texture2D(u_texture, uv + vec2(x, y) / resolution.xy);
      float weight = kernel[int(x + blurRadius)][int(y + blurRadius)];
      color += currentColor * weight;
      total += weight;
    }
  }

  return color / total;
}

void main(void) {
  // get the current position
  vec2 position = (gl_FragCoord.xy / resolution.xy);
  vec2 origin = vec2(0.0, 0.0);

  vec4 color = getAverageColor(position);

  // Set the output color to the modified color
  gl_FragColor = color;
}