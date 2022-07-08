addEventListener('message', function(event){
    var poy = event.data;
    if (poy.open == true){
        SetupItems(poy.info);
        $('.maincon').fadeIn();
    }
})


document.onkeydown = function(data){
    if (data.which == 27){
        $('.maincon').fadeOut();
        $.post('https://vC-input/close')
    }
}

$(document).on('click', '.submit', function(){
    let cb = CheckIfRequired()
    console.log(cb)
    if (cb) {
        let tablo = {}
        let inputs = document.getElementsByClassName('optionInput')
        let fax = 0
        for (let index = 0; index < inputs.length; index++){
            let val = $(inputs[index]).val();
            fax = index + 1
            tablo[fax] = {val:val}
        }
        let selects = document.getElementsByClassName('optionSelect')
        

        for (let index = 0; index < selects.length; index++){
            let value = selects[index].options[selects[index].selectedIndex].value
            let val = $(selects[index]).val();
            tablo[fax + 1] = {val:val}
        }
        $.post('https://vC-input/submit', JSON.stringify({tablo:tablo}))
        $('.maincon').fadeOut();
    } else {
        $.post('https://vC-input/notify', JSON.stringify({message:'You have not yet filled all required spaces!'}))
    }
})

function CheckIfRequired(){
    cango = true
    let inputs = document.getElementsByClassName('optionInput')
    for (let pimps = 0; pimps < inputs.length; pimps++){
        let req = $(inputs[pimps]).parent().attr('data-required')

        if (req == 'true'){
            console.log('geldi')
            if ($(inputs[pimps]).val() == ''){

                cango = false
            }
        }
    }
    return cango
}

function SetupItems(info){
    $('.appendablediv').html('')
    $.each(info, function(index, output){
        if (output.required == undefined){
            output.required = false
        }
        htmlsorgu = ""
        if (output.type == 'input'){
            htmlsorgu = `<div class="newOption" data-optid="${index}" data-required="${output.required}">
            <span class="optionDesc">${output.title}</span>
            <div class="emojiBox"><i class="${output.icon}"></i></div>
            <input type="text" class="optionInput">
            </div>`
        } else {
            let selectoptions = GetSelect(output.options)
            htmlsorgu = `<div class="newOption" data-optid="${index}" data-required="${output.required}">
            <span class="optionDesc">${output.title}</span>
            <div class="emojiBox"><i class="${output.icon}"></i></div>
            <select name="" id="" class="optionSelect">
            ${selectoptions}
            </select>
        </div>`
        }
        $('.appendablediv').append(htmlsorgu)
    })

}

function GetSelect(options){
    let htmlsorgu
    $.each(options, function(index,output){

        if (index == 0){
            htmlsorgu =`<option value="${output.value}" class="deneme">${output.title}</option>`
        } else {
            htmlsorgu = htmlsorgu + `<option value="${output.value}" class="deneme">${output.title}</option>`
        }

        
    })
    return htmlsorgu
}