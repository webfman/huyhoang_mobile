

$(document).ready(function () {

    document.oncontextmenu = function () { return false; }

    $('#files_upload').kendoUpload({
        async: {
            autoUpload: false,
            saveUrl: 'UploadFileImg.aspx'
        },
        error: function (e) {

            this.wrapper.closest('.row').siblings().eq(1).find('span').text('Upload không thành công!');
            this.wrapper.closest('.row').siblings().eq(1).find('span').toggleClass('text-success').toggleClass('text-danger');
        },
        localization: {
            dropFilesHere: 'Kéo thả file vào đây để upload',
            headerStatusUploaded: 'Đã upload xong',
            headerStatusUploading: 'Đang upload',
            select: 'Chọn file...',
            statusFailed: 'Upload không thành công',
            statusUploaded: 'Đã upload xong',
            statusUploading: 'Đang upload',
            uploadSelectedFiles: 'Upload'

        },
        multiple: false,
        success: function (e) {
            Path = e.response.FilePath;
            this.wrapper.closest('.row').siblings().eq(1).find('input').val(e.response.FilePath);
            this.wrapper.closest('.row').siblings().eq(1).find('span').text('Đã upload!');
            this.wrapper.closest('.row').siblings().eq(1).find('span').toggleClass('text-danger').toggleClass('text-success');

            var request = $.ajax({
                type: "POST",
                url: "assets/ajax/Ajax_ThongTinCaNhan.aspx",
                data: {

                    cmd: 'ThayDoiHinhDaiDien',
                    username: $("[id$=_hidEmail]").val(),
                    filepath: Path

                },
                dataType: 'json'
            });
            request.done(function (msg) {

                if (msg[0].ErrorMessage == null) {                    

                    //window.location.reload(true);
                    window.location.replace("DangXuat.aspx?p=ThongTinCaNhan.aspx");
                }
                else {
                    alert(msg[0].ErrorMessage);
                }

                

            });
            request.fail(function (jqXHR, textStatus) {
                alert("Request failed: " + textStatus);
            });


            
        },
        upload: function (e) {
            e.data = { username: $("[id$=_hidEmail]").val() };
        },
        select: function (e) {
            var ext = e.files[0].extension.toLowerCase();
           if (ext !== ".jpg" && ext !== ".png") {
                e.preventDefault();
                alert('Chỉ cho phép upload file văn bản ở định dạng .jpg hay .png');
                return;
            }
            if (e.files[0].size > 10485760) {
                e.preventDefault();
                alert('Dung lượng file upload vượt quá giới hạn! Lớn hơn 10 Mb!');
                return;
            }
        }
    });
});

function Ham_Luu() {
    
    var request = $.ajax({
        type: "POST",
        url: "assets/ajax/Ajax_ThongTinCaNhan.aspx",
        data: {
            cmd: 'CapNhatThongTinCaNhan',
            Ho: $("[id$=_txt_ho]").val(),
            Ten: $("[id$=_txt_ten]").val(),
            MaNhanVien: $("[id$=_txt_msnv]").val(),
            SDT: $("[id$=_txt_sdt]").val(),
            username: $("[id$=_hidEmail]").val()
        },
        dataType: 'json'
    });
    request.done(function (msg) {

        if (msg[0].ErrorMessage == null) {
            alert("Đã cập thành công thông tin cá nhân!");
            //window.location.reload(true);
            window.location.replace("DangXuat.aspx?p=ThongTinCaNhan.aspx");
        }
        else {
            alert(msg[0].ErrorMessage);
        }

    });
    request.fail(function (jqXHR, textStatus) {

        alert("Request failed: " + textStatus);
    });
}


function isNumber(evt) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
}