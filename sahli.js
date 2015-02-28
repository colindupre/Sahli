// Generated by CoffeeScript 1.9.0

/*
  .___________________________________,       ___
  |            /      |   |      .     \    .(___):
  |        _______    |          :      \   :     |
: |___/      /        |          |       \__|     |
|           /         |          |          |     |
l__________/__________|___|______l__________j_____j

     Ansi/Ansi Viewer in Ecmascript
 Coded by Sir Garbagetruck / Accession 2013
 Uses fonts by DMG, http://trueschool.se
 Uses Andy Herbert's Ansilove.js for rendering.
 */

(function() {
  this.Sahli = (function() {
    function Sahli() {}

    Sahli.loadpic = function(picdata, inserthere) {
      switch (picdata.filetype) {
        case 'plain':
          return this.loadplain(picdata, inserthere);
        case 'ansi':
          return this.loadhugeansi(picdata, inserthere);
        case 'bin':
          return this.loadhugeansi(picdata, inserthere);
        case 'xbin':
          return this.loadhugeansi(picdata, inserthere);
        case 'ice':
          return this.loadhugeansi(picdata, inserthere);
        case 'avatar':
          return this.loadavatar(picdata, inserthere);
        case 'pcboard':
          return this.loadhugeansi(picdata, inserthere);
        case 'idf':
          return this.loadhugeansi(picdata, inserthere);
        case 'adf':
          return this.loadhugeansi(picdata, inserthere);
        case 'tundra':
          return this.loadhugeansi(picdata, inserthere);
        default:
          return this.loadplain(picdata, inserthere);
      }
    };

    Sahli.loadplain = function(picdata, inserthere) {
      var bgcolor, buf, color, fname, pdiv, ptxt, req;
      pdiv = $('<div>');
      req = new XMLHttpRequest;
      fname = this.location + '/' + picdata.file;
      buf = $('<span>');
      buf.css({
        'margin': '0 auto'
      });
      ptxt = $('<pre>');
      color = this.calccolor(picdata.color);
      bgcolor = this.calccolor(picdata.bg);
      pdiv.addClass('scrolly');
      ptxt.addClass(picdata.font.toLowerCase());
      ptxt.css({
        'color': color,
        'background-color': bgcolor,
        'margin': 'auto',
        'display': 'inline-block'
      });
      ptxt.width(picdata.width * 8);
      this.origwidth = ptxt.width;
      pdiv.width(ptxt.width);
      pdiv.prepend(buf.clone());
      pdiv.append(ptxt);
      pdiv.append(buf);
      req.overrideMimeType('text/plain; charset=ISO-8859-1');
      req.onreadystatechange = function() {
        if (req.readyState === req.DONE) {
          if (req.status === 200 || req.status === 0) {
            ptxt.text(this.responseText);
            inserthere.after(pdiv);
            return $('body').scrollTop(0);
          } else {
            return this.loaderror(inserthere, fname, req.statusText, req.status);
          }
        }
      };
      req.open('GET', fname, true);
      return req.send(null);
    };

    Sahli.loadansi = function(picdata, inserthere) {
      var fname, pdiv;
      fname = this.location + '/' + picdata.file;
      pdiv = $('<div>');
      pdiv.addClass('scrolly');
      return AnsiLove.render(fname, (function(canv, SAUCE) {
        pdiv.append(canv);
        inserthere.after(pdiv);
        this.origwidth = canv.width;
        this.origheight = canv.height;
        return this.SAUCE = SAUCE;
      }), {
        'font': '80x25',
        'bits': '8',
        'columns': 160,
        'thumbnail': 0
      });
    };

    Sahli.loadhugeansi = function(picdata, inserthere) {
      var calcheight, canvwidth, fname, pdiv;
      fname = this.location + '/' + picdata.file;
      pdiv = $('<div>');
      calcheight = 0;
      canvwidth = 0;
      pdiv.css('display', 'inline-block');
      pdiv.addClass('scrolly');
      return AnsiLove.splitRender(fname, ((function(_this) {
        return function(chunks, SAUCE) {
          chunks.forEach(function(canv) {
            canv.style.verticalAlign = 'bottom';
            pdiv.append(canv);
            calcheight = calcheight + canv.height;
            return canvwidth = canv.width;
          });
          inserthere.after(pdiv);
          _this.SAUCE = SAUCE;
          _this.origwidth = canvwidth;
          _this.origheight = calcheight;
          return pdiv.width(canvwidth);
        };
      })(this)), 30, {
        'bits': '8'
      });
    };

    Sahli.loadavatar = function(picdata, inserthere) {
      return alert('avatar', picdata, inserthere);
    };

    Sahli.requestsahlifile = function(url) {
      this.loadkeys();
      this.DEBUG = false;
      this.fullscreen = false;
      this.scroll_speed = 5;
      this.scroll_direction = 1;
      this.asciiasgfx = false;
      this.currentpic = 0;
      return $.getJSON(url, (function(_this) {
        return function(json) {
          _this.filedata = json.filedata;
          _this.slides = json.slides;
          _this.location = json.location;
          return alert("SAHLI READY TO GO\n" + _this.filedata.length + " Entries");
        };
      })(this));
    };

    Sahli.nextpic = function() {
      var filedata, i, viewbox;
      viewbox = $('div#sahliviewer');
      viewbox.children().remove();
      $('#panel').empty();
      Sahli.scroll_direction = 1;
      Sahli.scroll_speed = 5;
      i = Sahli.currentpic;
      filedata = Sahli.filedata;
      filedata[i].pic = $('<h6>' + filedata[i].file + '</h6>');
      viewbox.append(filedata[i].pic);
      Sahli.loadpic(filedata[i], filedata[i].pic);
      Sahli.currentpic += 1;
      if (Sahli.currentpic > filedata.length - 1) {
        Sahli.currentpic = 0;
      }
      $('#panel').hide();
      $('#outbox').show();
      $('body').stop();
      return $('body').scrollTop(0);
    };

    Sahli.togglefullscreen = function() {
      var docElm;
      docElm = document.documentElement;
      if (this.fullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        }
        return this.fullscreen = false;
      } else {
        if (docElm.requestFullscreen) {
          docElm.requestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
        } else if (docElm.mozRequestFullScreen) {
          docElm.mozRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
        } else if (docElm.webkitRequestFullScreen) {
          docElm.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
        }
        return this.fullscreen = true;
      }
    };

    Sahli.toggledebug = function() {
      $('h1#top').fadeToggle();
      return this.DEBUG = !this.DEBUG;
    };

    Sahli.keycode = function(char) {
      return char.toUpperCase().charCodeAt(0);
    };

    Sahli.calccolor = function(colorset) {
      return "rgba(" + (colorset.toString()) + ")";
    };

    Sahli.loaderror = function(inserthere, fname, errortext, errorcode) {
      var errstr;
      if (errorcode === 404) {
        errstr = "Unable to find " + fname;
      } else {
        errstr = "error! " + errortext + " / code " + errorcode;
      }
      return inserthere.after($("<h1>").text("" + errstr));
    };

    Sahli.setscroll = function() {
      var bottom, scrollbox, scrollto, steps;
      scrollbox = $('body');
      bottom = $('body').height();
      scrollto = bottom;
      scrollbox.stop(true);
      if (this.scroll_direction === 1) {
        this.scroll_direction = -1;
        steps = bottom - scrollbox.scrollTop();
      } else {
        this.scroll_direction = 1;
        scrollto = 0;
        steps = scrollbox.scrollTop();
      }
      console.log(this.scroll_speed + " | " + steps);
      return scrollbox.animate({
        scrollTop: scrollto
      }, this.scroll_speed * steps, 'linear');
    };

    Sahli.changespeed = function(speed) {
      this.scroll_speed = speed;
      $('body').stop();
      this.scroll_direction = -this.scroll_direction;
      return this.setscroll();
    };

    Sahli.changescrolldirection = function(direction) {
      this.scroll_direction = direction;
      $('body').stop();
      return this.setscroll();
    };

    Sahli.zoom = function(amt) {
      var newwidth, zoomee;
      zoomee = $('div.scrolly');
      if (amt != null) {
        if (amt === 0) {
          newwidth = this.origwidth;
        } else {
          newwidth = zoomee.width() + amt;
        }
        console.log((zoomee.width()) + " " + newwidth);
        zoomee.width(newwidth);
        return $('canvas').width(newwidth);
      } else {
        if (zoomee.width() !== this.origwidth) {
          zoomee.width(this.origwidthg);
          return $('canvas').width('100%');
        } else {
          zoomee.width('100%');
          return $('canvas').width('100%');
        }
      }
    };

    Sahli.panelmode = function() {
      var canvs, colwidth, drawcol, fullpicheight, i, level, newheight, newwidth, num_strips, numcols, numpanels, outer, pic, scaling_factor, stripe_width, wh, ww, _i, _j, _k, _l, _len, _len1, _len2, _results;
      $('#panel').toggle();
      canvs = $('canvas');
      if ($('.scrolly').width() === this.origwidth) {
        $('.scrolly').width('100%');
        $('#panel').empty();
        ww = window.innerWidth;
        wh = window.innerHeight;
        numpanels = canvs.length;
        fullpicheight = 0;
        for (_i = 0, _len = canvs.length; _i < _len; _i++) {
          i = canvs[_i];
          fullpicheight = fullpicheight + i.height;
        }
        stripe_width = ww / Math.ceil(fullpicheight / ww);
        num_strips = Math.sqrt((ww / stripe_width) * (fullpicheight / wh));
        numcols = Math.floor(num_strips - 1);
        scaling_factor = num_strips * (wh / fullpicheight);
        newwidth = scaling_factor * canvs.height();
        canvs.width(newwidth);
        newheight = $(canvs[0]).height();
        colwidth = ww / numcols;
        outer = $('<div>');
        for (i = _j = 1; 1 <= numcols ? _j <= numcols : _j >= numcols; i = 1 <= numcols ? ++_j : --_j) {
          outer.append(this.createpanel(i, colwidth - 6));
        }
        outer.addClass('nosb');
        $('#panel').append(outer);
        $('#outbox').toggle();
        level = 0;
        drawcol = 1;
        _results = [];
        for (_k = 0, _len1 = canvs.length; _k < _len1; _k++) {
          pic = canvs[_k];
          $("#column" + drawcol).append(pic);
          level = level + newheight;
          if (level + (newheight / 2) > wh) {
            level = 0;
            _results.push(drawcol = drawcol + 1);
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      } else {
        $('.scrolly').width(this.origwidth);
        $('#outbox').show();
        for (_l = 0, _len2 = canvs.length; _l < _len2; _l++) {
          pic = canvs[_l];
          $('.scrolly').append(pic);
        }
        canvs.width(this.origwidth);
        return $('body').scrollTop(0);
      }
    };

    Sahli.createpanel = function(i, amt) {
      var dcol;
      dcol = $("<div id='column" + i + "'>" + i + "</div>");
      dcol.addClass('panelcolumn');
      return dcol.width(amt);
    };

    Sahli.loadkeys = function() {
      return $(document).on('keydown', (function(_this) {
        return function(ev) {
          switch (ev.which) {
            case _this.keycode(' '):
              return _this.nextpic();
            case _this.keycode('f'):
              return _this.togglefullscreen();
            case _this.keycode('s'):
              return _this.setscroll();
            case _this.keycode('t'):
              $('body').scrollTop(0);
              return _this.zoom(0);
            case _this.keycode('b'):
              return $('body').scrollTop($('body').height());
            case _this.keycode('a'):
              $('body').stop();
              return _this.scroll_direction = -_this.scroll_direction;
            case _this.keycode('z'):
              return _this.zoom();
            case _this.keycode('e'):
              return _this.zoom(100);
            case _this.keycode('r'):
              return _this.zoom(-100);
            case _this.keycode('w'):
              return _this.changescrolldirection(-1);
            case _this.keycode('x'):
              return _this.changescrolldirection(1);
            case _this.keycode('c'):
              return _this.panelmode();
            case _this.keycode('1'):
              return _this.changespeed(1);
            case _this.keycode('2'):
              _this.changespeed(2);
              return _this.scroll_speed = 2;
            case _this.keycode('3'):
              _this.changespeed(3);
              return _this.scroll_speed = 3;
            case _this.keycode('4'):
              _this.changespeed(4);
              return _this.scroll_speed = 4;
            case _this.keycode('5'):
              return _this.changespeed(5);
            case _this.keycode('h'):
              $('.help').css({
                'left': '33%'
              });
              return $('.help').toggle('fast');
            default:
              return console.log(ev.which);
          }
        };
      })(this));
    };

    return Sahli;

  })();

}).call(this);
