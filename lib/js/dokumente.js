function createInvoice(docFunction) {
  event.preventDefault();

  var firma = "Musterkunde";
  var firmaadresse = "Musterstraße 123";
  var plz = "12345";
  var ort = "Musterdorf";
  var kdNr = "0001";
  var docHeader = "Rechnung";
  var docDate = "01.01.2024";
  var docNum = "R-0001";

  switch (docFunction) {
    case "vorschau":
      $(".disabled").removeAttr("disabled");
      var fonts = {
        Roboto: {
          normal: "fonts/Roboto-Regular.ttf",
          bold: "fonts/Roboto-Medium.ttf",
          italics: "fonts/Roboto-Italic.ttf",
          bolditalics: "fonts/Roboto-MediumItalic.ttf",
        },
      };

      tableRows = [];

      tableRows.push([
        { text: "Pos", style: "tableHeader" },
        { text: "Description", style: "tableHeader" },
        { text: "Amount", style: "tableHeader" },
        { text: "Unit", style: "tableHeader" },
        { text: "Price(€)", style: "tableHeader" },
        { text: "Total (€)", style: "tableHeader" },
      ]);

      $(".modul-row").each(function () {
        if (
          $(this).children('div[class="row-long-desc"]').children().val() ==
          undefined
        ) {
          tableRows.push([
            $(this).children('div[class="row-position"]').children().html(),
            {
              text: $(this).children('div[class="row-desc"]').children().val(),
              bold: true,
            },
            {
              text: $(this)
                .children('div[class="row-amount"]')
                .children()
                .val(),
              alignment: "center",
            },
            $(this).children('div[class="row-type"]').children().val(),
            {
              text: $(this).children('div[class="row-price"]').children().val(),
              alignment: "right",
            },
            {
              text: $(this)
                .children('div[class="row-total"]')
                .children()
                .html(),
              alignment: "right",
            },
          ]);
        } else {
          tableRows.push([
            $(this).children('div[class="row-position"]').children().html(),
            {
              text: [
                {
                  style: "positionHeader",
                  text:
                    $(this).children('div[class="row-desc"]').children().val() +
                    "\n",
                },
                {
                  text: $(this)
                    .children('div[class="row-long-desc"]')
                    .children()
                    .val(),
                  color: "grey",
                  margin: [0, 20, 0, 0],
                  fontSize: 10,
                },
              ],
            },
            $(this).children('div[class="row-amount"]').children().val(),
            $(this).children('div[class="row-type"]').children().val(),
            $(this).children('div[class="row-price"]').children().val(),
            $(this).children('div[class="row-total"]').children().html(),
          ]);
        }
      });

      var docDefinition = {
        pageMargins: [60, 60, 60, 15],
        info: {
          title: "Invoice Musterkunde",
        },

        footer: [
          {
            canvas: [
              { type: "line", x1: 0, y1: -55, x2: 2000, y2: -55, lineWidth: 1 },
            ],
          },
          {
            columns: [
              [
                { text: "Musterfirma", bold: true, fontSize: 8 },
                {
                  text: "\nMusterweg 2 \n0815 Musterstadt \n Steuernummer: 12/456/9876",
                  fontSize: 8,
                },
              ],
              [
                { text: "Kontakt", bold: true, fontSize: 8 },
                {
                  text: "\nTel.: 01234/9876543 \nmail@muster-firma.de \nhttps://muster-firma.de",
                  fontSize: 8,
                },
              ],
              [
                { text: "Bankverbindung", bold: true, fontSize: 8 },
                {
                  text: "\nMusterfirma\nMusterbank\nIBAN: DE12 3456 7890 0987 6543 21\nBIC: MUBADEXX",
                  fontSize: 8,
                },
              ],
            ],
            margin: [40, -50, 33, 1150],
          },
        ],

        header: {
          text: "Musterfirma",
          width: 180,
          alignment: "right",
          margin: [0, 30, 30, 0],
        },
        content: [
          {
            style: "kontaktdaten",
            text: [
              "Musterfirma\n",
              "Musterweg 2\n",
              "0815 Musterstadt\n",
              "Tel.: 0123/456789\n",
              "mail@muster-firma.de\n",
              "https://muster-firma.de\n",
            ],
          },
          {
            style: "kontaktdaten2",
            text: [
              "Musterfirma | ",
              "Musterweg 2 | ",
              "0815 Musterstadt",
            ],
          },
          {
            style: "kundenanschrift",
            text: firma + "\n" + firmaadresse + "\n" + plz + " " + ort,
          },
          {
            style: "docHeader",
            text: docHeader,
          },
          {
            style: "absatz",
            text: "We will invoice you for our services as follows.",
          },
          {
            style: "docDetails",
            table: {
              widths: ["*", "*", "*"],
              border: [false, true, false, true],
              body: [
                [
                  {
                    border: [false, true, false, false],
                    fillColor: "#eeeeee",
                    text: "Invoice-No.:",
                    style: "tableHeader",
                  },
                  {
                    border: [false, true, false, false],
                    fillColor: "#eeeeee",
                    text: "Customer-No.:",
                    style: "tableHeader",
                  },
                  {
                    border: [false, true, false, false],
                    fillColor: "#eeeeee",
                    text: "Date:",
                    style: "tableHeader",
                  },
                ],
                [
                  {
                    border: [false, false, false, true],
                    fillColor: "#eeeeee",
                    text: docNum,
                  },
                  {
                    border: [false, false, false, true],
                    fillColor: "#eeeeee",
                    text: kdNr,
                  },
                  {
                    border: [false, false, false, true],
                    fillColor: "#eeeeee",
                    text: docDate,
                  },
                ],
              ],
            },
          },
          {
            style: "tableExample",
            table: {
              widths: [25, "*", 40, 50, 50, 65],
              heights: 20,
              body: tableRows,
            },
            layout: "lightHorizontalLines",
          },
          {
            style: "gesamtBetrag",
            text: "Total             " + $("#total-bill").html(),
          },
          {
            style: "absatz",
            text: "Please transfer the amount to the account listed below within the next 2 weeks.",
          },
          {
            style: "absatz",
            text: "Many thanks for the good cooperation.",
          },
        ],
        styles: {
          header: {
            fontSize: 25,
            bold: true,
            alignment: "center",
          },
          kontaktdaten: {
            fontSize: 11,
            alignment: "right",
            margin: [0, 25, 0, 0],
          },
          kontaktdaten2: {
            fontSize: 9,
            margin: [0, -10, 0, 10],
          },
          kundenanschrift: {
            fontSize: 11,
            margin: [0, 0, 0, 70],
          },
          docHeader: {
            fontSize: 20,
            bold: true,
            margin: [0, 0, 0, 25],
          },
          docDetails: {
            fontSize: 11,
            margin: [0, 0, 0, 30],
          },
          tableHeader: {
            bold: true,
            fontSize: 12,
            color: "black",
          },
          tableExample: {
            border: [false, false, false, false],
          },
          positionHeader: {
            bold: true,
          },
          absatz: {
            fontSize: 11,
            margin: [0, 0, 0, 20],
          },
          gesamtBetrag: {
            bold: true,
            alignment: "right",
            margin: [0, 30, 20, 30],
            fontSize: 12,
            padding: [100],
          },
          alignLeft: {
            alignment: "right",
          },
        },
      };
      pdfMake.createPdf(docDefinition).open();
      return;
    case "erstellen":
      var safeData = [];
      $(".modul-row").each(function () {
        if (
          $(this).children('div[class="row-long-desc"]').children().val() ==
          undefined
        ) {
          safeData.push({
            position: $(this)
              .children('div[class="row-position"]')
              .children()
              .html(),
            beschreibung: $(this)
              .children('div[class="row-desc"]')
              .children()
              .val(),
            menge: $(this).children('div[class="row-amount"]').children().val(),
            einheit: $(this).children('div[class="row-type"]').children().val(),
            einzelPreis: $(this)
              .children('div[class="row-price"]')
              .children()
              .val(),
            rabatt: $(this)
              .children('div[class="row-discount"]')
              .children()
              .val(),
            gesamtPreis: $(this)
              .children('div[class="row-total"]')
              .children()
              .html(),
          });
        } else {
          safeData.push({
            position: $(this)
              .children('div[class="row-position"]')
              .children()
              .html(),
            beschreibung: $(this)
              .children('div[class="row-desc"]')
              .children()
              .val(),
            langeBeschreibung: $(this)
              .children('div[class="row-long-desc"]')
              .children()
              .val(),
            menge: $(this).children('div[class="row-amount"]').children().val(),
            einheit: $(this).children('div[class="row-type"]').children().val(),
            einzelPreis: $(this)
              .children('div[class="row-price"]')
              .children()
              .val(),
            rabatt: $(this)
              .children('div[class="row-discount"]')
              .children()
              .val(),
            gesamtPreis: $(this)
              .children('div[class="row-total"]')
              .children()
              .html(),
          });
        }
      });
      var urlParams = new URLSearchParams(window.location.search);
      var costumerId = urlParams.get("id");
      docDate = docDate.split(".");
      docDate = docDate[2] + "-" + docDate[1] + "-" + docDate[0];
      $.post("lib/App/js_db_con.php", {
        function: "create_doc",
        data: safeData,
        "r-nummer": docNum,
        "r-datum": docDate,
        "bill-amount": $("#total-bill").html(),
        firma: firma,
        id: costumerId,
      });

      history.back();
      return;
    case "update":
      var safeData = [];
      $(".modul-row").each(function () {
        safeData.push({
          position: $(this)
            .children('div[class="row-position"]')
            .children()
            .html(),
          beschreibung: $(this)
            .children('div[class="row-desc"]')
            .children()
            .val(),
          langeBeschreibung: $(this)
            .children('div[class="row-long-desc"]')
            .children()
            .val(),
          menge: $(this).children('div[class="row-amount"]').children().val(),
          einheit: $(this).children('div[class="row-type"]').children().val(),
          einzelPreis: $(this)
            .children('div[class="row-price"]')
            .children()
            .val(),
          rabatt: $(this)
            .children('div[class="row-discount"]')
            .children()
            .val(),
          gesamtPreis: $(this)
            .children('div[class="row-total"]')
            .children()
            .html(),
        });
      });
      var urlParams = new URLSearchParams(window.location.search);
      var costumerId = urlParams.get("id");
      var rechnungsId = urlParams.get("rID");
      docDate = docDate.split(".");
      docDate = docDate[2] + "-" + docDate[1] + "-" + docDate[0];
      $.post("lib/App/js_db_con.php", {
        function: "update_doc",
        data: safeData,
        "r-nummer": docNum,
        "r-datum": docDate,
        rID: rechnungsId,
        "bill-amount": $("#total-bill").html(),
        firma: firma,
        id: costumerId,
      });

      history.back();
      return;
    case "drucken":
      pdfMake.createPdf(docDefinition).download("Rechnung R-0001_" + firma);
      return;
    case "loeschen":
      var urlParams = new URLSearchParams(window.location.search);
      var costumerId = urlParams.get("id");
      var rechnungsId = urlParams.get("rID");
      $.post("lib/App/js_db_con.php", {
        function: "loeschen",
        rID: rechnungsId,
        id: costumerId,
      });
      history.back();
      return;
  }
}
