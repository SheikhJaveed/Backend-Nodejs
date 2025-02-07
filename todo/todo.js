const fs=require('fs');
const filePath='./tasks.json';


const loadTasks=()=>{
    try{
        const dataBuffer=fs.readFileSync(filePath);
        const dataJSON=dataBuffer.toString(); //dataJSON is different from JSON 
        return JSON.parse(dataJSON); //JSON.parse() is used to convert JSON string to JSON object
    }catch(e){
        return [];
    }
}

const addTask=(task)=>{
    const tasks=loadTasks();
    tasks.push({task});
    saveTasks(tasks);
    console.log("Task Added Successfully");
}

const saveTasks=(tasks)=>{
    const dataJSON=JSON.stringify(tasks); //JSON.stringify() is used to convert JSON object to JSON string
    fs.writeFileSync(filePath,dataJSON);
}

const listTask=()=>{
    const tasks=loadTasks();
    tasks.forEach((task,index)=>{
        console.log(`${index+1} - ${task.task}`);
    })
}

const removeTask=(taskNum)=>{
    const tasks=loadTasks();
    const index=taskNum-1; //for 1 based indexing
    if(index>=0 && index<tasks.length){
        tasks.splice(index,1);
        saveTasks(tasks);
        console.log("Task Removed Successfully");
    }else{
        console.log("Invalid Task Number");
    }
}
/**
 The process.argv property returns an array containing the command-line arguments passed when the Node.js process was launched. The first element will be execPath. See process.argv0 if access to the original value of argv[0] is needed. The second element will be the path to the JavaScript file being executed. The remaining elements will be any additional command-line arguments.
    > node process-args.js one two=three four
        Would generate the output:

        0: /usr/local/bin/node  (node is in this path)
        1: /Users/mjr/work/node/process-args.js (the path of the file)
        2: one  (the first argument)
        3: two=three (the second argument)
        4: four (the third argument)

        example: node todo.js add "Buy groceries" 
        here add -> command and "Buy groceries" -> argument
 */


const command = process.argv[2];
const argument = process.argv[3];

if(command==="add"){
    addTask(argument);
}else if(command==="list"){
    listTask();
}else if(command==="remove"){
    removeTask(parseInt(argument)); //parsing as int because argument is string
}else{
    console.log("Invalid Command");
}