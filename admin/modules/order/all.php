<?php
$date = date("Y-m-d");
AP::sql();
?>
<style>
.loader {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -79px;
}
.select {
    padding: 6px;
    font-size: 15px;
    border: 1px solid #ddd;
    border-radius: 4px;
    width: 100%;
}
</style>
დღის სტატისტიკა<div class="pull-right"><div class="input-group"><span class="input-group-addon"><i class="fa fa-calendar"></i></span><input type="text" class="form-control picker" placeholder="თარიღი" value="<?php echo date("Y-m-d"); ?>"><span class="input-group-btn"><a href="javascript:showResults();" class="btn btn-danger"><i class="fa fa-search"></i></a></span></div></div>
<hr>

<div id="loadingDiv" class="loader">
<center><i class='fa fa-pulse fa-spinner'></i> მონაცემები იტვერთება<br>გთხოვთ დაელოდოთ...</center>
</div>
<div class="row">
    <div class="col-md-12">
        <table class="table table-responsive table-hover">
            <thead>
                <tr>
                    <th>
                        შეკვ. №
                    </th>
                    <th>
                        შეკვეთის დრო
                    </th>
                    <th>
                        მისამართი
                    </th>
                    <th>
                        შეკვეთა
                    </th>
                    <th>
                        მობილური
                    </th>
                    <th>
                        ღირებულება
                    </th>
                    <th>
                        სტატუსი
                    </th>
                    <th>
                        <i class="fa fa-cogs"></i>
                    </th>
                </tr>
            </thead>
            <tbody id='bb'>
            </tbody>
        </table>
    </div>
</div>
</div>

<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-body">
        <iframe src="" id="frame" width="100%" height="800px" scrolling="true" frameborder="0"></iframe>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">OK</button>
      </div>
    </div>
  </div>
</div>

<script src="http://timeago.yarp.com/jquery.timeago.js"></script>
<script src="//ajarapalace.ge/admin/modules/order/jquery.timeago.ka.js"></script>
<link href="assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css" rel="stylesheet">
<script src="assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js"></script>
<script>
$(document).ready(function(e) {
	$(".picker").datepicker({
        format: "yyyy-mm-dd",
        endDate: new Date(),
        language: "ka",
        autoclose: true
	}).on("changeDate", function() {
	    showResults()
	});
       showResults();
    $('#loadingDiv')
        .hide()  // Hide it initially
});
function showModal(id) {
    $("#frame").attr("src","//ajarapalace.ge/order/"+id);
    $('#myModal').modal({
        show: true
    })
}
function showResults() {
    $("#loadingDiv").show();
    $.ajax({
	    url: "./ajax/?web_orders&date="+ $('.picker')[0].value,
        method: 'GET',
        dataType: "json",
	}).done(function(data) {
	    $("#loadingDiv").hide();
	    	var html = "";
        var statuses = [
            'დაუდასტურებელი',
            'შეკვეთა მიღებულია',
            'შეკვეთა გაუქმებულია'
        ]
	    if(data.success) {
	        $.each(data.result, function(item, {id, date, price, phone, address, entrance, floor, flat, comment, status, language}) {
	            addr = address;
	            if(flat){
	                addr = `${addr} / ბინა ${flat}`
	            }
	            if(entrance){
                    addr = `${addr} / სადარბაზო ${entrance}`
                }
                if(floor){
                    addr = `${addr} / სართული ${floor}`
                }
                if(status === '0') {
                    var className = "warning"
                }
                html += `<tr class="${className}">
                 <td>
                     ${id}
                 </td>
                 <td>
                     <time datetime="${date}" class="time"></time>
                 </td>
                 <td>
                     ${addr}
                 </td>
                 <td>
                      <button onClick="showModal(${id})" class="btn btn-default">სიის ნახვა</button>
                  </td>
                 <td>
                     ${phone}
                 </td>
                 <td>
                     ${price} GEL.
                 </td>
                 <td>
                     <select class="select" data-id='${id}'>
                        ${
                            statuses.map(function(item, index) {
                                return `<option value="${index}" ${status == index ? 'selected="true"' : ''}>${item}</option>`
                            })
                         }
                     </select>
                 </td>
                 <td>
                     <button class="btn btn-danger" onClick="change('delete', null, ${id})"><i class="fa fa-trash"></i></button>
                 </td>
             </tr>`
	        })
	    }
        $("#bb").html(html);
        $(".time").timeago()
        $(".select").change(function() {
            change('update', $(this).val(), $(this).data("id"))
        })
	}).error(console.error)
}
function change(type, value, id) {
    var data;
    if(type === "delete") {
        var answer = confirm("ნამდვილად გსურთ წაშალთ ეს შეკვეთა?");
        if(answer) {
            $.ajax({
                url: "./ajax/?web_change",
                data: {
                    type: "delete",
                    id: id,
                },
                method: 'POST',
                dataType: "json",
            }).done(function() {
                showResults();
            })
        }
    }
    if(type === "update") {
        $.ajax({
            url: "./ajax/?web_change",
            data: {
                type: "update",
                id: id,
                key: 'status',
                value: value
            },
            method: 'POST',
            dataType: "json",
        }).done(function() {
            showResults();
        })
    }

}
</script>
