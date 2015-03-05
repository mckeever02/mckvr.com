<script type="text/javascript">
$(document).ready(function() {
    $('table tr[id]').click(function(){
        $(this).closest("tr").remove();
        var obj = $(this);
         $.ajax({
           type: "POST",
           url: 'delete_package.php',
           data: { pk_id: obj.attr("id")},
           dataType: "json",
           success: function(data, evt) {
           if (data.success == "true") {
               alert('The record has been deleted successfuly!');
           } else {
               alert('error');
           }
           }
        })
    })
})
</script>