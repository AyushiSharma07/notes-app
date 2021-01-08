const fs = require('fs')
const chalk=require('chalk')
const { title } = require('process')
const getNotes =()=> {
    return 'Your notes...'
}


const saveNotes = function (notes) {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = function () {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}


const addNote =(title, body)=>{
    const notes = loadNotes()
    // const duplicateNotes = notes.filter((note)=> note.title === title )
    const duplicateNote=notes.find((note)=> notes.title==title)
    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log('New note added!')
    } else {
        console.log('Note title taken!')
    }
}

const removeNote=function(title){
    const notes=loadNotes()
    const tokeep = notes.filter(function (note1) {
        return note1.title !== title
    })
    if (notes.length>tokeep.length) {
        console.log(chalk.green('your note is removed Sucessfully!!!'))
        saveNotes(tokeep)
    }
     else {
        console.log(chalk.red("can't find any note as such"))
    }

}
const listNotes=()=>{
    const notes=loadNotes()
    notes.forEach((note) => {
        console.log(note.title)
    })

}

const readNotes=(title)=>{
const notes=loadNotes()
const FindNote=notes.find((note)=> notes.title==title)
if(FindNote){
    console.log(chalk.magenta(FindNote.title))
    console.log(FindNote.body)
}
else{
    console.log(chalk.red("No Such Note Avaliable"))
}
}
module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote:removeNote,
    listNote:listNotes,
    readNotes:readNotes
}