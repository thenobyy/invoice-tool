console.log("Hallo Rechnung Script");

$(window).ready(function(){
    d = new Date();
    datum = d.getFullYear()+'-'+("0" + (d.getMonth() + 1)).slice(-2)+'-'+("0" + d.getDate()).slice(-2);
    docDatum = d.getDate()+'.'+("0" + (d.getMonth() + 1)).slice(-2)+'.'+d.getFullYear();
})


function addRow() {

    rowNumber = $(".modul-row").length + 1;

    console.log(rowNumber)

    $(".modul-container").append('\
    <div class="modul-row">\
        <div class="row-position">\
            <p class="posNum disabled">'+rowNumber+'</p>\
        </div>\
        <div class="row-desc">\
            <input type="text" class="desc" placeholder="record Service">\
            <p class="toggle-desc" onclick="toggleDesc(this)">+</p>\
        </div>\
        <div class="row-amount">\
            <input type="text" onfocusout="calc(this)" onfocus="this.select();" class="amount number" value="1">\
        </div>\
        <div class="row-type">\
            <input type="text" class="type" placeholder="Unit">\
        </div>\
        <div class="row-price">\
            <input type="text" onfocusout="calc(this),roundInput(this)" onfocus="this.select();" class="price number" value="0,00">\
        </div>\
        <div class="row-discount">\
            <input type="text" onfocusout="calc(this),roundInput(this)" onfocus="this.select();" class="discount number" value="0,00">\
        </div>\
        <div class="row-total">\
            <p class="total">0,00€</p>\
        </div>\
        <div class="row-action">\
            <a onclick="removeRow(this)">✕</a>\
        </div>\
        <div class="row-long-desc hidden" id="row-long-desc">\
            <textarea placeholder="long Description"></textarea>\
        </div>\
    </div>');


};

function removeRow(row) {
    if ($(".modul-row").length === 1) {
        $("desc").val("");
        $("amount").val("1");
        $("type").val("");
        $("price").val("0,00");
        $("discount").val("0,00");
        return;
    } else {
        $(row).parent().parent().remove();
        i = 1;
        $(".row-position").each(function (row) {
            $(row).val(i);
            i++;
        })
        $(".row-position").each(function (index) {
            $(this).html(index + 1)
        })
        calTotal();
    }
}

function calc(row) {
    if($(".amount").val() === ""){
        $(parent).children('div[class="row-amount"]').children().val("1");
    };
    
    if($(".price").val() === ""){
        $(parent).children('div[class="row-price"]').children().val("0,00");
    };

    if($(".discount").val() === ""){
        $(parent).children('div[class="row-discount"]').children().val("0,00");
    };

    parent = $(row).parent().parent();
    price = $(parent).children('div[class="row-price"]').children().val();
    console.log(price);
    price = price.replace(",", ".");
    amount = $(parent).children('div[class="row-amount"]').children().val().replace(",", ".");
    discount = $(parent).children('div[class="row-discount"]').children().val().replace(",", ".");

    result = price * amount;
    discount = discount / 100 * result;
    console.log(discount);
    result = result - discount;
    result = result.toFixed(2);
    result = result.replace(".", ",");
    totalInput = $(parent).children('div[class="row-total"]').children().html(result);
    calTotal();
}

function roundInput(input){
    round = $(input).val().replace(",", ".");
    round = Number(round).toFixed(2);
    round = round.replace(".", ",");
    $(input).val(round)
}

function calTotal() {
    total = 0.00
    $(".total").each(function () {
        amount = $(this).html().replace("€", "").replace(",", ".");
        total = total + Number(amount);

    })
    total = total.toFixed(2);
    total = total.replace(".", ",");
    $("#total-bill").html(total + " €");
}

function rechnungVorschau2(){
    event.preventDefault();
    $(".modul-row").each(function() {
        console.table([$(this).children('div[class="row-position"]').children().html(),$(this).children('div[class="row-desc"]').children().val(),$(this).children('div[class="row-amount"]').children().val(),$(this).children('div[class="row-type"]').children().val(),$(this).children('div[class="row-price"]').children().val(),$(this).children('div[class="row-discount"]').children().val(),$(this).children('div[class="row-total"]').children().html()]);
    })
}

function toggleDesc(row){
    parent = $(row).parent().parent();

    longDesc = $(parent).children('div[id="row-long-desc"]');

    console.log($(this).children('div[class="row-long-desc"]').children().val());

    longDesc.toggleClass("hidden");


}