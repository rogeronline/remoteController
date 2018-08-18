$( document ).ready(function() {
  $("#connectBtn").prop('disabled', true);
  $("#resetBtn").prop('disabled', true);

  $.getJSON("/config.json", function (data) {
    console.log(data.upload_folder);
    window.folder_path = data.upload_folder;
  });

});

function uploadFile(event) {
  swal(
    {
      loseOnClickOutside: false,
      title: "uploading!",
      icon: "info",
      buttons: false
    });
  console.log("1123");
  console.log(event.target.files[0].name);
  this.file = event.target.files[0];

  var uploadUrl = '/uploadfile?upload_folder='+window.folder_path;
  var formData = new FormData;
  formData.append('uploads[]', this.file, this.file.name);

  $.ajax({
    url: uploadUrl,
    type: 'POST',
    data: formData,
    processData: false,
    contentType: false,
    success: function (data, status, jqXHR) {
      $("#file_input").val("");
      swal(
        {
          loseOnClickOutside: false,
          title: "File uploaded!",
          icon: "success"
        }).then((value) => {
        if(value){
          $("#connectBtn").prop('disabled', false);
          $("#resetBtn").prop('disabled', false);
        }
      });

      // this.$refs.simplert.openSimplert(this.simplert_success);
    }.bind(this),
    error: function (jqXHR, status, err) {
      $("#file_input").val("");
      // this.simplert_fail.message = this.$t("failed_msg_for_uploading") + '<br><br>' + jqXHR.responseText;
      // this.$refs.simplert.openSimplert(this.simplert_fail);
    }.bind(this),
    xhr: function () {
      var xhr = new XMLHttpRequest();
      return xhr;
    }
  });

}

function reset() {
  $("#navSection").show();
  $("#uploadSection").show();

  /* Setup new Viewer and desktop controller. */
  $("#connectBtn").text('Connect');
  try {
    window.app.setupDesktopViewer();
  } catch (e) {
    self.setStatus("Error", e.message);
  }
  $("#connectBtn").prop('disabled', true);
  $("#resetBtn").prop('disabled', true);

}