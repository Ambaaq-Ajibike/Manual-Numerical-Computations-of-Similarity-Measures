let aElement = document.querySelector("#stringA");
let bElement = document.querySelector("#stringB");
let submit = document.querySelector("#submit");
let tableBody = document.querySelector("#table-body");

let executeAlgorithm = (a, b) => {
    let setA = TurnToBygram(a);
    let setB = TurnToBygram(b);
console.log(setA.length, setB.length)
    let D = (setA.length + setB.length);

    let int = new Set(setA.filter(x => setB.includes(x)))

    let n = (setA.length > setB.length) ? setA.length : setB.length;
    let t2 = new Set([...setA, ...setB]);
    
    let intersect = int.size;
    let union = (new Set([...setA, ...setB]).size)

    let C = new Set(Array.from(t2).filter(x => !Array.from(int).includes(x))).size

    let jaccard = () => {
        return intersect / union;
    }

    let diceCoefficient = () => {
        return (2 * intersect) / D;
    }

    let rasselRao = () => {
        return (intersect) / n;
    }

    let faithsimilarity = () => { 
        // console.log(n, union, intersect)
        let bar = (n / union) 
        let intersectBar =  bar/ intersect;
        return (intersect  + intersectBar) / (2 * n);
    }

    let sorensenDice = () => {
        console.time("tests");
        let result =  (2 * intersect) / D;
        console.timeEnd("tests") 
        return result;
    }

    let newImprovedSorensenDice = () => {
        let start = new Date().getTime();
        console.time("test");
        let result = ((2 * D * intersect) + C) / D**2;
        let end = new Date().getTime();
        console.log(end - start, end, start);
        console.timeEnd("test")
        return result;
    }
    const xValues = ["Jaccard", "Rassel", "Faith", "Sorensen", "New"];
const yValues = [jaccard().toFixed(3), rasselRao().toFixed(3), faithsimilarity().toFixed(3), sorensenDice().toFixed(3), newImprovedSorensenDice().toFixed(3)];

new Chart("myChart", {
  type: "line",
  data: {
    labels: xValues,
    datasets: [{
      backgroundColor:"rgba(0,0,255,1.0)",
      borderColor: "rgba(0,0,255,0.1)",
      data: yValues
    }]
  },
});

var barColors = ["red", "green","blue","orange","brown"];

new Chart("histogram", {
  type: "bar",
  data: {
    labels: xValues,
    datasets: [{
      backgroundColor: barColors,
      data: yValues
    }]
  },
});
    tableBody.innerHTML += `
            <tr>
            <th scope="row">
                A : ${a}
                <br/>
                B : ${b}
            </th>
            <td>
                    ${jaccard().toFixed(3)}
                    <br/>
                    ${performance.now() }ms
            </td>
            <td>
                    ${rasselRao().toFixed(3)}
                    <br/>
                    ${performance.now() }ms
            </td>
            <td>
                    ${faithsimilarity().toFixed(3)}
                    <br/>
                    ${performance.now() }ms
            </td>
            <td>
                    ${sorensenDice().toFixed(3)}
                    <br/>
                    ${performance.now().toFixed(3)}ms
            </td>
            <td>
                    ${newImprovedSorensenDice().toFixed(3)}
                    <br/>
                            ${performance.now() }ms
                    </td>
        </tr>
    `
}

submit.addEventListener('click', () =>
{
    let a = aElement.value;
    let b = bElement.value;
    executeAlgorithm(a, b)
} );



let fileUpload = document.querySelector("#file-upload");
let upload = () => {
    const file = fileUpload.files[0];
    const reader = new FileReader();

    reader.onload = function() {
      const data = new Uint8Array(reader.result);
      const workbook = XLSX.read(data, {type: 'array'});
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
    jsonData.forEach(element => {
        executeAlgorithm(element.A, element.B)
        alert(`Total time taken to read from file ${performance.now()} ms`)
    });
      console.log(jsonData);
    }

    reader.readAsArrayBuffer(file);
    
}



function  TurnToBygram(sentence)
{
    var sentenceArray = sentence.split(" ");
    let response = [];
    for(let i = 0; i < sentenceArray.length; i++)
    {
        let word = sentenceArray[i];
        for (let j = 0; j < word.length-1; j++)
        {
            if (i == 0)
            {
                if (word.length != 1)
                {
                    response.push(`${word[j]}${word[j+1]}`);
                }
                else
                {
                    response.push(`${word[j]}`);
                }
            }
            else
            {
                response.push(`${word[j]}${word[j+1]}`);
            }
        }
    }
    return response;
}