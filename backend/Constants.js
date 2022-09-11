"https://script.googleusercontent.com/macros/echo?user_content_key=6UTQpnRJNRwlU-XnzU3LQFhumGx9UQPStT93MHwmXmxIhRalYGP4Z2c4Rw2HWR1WeAeqMvPhyxt41TCU0Z7DvQjnSM07LOdFm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnH810grv4XdUG_LwF2eyuMa5ufkfaA__S5UK4miFUlt12chAkuCJLDM1zrPx1aiUl95iAjojgKbQq7vfscZ4onCrcFK6sgX0iw&lib=Ms-_GpD7w53h-KAzT1xgMOxu7vu5ZmFTa"


function doGet(req){
    var doc= SpreadsheetApp.getActiveSpreadsheet();
    var sheet=doc.getSheetByName('test');
    var values=sheet.getDataRange().getValues();
    var output=[]
    for (var i=0;i<values.length;i++){
      var row={}
      row['Order ID']=values[i][0]
      row['Order Date']=values[i][1]
      row['Order Quantity']=values[i][2]
      row['Sales']=values[i][3]
      row['Ship Mode']=values[i][4]
      row['Profit']=values[i][5]
      row['Unit Price']=values[i][6]
      row['Customer Name']=values[i][7]
      row['Customer Segment']=values[i][8]
      row['Product Category']=values[i][9]
  
      output.push(row)
    }
    return ContentService.createTextOutput(JSON.stringify({data:output})).setMimeType(ContentService.MimeType.JSON)
  
  }