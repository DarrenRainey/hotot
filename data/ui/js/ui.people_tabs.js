if (typeof ui == 'undefined') var ui = {};
ui.PeopleTabs = {

current: null,

init:
function init() {
    $('#people_tweet_block .tweet_tabs_btn').click(
    function (event) {
        if (! $(this).hasClass('selected')) {
            // activate another sub page.
            ui.PeopleTabs.current = $(this).attr('href');
            var pagename = ui.PeopleTabs.current + '_sub_block';
            $('#people_tweet_block .tweet_tabs_btn').not(this).removeClass('selected');
            $(this).addClass('selected');
            $('#people_tweet_block .tweet_tabs_page').not(pagename).hide();
            $(pagename).show();
            ui.Notification.set(_("Loading ...")).show(-1);
            daemon.Updater.update_people();
        }
        return false;
    });
    ui.PeopleTabs.current = '#people_tweet';

    $(ui.PeopleTabs.current + '_sub_block').show();

    // vcard
    $('#people_vcard .vcard_follow').click(
    function (event) {
        var screen_name = ui.Main.block_info['#people'].screen_name;
        var _this = this;
        if ($(this).hasClass('unfo')) {
            ui.Notification.set(_("Unfollow @") + screen_name + _(" ...")).show();
            lib.twitterapi.destroy_friendships(screen_name,
            function () {
                ui.Notification.set(
                    _("Unfollow @")+ screen_name+_(" Successfully!")).show();
                $(_this).text('Follow').removeClass('unfo');
            });
        } else {
            ui.Notification.set(_("Follow @") + screen_name + _(" ...")).show();
            lib.twitterapi.create_friendships(screen_name,
            function () {
                ui.Notification.set(
                    _("Follow @")+ screen_name+_(" Successfully!")).show();
                $(_this).text('Unfollow').addClass('unfo');
            });
        }
    });

    $('#people_vcard .vcard_block').click(
    function (event) {
        var screen_name = ui.Main.block_info['#people'].screen_name;
        if (!confirm(_("Are you sure you want to block @")+screen_name+_("?!\n")))
            return;
        ui.Notification.set(_("Block @") + screen_name + _(" ...")).show();
        lib.twitterapi.create_blocks(screen_name,
        function () {
            ui.Notification.set(
                _("Block @")+ screen_name+_(" Successfully!")).show();
        });
    });

    $('#people_vcard .vcard_unblock').click(
    function (event) {
        var screen_name = ui.Main.block_info['#people'].screen_name;
        ui.Notification.set(_("Unblock @") + screen_name + _(" ...")).show();
        lib.twitterapi.create_blocks(screen_name,
        function () {
            ui.Notification.set(
                _("Unblock @")+ screen_name+_(" Successfully")).show();
        });
    });

    $('#tbox_people_entry').keypress(
    function (event) {
        if (event.keyCode == 13)
            $('#btn_people_entry').click();
    });

    $('#btn_people_entry').click(
    function (event) {
        ui.PeopleTabs.set_people(
            $.trim($('#tbox_people_entry').attr('value')));
        daemon.Updater.update_people();
    });

    $('#people_vcard_menu_btn').click(function(event) {
        $('#people_vcard_menu').show();
    });

    $('#people_vcard_menu_trigger').hover(
    function(event) {
        $('#people_vcard_menu').show();
    }, function (event) {
        $('#people_vcard_menu').hide();
    });
},

set_people:
function set_people(screen_name) {
    ui.Main.block_info['#people'].screen_name = screen_name;
    ui.Main.block_info['#people_tweet'].since_id = 1;
    ui.Main.block_info['#people_tweet'].max_id = null;
    ui.Main.block_info['#people_fav'].since_id = 1;
    ui.Main.block_info['#people_fav'].max_id = null;
    $('#people_tweet_block .tweet_sub_block').find('ul').html(''); 
},

load_people_timeline:
function load_people_timeline() {
    lib.twitterapi.get_user_timeline(
        ui.Main.block_info['#people'].id,
        ui.Main.block_info['#people'].screen_name,
        ui.Main.block_info['#people_tweet'].since_id, null, 20,
    function (result) {
        ui.Slider.slide_to('#people');
        ui.Main.load_tweets_cb(result, '#people_tweet');
    });
},

load_people_fav:
function load_people_fav() {
    lib.twitterapi.get_user_timeline(
        ui.Main.block_info['#people'].id,
        'shellex',
        ui.Main.block_info['#people_fav'].since_id, null, 20,
    function (result) {
        ui.Slider.slide_to('#people');
        ui.Main.load_tweets_cb(result, '#people_fav');
    });
},

load_people_follower:
function load_people_fav() {
    lib.twitterapi.get_user_timeline(
        ui.Main.block_info['#people'].id,
        'shellexy',
        ui.Main.block_info['#people_follower'].since_id, null, 20,
    function (result) {
        ui.Slider.slide_to('#people');
        ui.Main.load_tweets_cb(result, '#people_follower');
    });
},

load_people_friend:
function load_people_fav() {
    lib.twitterapi.get_user_timeline(
        ui.Main.block_info['#people'].id,
        'shellexz',
        ui.Main.block_info['#people_friend'].since_id, null, 20,
    function (result) {
        ui.Slider.slide_to('#people');
        ui.Main.load_tweets_cb(result, '#people_friend');
    });
},

};
