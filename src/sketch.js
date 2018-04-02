var script = document.createElement('script');
script.src = '//code.jquery.com/jquery-1.8.3.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

hostname = window.location.protocol + '//' + window.location.hostname;

dictionary = {};
dictionary["IMG"]              = "file";
dictionary["TEXT"]             = "text";
dictionary["A"]                = "text";
dictionary["BACKGROUND_IMAGE"] = "background_image";
dictionary["EXTERNAL_FILES"]   = "external_files";

dictionary_heb = {};
dictionary_heb["IMG"]              = "קובץ";
dictionary_heb["TEXT"]             = "תוכן";
dictionary_heb["A"]                = "לינק";
dictionary_heb["BACKGROUND_IMAGE"] = "תמונת רקע";
dictionary_heb["EXTERNAL_FILES"]   = "קבצים חיצוניים";


dictionary_elements = {};
//dictionary_elements["search"]      = {:url => "/q=", :fiels => "hidden..."};




vars = [];
external_files_index = 0;
group_names = [];
$("body > div").not('SCRIPT').each(function(group_index, current_breakpoint) {
  var group_name = $(this)[0].className;
  group_names.push("." + group_name);
  file_index = 0;
  text_index = 0;
  link_index = 0;  
  $(this).find("*").each(function(index, el) {
    var element = $(this);
    var element_0 = $(this)[0];
    var element_id       = element_0.id; // not in user for now
    var element_selector = element_0.className;
    if (element_selector != "") {
      var element_selector = "." + element_selector;
    }
    var node_name  = element_0.nodeName;
    var node_name_type = node_name;
    if (['SPAN', "P", "H1", "H2", "H3", "H4", "H5", "H6", "DIV"].includes(node_name_type) && element.children().length == 0) {
      node_name_type = "TEXT";
    }
      
    var type     = dictionary[node_name_type];
    var type_heb = dictionary_heb[node_name_type];
    switch (node_name_type) {
      case 'IMG':
          file_index += 1;
          var current_index = file_index;
          // src
          var tag_name      = "src";
          var name          = type + '_' + current_index + "_" + tag_name;
          var label         = type_heb + '_' + current_index + "_" + tag_name;
          var value         = element_0.src;
          if (value.charAt(0) == "/") {
            value = hostname + value
          }
          
          vars.push({'group':group_name, 'tab':group_name, 'label': label, "name": name, 'type': type, "value": value, "selector": element_selector});
          element_0.src = "{{var." + group_name + "." + name + "}}";
          console.log(label);

            // alt
            var tag_name      = "alt";
            var name   = type + '_' + current_index + "_" + tag_name;
            var label  = type_heb + '_' + current_index + "_" + tag_name;
            var value  = element_0.alt;
          vars.push({'group':group_name, 'tab':group_name, 'label': label, "name": name, 'type': "text", "value": value, "selector": element_selector});
          element_0.alt = "{{var." + group_name + "." + name + "}}";
          console.log(label);

          break;
          case 'A':
              link_index += 1;
              var current_index = link_index;
              // href
              var tag_name      = "href";
              var name          = type + '_' + current_index + "_" + tag_name;
              var label         = type_heb + '_' + current_index + "_" + tag_name;
              var value         = element_0.href;
              
              vars.push({'group':group_name, 'tab':group_name, 'label': label, "name": name, 'type': type, "value": value, "selector": element_selector});
              element_0.href = "{{var." + group_name + "." + name + "}}";
              console.log(label);

              // title
              var tag_name      = "title";
              var name   = type + '_' + current_index + "_" + tag_name;
              var label  = type_heb + '_' + current_index + "_" + tag_name;
              var value  = element_0.title;
              vars.push({'group':group_name, 'tab':group_name, 'label': label, "name": name, 'type': type, "value": value, "selector": element_selector});
              element_0.title = "{{var." + group_name + "." + name + "}}";
              console.log(label);

              // text
              if (element.children().length == 0) {
                var name   = type + '_' + link_index;
                var label  = type_heb + '_' + link_index;
                var value  = element.text();
              
                vars.push({'group':group_name, 'tab':group_name, 'label': label, "name": name, 'type': type, "value": value, "selector": element_selector});
                element.text("{{var." + group_name + "." + name + "}}");
                console.log(label);
              }

              break;
      case 'TEXT':
          text_index += 1;
            
            // text
          var name   = type + '_' + text_index;
          var label  = type_heb + '_' + text_index;
          var value  = element.text();
          
          vars.push({'group':group_name, 'tab':group_name, 'label': label, "name": name, 'type': type, "value": value, "selector": element_selector});
          element.text("{{var." + group_name + "." + name + "}}");
          console.log(label);

          break;
    }
  });
});












// css external files
$('link').each(function(index, link) {
  external_files_index += 1;
  link.setAttribute("href", link.href);
  var type     = dictionary["EXTERNAL_FILES"];
  var type_heb = dictionary_heb["EXTERNAL_FILES"];
  
  var name   = type + '_' + external_files_index;
  var label  = type_heb + '_' + external_files_index;
  var value  = link.href;
  vars.push({'tab': 'external_files', 'label': label, "name": name, 'type': "file", "value": value, "selector": name});
  link.setAttribute("href", "{{var." + name + "}}");
});

// script external files 
$('script').each(function(index, script) {
  if (script.src != "") {
    external_files_index += 1;
    script.setAttribute("src", script.src);
    var type     = dictionary["EXTERNAL_FILES"];
    var type_heb = dictionary_heb["EXTERNAL_FILES"];
    
    var name   = type + '_' + external_files_index;
    var label  = type_heb + '_' + external_files_index;
    var value  = script.src;
    vars.push({'tab': 'external_files', 'label': label, "name": name, 'type': "file", "value": value, "selector": name});
    script.setAttribute("src", "{{var." + name + "}}");      
  }
});
  
  
vars.push({'group': "design", 'tab': 'design', 'label': "direction", "name": "direction", 'type': "text", "value": "ltr"});
vars.push({'group': "design", 'tab': 'design', 'label': "margin-bottom", "name": "margin-bottom", 'type': "text", "value": "20px"});



// group_names_selectors = group_names.join(", ");
// var current_style = group_names_selectors + " {height: auto !important;min-height: 0px !important;margin-bottom: {{var.design.margin-bottom}} !important; direction: {{var.design.direction}} !important}"




data = {}
data["vars_arr"]         = vars;
data["foot_html_before"] = "<div class='import_element'>" + $('body').html() + "</div>";
data["head_html_before"] = "<style>" + $('style').html() + "</style>";
data["store_element"] = {"store_layout_title": "homepage_layout_x", "group_position": 1, "position": 2};
copy(data); // this will save it in the clipboard
alert("done :)")
