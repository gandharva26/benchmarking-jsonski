const simdjson = require('simdjson');
const Benchmarkify = require("benchmarkify");
const JSki = require('jsonski')
const fs = require('fs');
const benchmark = new Benchmarkify("Benchmarking JSONSki").printHeader();


// Create a test suite for very large json
console.log("Jsonski vs simdJSON 26 MB")
console.time()
console.log(JSki.JSONSkiParser("$[10408].id", "/Users/gandharvadeshpande/testingsimdjson/datasets/test.json"));
console.timeEnd()

var file_contents_big = fs.readFileSync('/Users/gandharvadeshpande/testingsimdjson/datasets/test.json')
var str0 = file_contents_big.toString()
console.time()
console.log(simdjson.lazyParse(str0).valueForKeyPath("[10408].id"));
console.timeEnd()
console.time()
console.log(JSON.parse(str0)[10408]["id"]);
console.timeEnd()




// console.log("Jsonski vs Js 620kb")
// console.time()
// console.log(JSki.JSONSkiParser("$.search_metadata.completed_in", "twitter.json"));
// console.timeEnd()



const file_contents_small = fs.readFileSync('datasets/small.json');
const strSmall =  file_contents_small.toString()
const bench3 = benchmark.createSuite("JsonSKi vs Javascript for JSON oject (size: 472bytes)");
console.time()
console.log(JSki.JSONSkiParser("$.brewing.country.id", "datasets/small.json"));
console.timeEnd()
console.time()
console.log( simdjson.lazyParse(strSmall).valueForKeyPath("brewing.country.id"));
console.timeEnd()
console.time()
console.log( JSON.parse(strSmall)['brewing']['country']['id'] );
console.timeEnd()
// Add first func
bench3.add("JsonSki", () => {
     JSki.JSONSkiParser("$.brewing.country.id", "datasets/small.json");
});

bench3.ref("simDjson", () => {
    simdjson.lazyParse(strSmall).valueForKeyPath("brewing.country.id");
   });
//Add second func. This result will be the reference
bench3.ref("Javascript", () => {
   JSON.parse(strSmall)['brewing']['country']['id']; 
    
});


const results = []


console.log(results);

const file_contents_85 = fs.readFileSync('datasets/half-pokemon.json')
const str_85 = file_contents_85.toString()
const bench1 = benchmark.createSuite("JsonSKi vs SIMDJson vs Javascript for JSON oject (size: 85Kb)");


// Add first func
bench1.add("JsonSki", () => {
     JSki.JSONSkiParser("$.koko", "datasets/half-pokemon.json");
});

bench1.ref("simDjson", () => {
    simdjson.lazyParse(str_85).valueForKeyPath("koko");
   });
//Add second func. This result will be the reference
bench1.ref("Javascript", () => {
   JSON.parse(str_85)['koko']; 
    
});









const file_contents_177 = fs.readFileSync('datasets/pokemon.json')
const str_177 = file_contents_177.toString()
const bench2 = benchmark.createSuite("JsonSKi vs SIMDJson vs Javascript for JSON oject (size: 177Kb)");

// Add first func
bench2.add("JsonSki", () => {
   JSki.JSONSkiParser("$.tiger", "datasets/pokemon.json");
});


//Add second func. This result will be the reference
bench2.ref("simDjson", () => {
 simdjson.lazyParse(str_177).valueForKeyPath("tiger");
});

bench2.ref("Javascript", () => {
   JSON.parse(str_177).tiger
  });




const file_contents_561 = fs.readFileSync('datasets/payload.json')
const str_561 = file_contents_561.toString()
const bench5 = benchmark.createSuite("JsonSKi vs SIMDJson vs Javascript for JSON oject (size: 561Kb)");

// Add first func
bench5.add("JsonSki", () => {
   JSki.JSONSkiParser("$.sol2.tiger", "datasets/payload.json");
});


//Add second func. This result will be the reference
bench5.ref("simDjson", () => {
 simdjson.lazyParse(str_561).valueForKeyPath("sol2.tiger");
});

bench5.ref("Javascript", () => {
   JSON.parse(str_561).sol2.tiger
  });



  const file_contents_24 = fs.readFileSync('datasets/mid-pokemon.json')
  const str_24 = file_contents_24.toString()
  const bench6 = benchmark.createSuite("JsonSKi vs SIMDJson vs Javascript for JSON oject (size: 24Kb)");
  
  // Add first func
  bench6.add("JsonSki", () => {
     JSki.JSONSkiParser("$.drum", "datasets/mid-pokemon.json");
  });
  
  
  //Add second func. This result will be the reference
  bench6.ref("simDjson", () => {
   simdjson.lazyParse(str_24).valueForKeyPath("drum");
  });
  
  bench6.ref("Javascript", () => {
     JSON.parse(str_24).drum
    });

  async function runBench(){
    await bench3.run().then(res =>{
        results.push(res);
        console.log(res);
    } );

    await bench6.run().then(res =>{
        results.push(res);
        console.log(res);
    } );

    await bench2.run().then(res =>{
        results.push(res);
        console.log(res);
    } );
    await bench5.run().then(res =>{
        results.push(res);
        console.log(res);
    });
 
    const data = JSON.stringify(results)
    fs.writeFile('results.json', data, err => {
        if (err) {
          throw err
        }
        console.log('JSON data is saved.')
      })
}
runBench();





// convert JSON object to a string


// write JSON string to a file

// var file_contents3 = fs.readFileSync('pokemon.json')
// var str3 = file_contents3.toString()

// const bench5 = benchmark.createSuite("JsonSKi vs Javascript for JSON oject (size: 177Kb)");
// // Add first func
// bench5.add("JsonSki", () => {
//      JSki.JSONSkiParser("$.tiger", "pokemon.json");
// });


// //Add second func. This result will be the reference
// bench5.ref("Javascript", () => {
//    JSON.parse(str3)['tiger']; 
    
// });

// bench5.run().then(res => console.log(res));


// const bench6 = benchmark.createSuite("JsonSKi vs SimDJson for JSON oject (size: 177Kb)");
// // Add first func
// bench6.add("JsonSki", () => {
//      JSki.JSONSkiParser("$.tiger", "pokemon.json");
// });


// //Add second func. This result will be the reference
// bench6.ref("simDjson", () => {
//     simdjson.lazyParse(str3).valueForKeyPath("tiger");
//    });

// bench6.run().then(res => console.log(res))

// var file_contents2 = fs.readFileSync('test2.json')
// var str2 = file_contents2.toString()

// const bench4 = benchmark.createSuite("JsonSKi vs Javascript for JSON oject (size: 472bytes)");
// // Add first func
// bench4.add("JsonSki", () => {
//      JSki.JSONSkiParser("$.sol2.tiger", "test2.json");
// });


// //Add second func. This result will be the reference
// bench4.ref("Javascript", () => {
//    JSON.parse(str2)['sol2']['tiger']; 
    
// });

// bench4.run().then(res => console.log(res));
