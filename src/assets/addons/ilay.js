const ilay = {
    slug(str){
        let label = str.toLowerCase()
        let output =''
        for(let index = 0;index < label.length;index++){
            if(label[index] != '!' && 
            label[index] != '@' && 
            label[index] != '#' && 
            label[index] != '$' && 
            label[index] != '%' && 
            label[index] != '^' && 
            label[index] != '&' && 
            label[index] != '*' && 
            label[index] != '(' &&
            label[index] != ')' &&
            label[index] != ' ' &&
            label[index] != '/' &&
            label[index] != '|' &&
            label[index] != '[' &&
            label[index] != ']' &&
            label[index] != '{' &&
            label[index] != '}' &&
            label[index] != '$' &&
            label[index] != '"' &&
            label[index] != '/'){
                output += label.slice(index,index+1)
            }
        }
        return output
    }
}

console.log(ilay.slug('!TH%#E@ #B%#%ES^&T/|[]{}$"\" %L$$A$BEL^ &E&**#V%^E$%R*!'))
// should return 'the-best-label-ever'
console.log('!THE@ #BEST$ %LABEL^ &EVER*!'.slice(0,1))