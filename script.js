let aElement = document.querySelector("#stringA");
let bElement = document.querySelector("#stringB");
let submit = document.querySelector("#submit");
let tableBody = document.querySelector("#table-body");

let executeAlgorithm = (a, b) => {
    var startTime = performance.now();;

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
    let arrTime = [];
    let jaccard = () => {
        let result = intersect / union;
        const endTime = performance.now();
        const time = endTime - startTime;
        startTime = performance.now();;
        arrTime.push(
            {
               name: "Jaccard",
               time:time
            }
            );
        return result;
    }


    let rasselRao = () => {
        const result =  (intersect) / n;
        const endTime = performance.now();
        const time = endTime - startTime;
        startTime = performance.now();;
        arrTime.push(
            {
               name: "Rassel",
               time:time
            }
            );
        return result;
    }

    let faithsimilarity = () => {
        
        let bar = (n / union) 
        let intersectBar =  bar/ intersect;
        let result = (intersect  + intersectBar) / (2 * n);
        const endTime = performance.now();
        const time = endTime - startTime;
        arrTime.push(
            {
               name: "Faith",
               time:time
            }
            );
        return result;
    }

    let sorensenDice = () => {
        let result =  (2 * intersect) / D;
        const endTime = performance.now();
        const time = endTime - startTime;
        startTime = performance.now();;
        arrTime.push(
            {
               name: "Sorrensen",
               time:time
            }
            );
        return result;
    }

    let newImprovedSorensenDice = () => {
        let result = ((2 * D * intersect) + C) / D**2;
        const endTime = performance.now();
        const time = endTime - startTime;
        startTime = performance.now();;
        arrTime.push(
            {
               name: "NewImproved",
               time:time
            }
            );
        return result;
    }
    const xValues = ["Jaccard", "Rassel", "Faith", "Sorensen", "New"];
    const yValues = [jaccard().toFixed(3), rasselRao().toFixed(3), faithsimilarity().toFixed(3), sorensenDice().toFixed(3), newImprovedSorensenDice().toFixed(3)];

    generateCharts(xValues, yValues, arrTime);


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
           
                response.push(`${word[j]}${word[j+1]}`);
        }
    }
    return response;
}


let generateCharts = (xValues, yValues, arrTime) => {
    
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
        
        options: {
            responsive: true,
        title: {
            display: true,
            text: 'Chart With New Improved'
        }
        }
        });
        new Chart("myChart", {
        type: "bar",
        data: {
            labels: xValues.slice(0, -1),
            datasets: [{
            backgroundColor: ["green", "red", "brown", "orange"],
            data: yValues.slice(0, -1)
            }]
        },
        options: {
            responsive: true,
        title: {
            display: true,
            text: 'Chart Without New Improved'
        }
        }
        });
        new Chart("timegraph", {
        type: "bar",
        data: {
            labels: arrTime.map(x => x.name),
            datasets: [{
            backgroundColor: ["green", "red", "brown", "orange"],
            data: arrTime.map(x => x.time)
            }]
        },
        options: {
            responsive: true,
        title: {
            display: true,
            text: 'Time Chart Without New Improved'
        }
        }
        });

        new Chart("timegraphnew", {
        type: "bar",
        data: {
            labels: arrTime.map(x => x.name),
            datasets: [{
            backgroundColor: ["green", "red", "brown", "orange"],
            data: arrTime.map(x => x.time)
            }]
        },
        options: {
            responsive: true,
        title: {
            display: true,
            text: 'Time Chart With New Improved'
        }
        }
        });
}