function moveModal(){
   
    var modal = $('exampleModalLong');
    console.log('modal is: ');
    console.log(modal);
    var body = $('body');
    console.log('body found');
    console.log(body)
    modal.insertAfter(body);
    alert("hey now move done");
}