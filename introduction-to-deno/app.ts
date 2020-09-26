const text = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
Ut morbi tincidunt augue interdum. Morbi tincidunt ornare massa eget egestas purus. 
Eget nullam non nisi est sit amet facilisis magna etiam. Fermentum odio eu feugiat pretium. In cursus turpis massa tincidunt dui ut. 
Nisl nisi scelerisque eu ultrices vitae auctor eu augue. 
Volutpat consequat mauris nunc congue nisi vitae suscipit tellus mauris. 
Porta non pulvinar neque laoreet suspendisse. Pretium nibh ipsum consequat nisl vel pretium. 
Ut faucibus pulvinar elementum integer enim neque. Lorem ipsum dolor sit amet consectetur adipiscing elit. 
Non pulvinar neque laoreet suspendisse interdum consectetur libero id. Arcu non sodales neque sodales ut.
`;

const encoder = new TextEncoder();
const data = encoder.encode(text);

Deno.writeFile("loremipsum.txt", data)
  .then(() => {
    console.log("wrote to file successfully!");
  })
  .catch((err) => {
    console.log(err);
  });