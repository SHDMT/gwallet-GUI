function checkPassword(passwd) {
    let pwdHash = sessionStorage.getItem('pwdHash')
    if (createDataHash(passwd) == pwdHash) {
        return true
    } else {
        return false
    }
}

function lockModalErrInfo(errInfo) {
    $('.lock-modal-error-info').text(errInfo);
}

$("#modal-container").off().on("click", ".addrbook-btn-succ", () => {
    let target = $("#add-contacts .add-contacts-hidden").val();
    let addr = $('.addressbook-radio:checked').attr("data-addr");
    $(target).val(addr);
    $('#add-contacts').modal("toggle");
});

$('.btn-lockmodal-submit').on('click', () => {
    let passwd = $('.lock-modal-password').val();
    if (checkPassword(passwd)) {
        $('.lock-modal').modal("toggle");
        $('.lock-modal-password').val("");
        lockModalErrInfo("");
    } else {
        lockModalErrInfo("密码错误");
    }
})