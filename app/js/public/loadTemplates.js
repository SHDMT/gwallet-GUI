(function() {
  var TEMP =  (function(){
      return {
        init:function(){
          var _this = this;
		        _this.times = 1;
//		        //requirejs([], function() {
		        	 	_this.loadTemplates($('body'));	
		        //})
        },
        loadTemplates: function(dom){
        	var _this = this;
          var doms = dom.find('[template-href]');

          doms.each(function(index, item){
            var templateHref = $(item).attr('template-href');
            var onlyJs = $(item).attr('template-onlyJs');
            if(onlyJs){
            	 _this.loadTemplateJs('../js/common-template/' +templateHref,"href")
//          	 _this.loadTemplateJs('../static/js/common-template/' +templateHref,"href")
            }else{
            	$(item).load('common-template/' + templateHref + '.html', function (e) {
            		if(e){
                        this.innerHTML = e;
					}
	            	_this.loadTemplates($(this));
	                _this.loadTemplateJs('../js/common-template/' +templateHref,"function")
	            })
            }
          })
        },
        loadTemplateJs:function(templateHref,eventType){
        	var _this = this;
        	  var fnlist = [ templateHref];
			  requirejs(fnlist, function () {
					for (var key in arguments) {
					  if (arguments[key] != undefined && arguments[key].name != undefined) {
						  arguments[key].init(eventType);
					  }
					}
			  })
        }
      }
  })
  
  $(function() {
    new TEMP().init();
  });
})(jQuery);