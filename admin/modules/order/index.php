<?php
require("../admin/include/functions.php");
AP::sql();
$id = $_GET['id'];

$data = AP::getArray("SELECT *, (count * price) as total FROM `web_order_list` WHERE `orderID`='$id'");
$personal = AP::getArray("SELECT `address`, `phone`, `entrance`, `floor`, `flat`, `comment` FROM `web_orders` WHERE `id`='$id'");
$prow = $personal[0];
$addr = $prow["address"];
$flat = $prow["flat"];
$entrance = $prow["entrance"];
$floor = $prow["floor"];
if($flat){
    $addr = "{$addr} / ბინა {$flat}";
}
if($entrance){
    $addr = "{$addr} / სადარბაზო {$entrance}";
}
if($floor){
    $addr = "{$addr} / სართული {$floor}";
}
?>
    <meta charset="UTF-8">
    <meta name="robots" content="noindex, nofollow" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
<style>
*, body {
margin: 0;
padding: 0;
}
h3 {
    text-align: center;
    margin-top: 20px;
    margin-bottom: 5px;
    font-size: 24px;
}
table {
  border-spacing: 1;
  border-collapse: collapse;
  background: white;
  border-radius: 6px;
  overflow: hidden;
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
  position: relative;
}
table * {
  position: relative;
}
table td, table th {
  padding-left: 8px;
}
table thead tr {
    background: #211c00;
    font-size: 16px;
    color: #fff;
}
table tbody tr {
  height: 48px;
  border-bottom: 1px solid #E3F1D5;
}
table tbody tr:nth-of-type(even) {
    background: #f3f3f3;
  }
table tbody tr:last-child {
  border: 0;
}
table td, table th {
  text-align: left;
}
table td.l, table th.l {
  text-align: right;
}
table td.c, table th.c {
  text-align: center;
}
table td.r, table th.r {
  text-align: center;
}
li {
    list-style: none;
    font-size: 18px;
    margin: 0 0 10px 10px;
}
body {
  background: #eee;
  font: 400 14px 'Calibri','Arial';
  padding: 20px;
}


.total {
    font-size: 20px;
    text-align: right;
    margin: 15px 0;
}
blockquote {
  color: white;
  text-align: center;
}

@media screen and (max-width: 35.5em) {
  table {
    display: block;
    border-radius: 0;
  }

  table tbody tr {
    height: auto;
    padding: 8px 0;
  }

  table tbody tr td:last-child {
    margin-bottom: 0;
  }
  table tbody tr td:before {
    position: absolute;
    font-weight: 700;
    width: 40%;
    left: 10px;
    top: 0;
  }

  table tbody tr td:nth-child(3) {
    display: none
  }

  table thead tr th:nth-child(3) {
      display: none
    }

    body {
      padding: 0px;
    }

}


</style>
<h3>
    შეკვეთა №: <?= $id; ?>
</h3>
<ul>
<li>მისამართი: <?= $addr; ?></li>
<li>ტელეფონი: <?= $prow['phone']; ?></li>
</ul>
<table class="table">
<thead>
<tr>
<th>
#
</th>
<th>
დასახელება
</th>
<th>
რაოდ.
</th>
<th>
ფასი
</th>
<th>
ჯამი
</th>
</tr>
</thead>
<tbody>
<?php
$i = 0;
$total = 0;
foreach($data as $row) { $i++; $total = $total + $row["total"];?>
<tr>
<td>
<?= $i ;?>
</td>
<td>
<?= AP::getProductName($row["itemID"]);?>
</td>
<td>
<?= $row["count"];?>
</td>
<td>
<?= number_format($row["price"], 2, ".", " ");?> GEL
</td>
<td>
<?= number_format($row["total"], 2, ".", " ");?> GEL
</td>
</tr>
<?php
}
?>
</tbody>
</table>

<div class="total">
სულ გადასახდელი: <?= number_format($total, 2, ".", " "); ?> GEL
</div>
