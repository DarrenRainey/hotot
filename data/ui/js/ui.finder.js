if (typeof ui == 'undefined') var ui = {};
ui.Finder = {

id: '',

current_pos: -1,

matched_ids: [],

init: 
function init() {
    ui.Finder.id = '#finder_bar';
    ui.Finder.tbox = '#tbox_finder';
    $(ui.Finder.tbox).keyup(
    function (event) {
        if (event.keyCode == 13) { // Enter to search 
            if (ui.Finder.matched_ids.length == 0) {
                var query = $(ui.Finder.tbox).val();
                ui.Finder.search(query);
            } else {
                ui.Finder.next_result();
            }
        } else if (event.keyCode == 27) { //ESC to close
            $('#btn_finder_close').click();
            return false;
        } else {
            ui.Finder.matched_ids = [];
            ui.Finder.current_pos = -1;
        }
    });
    $('#btn_finder_close').click(
    function (event) {
        ui.Finder.clear();
        ui.Finder.hide();
    });
    return this;
},

search:
function search(query) {
    var current = ui.Slider.current;
    var tweets = $(current + '_tweet_block .card');
    ui.Finder.finding = true;
    ui.Finder.matched_ids = [];
    ui.Finder.current_pos = -1;
    tweets.each(
    function(idx, obj) {
        var tweet_li = $(obj);
        if (tweet_li.find('.text').text().indexOf(query) != -1
            || tweet_li.find('.who').text().indexOf(query) != -1) {
            ui.Finder.matched_ids.push('#'+tweet_li.attr('id'));
        }
    });
    if (ui.Finder.matched_ids.length == 0) {
        ui.Notification.set(query +' not found.').show(2);
    } else {
        container = ui.Main.get_current_container(ui.Slider.current);
        container.children('.card').show(); 
        ui.Main.move_to_tweet(ui.Finder.matched_ids[0]);
    }
    return this;
},

next_result:
function next_result() {
    ui.Finder.current_pos += 1;
    if (ui.Finder.current_pos >= ui.Finder.matched_ids.length) {
        ui.Finder.current_pos = 0;
    }
    if (ui.Finder.matched_ids.length != 0) {
        ui.Main.move_to_tweet(ui.Finder.matched_ids[ui.Finder.current_pos]);
    }
},

prev_result:
function prev_result() {
    ui.Finder.current_pos -= 1;
    if (ui.Finder.current_pos < 0) {
        ui.Finder.current_pos = ui.matched_ids.length - 1;
    }
    if (ui.Finder.matched_ids.length != 0) {
        ui.Main.move_to_tweet(ui.Finder.matched_ids[ui.Finder.current_pos]);
    }
},

clear:
function clear() {
    $(ui.Finder.tbox).val('');
    ui.Finder.matched_ids = [];
    ui.Finder.current_pos = -1;
    return this;
},

show:
function show() {
    $(ui.Finder.id)
        .css('background', $('#header').css('background'))
        .css('top', ($(header).height() + 6)+'px')
        .show();
    $(ui.Finder.tbox).focus();
    return this;
},

hide:
function hide() {
    ui.Finder.finding = false;
    $(ui.Finder.id).hide();
    $(ui.Finder.tbox).blur();
    return this;
},

};

