
$(() => {
    let checkLogin = (err) => {
        if (err) {
            alertModel.setHeader("通知");
            alertModel.setBody("需進行登入")
            let sendbtn = alertModel.getFooterObj().text("登入");
            let closebtn = alertModel.getFooterObj().text("關閉");
            closebtn.on("click", () => {
                window.close();
            });
            sendbtn.on("click", () => {
                chrome.storage.local.set({
                    "token": null
                }, () => {
                    $.fn.oAuthGetRequest().then((data) => {
                        window.open("https://www.plurk.com/OAuth/authorize?oauth_token=" + data);

                        alertModel.setHeader("輸入認證碼");
                        let getOAuthCode = $("<input>").attr("type", "text");
                        alertModel.body.empty();
                        alertModel.body.append(getOAuthCode);
                        let sendbtn = alertModel.getFooterObj().text("確認");
                        let closebtn = alertModel.getFooterObj().text("取消");
                        closebtn.on("click", () => {
                            window.close();
                        })
                        sendbtn.on("click", () => {
                            $.fn.oAuthGetAccess(getOAuthCode.val()).then((getAccessData) => {
                                window.location.reload();
                            });
                        })
                        alertModel.footer.empty();
                        alertModel.footer.append(sendbtn);
                        alertModel.footer.append(closebtn);
                        alertModel.show();
                    });
                });
            });
            alertModel.footer.empty();
            alertModel.footer.append(sendbtn);
            alertModel.footer.append(closebtn);
            alertModel.show();
        }
    }


    //取得所有文章
    let all = () => {
        $('#loading').removeAttr("style", "display:none;");
        $.fn.postApi("/APP/Users/me", {}, (error, data, ress) => {
            try {
                checkLogin(error);
                $("#show").text(data);
                $('#loading').attr("style", "display:none;");
            } catch (e) {
                console.log(e);
            }
        });
    }


    all();

});