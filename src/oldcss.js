background_image_index = 0;
style_hrefs = []
var head_style = document.createElement("STYLE");
var font_style = document.createElement("STYLE");
var apply_style = document.createElement("STYLE");

var styleSheets = document.styleSheets;
var styleSheetsLength = styleSheets.length;
for (var i = 0; i < styleSheetsLength; i++) {
    var stylesheet = styleSheets[i];
    style_hrefs.push({'href': stylesheet["href"]})

    var classes = null//stylesheet.rules || stylesheet.cssRules;
    if (classes != null) {
      var classesLength = classes.length;
       for (var x = 0; x < classesLength; x++) {
         // fonts external files
         
         if (classes[x].selectorText === undefined && classes[x].style != undefined && classes[x].style.src != "") {
           external_files_index += 1;
           var font_src      = classes[x].style.src;
           var font_path     = font_src.split('url("')[1];
         	 font_path         = font_path.split('")')[0];
           
           font_path_without_dot_dot = font_path.replace('..','');

       		 font_url = hostname + font_path_without_dot_dot; // woff
           font_url_eot = font_url.replace(".woff", ".eot");
           console.log(font_path_without_dot_dot);
           
           // woff
           var type     = dictionary["EXTERNAL_FILES"];
           var type_heb = dictionary_heb["EXTERNAL_FILES"];
           
           var name   = type + '_' + external_files_index;
           var label  = type_heb + '_' + external_files_index;
           var value  = font_url;
           vars.push({'tab': 'external_files', 'label': label, "name": name, 'type': "file", "value": value, "selector": name});
           
           // eot
           external_files_index += 1;
       
           var name_eot = type + '_' + external_files_index;
           var label    = type_heb + '_' + external_files_index;
           var value    = font_url_eot;
           vars.push({'tab': 'external_files', 'label': label, "name": name_eot, 'type': "file", "value": value, "selector": name_eot});

          //  @font-face{font-family:'__Heebo_5';src:url('../fonts/heebo-regular.eot');src:local('☺'), url('../fonts/heebo-regular.woff') format('woff');font-weight:400;font-style:normal;}
          //  @font-face{font-family:'__Heebo_5';src:url('{{var.external_files_2}}');  src:  local("☺"), url("{{var.external_files_1}}") format("woff");font-weight: '400';font-style: 'normal';}
           current_style     = classes[x].style;
           font_style_length = current_style.length;
           font_css_text = "@font-face{"
           for (var j = 0; j < font_style_length; j++) {
            style_name = current_style[j];
            if (style_name == "src") {
              font_css_text += style_name + ": " + current_style[style_name]  +  ";";
            }
            else {
              font_css_text += style_name + ": " +  "'" + current_style[style_name]  +  "';";
            }
           }
           font_css_text += "}"
           font_css_text = font_css_text.replace(font_path, "{{var." + name + "}}");
           font_css_text = font_css_text.replace("src:", "src: url('" +  "{{var." + name_eot + "}}');src: ");
           var t = document.createTextNode(font_css_text);
           font_style.appendChild(t);
           document.head.appendChild(font_style);

         }


          if (classes[x].selectorText === undefined) {
              continue;
          }
          
          
          if (classes[x]["style"]["background-image"].indexOf("url") >= 0) {

            background_image_index += 1;
            // background_image
            var type     = dictionary["BACKGROUND_IMAGE"];
            var type_heb = dictionary_heb["BACKGROUND_IMAGE"];
            
            var name   = type + '_' + background_image_index;
            var label  = type_heb + '_' + background_image_index;
            var value  = classes[x]["style"]["background-image"];
            value = value.replace('url("', "");
            value = value.replace('")', "")
            value = hostname + value;
            vars.push({'tab': 'background_images', 'label': label, "name": name, 'type': "file", "value": value, "selector": classes[x].selectorText});
            console.log(label);
            
            var t = document.createTextNode(classes[x].selectorText + " {background-image: "+ "url('{{var." + name + "}}');}");
            head_style.appendChild(t);
            document.head.appendChild(head_style);  
          }
          
       }
    }
  }