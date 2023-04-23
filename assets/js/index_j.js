

$('#upload_pdfs').submit(function(event){
    event.preventDefault();

    var unindexed_array = $(this).serializeArray();
    var data = {};

    $.map(unindexed_array, function(n,i){
        data[n['name']] = n['value'];
    });

    var request = {
        "url" : "http://localhost:5050/upload-pdfs",
        "method" : "POST",
        "data" : data
    }

    $.ajax(request).done(function(res)  {
        alert("Pdfs uploaded Successfully");
        location.reload();
    })
});

$ondeletePdf = $('table tr td a#delete_pdf');
$ondeletePdf.click(function(event){
    var id = $(this).attr('pdfId');

    var request = {
        "url" : `http://localhost:5050/deltePdf/${id}`,
        "method" : "DELETE"
    }

    if(confirm("Do ypu really want to remove this pdf. ?")){
        $.ajax(request).done(function(res){
            alert("Pdf Removed Successfully..!!");
            location.reload();
        });
    }
})

$onselectPdf = $('table tr td a#selectPdf');
$onselectPdf.click(function(event){
    var id = $(this).attr('pdfId');

    var request = {
        "url" : `http://localhost:5050/printed/${id}`,
        "method" : "POST"
    }

    $.ajax(request).done(function(res){
        location.reload();
    })
})