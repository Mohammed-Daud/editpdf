
$(document).ready(function(){
    $('#add-more-pdf').click(function(){
        const html = `
            <div class="row">
                <div class="col-lg-9">
                    <div class="form-group">
                        <label for="">PDF</label>
                        <input type="file" class="form-control" name="pdf_name[]" required
                            accept="application/pdf">
                    </div>
                </div>
                <div class="col-lg-3">
                    <div class="form-group">
                        <label for="">Sequence</label>
                        <input class="form-control" name="pdf_sequence[]" required type="number" min="0" step="1">
                        <a href="javascript:void(0);" onclick="$(this).parent().parent().parent().remove();">Remove -</a>
                    </div>
                </div>
            </div>
        `;
        $('#pdf-input-con').append(html);
    });
});