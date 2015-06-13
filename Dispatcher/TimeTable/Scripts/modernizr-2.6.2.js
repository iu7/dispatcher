/*
 * Modernizr v2.6.
 * www.modernizr.co
 
 * Copyright (c) Faruk Ates, Paul Irish, Alex Sexto
 * Available under the BSD and MIT licenses: www.modernizr.com/license
 *

/
 * Modernizr tests which native CSS3 and HTML5 features are available i
 * the current UA and makes the results available to you in two ways
 * as properties on a global Modernizr object, and as classes on th
 * <html> element. This information allows you to progressively enhanc
 * your pages with a granular level of control over the experience
 
 * Modernizr has an optional (not included) conditional resource loade
 * called Modernizr.load(), based on Yepnope.js (yepnopejs.com)
 * To get a build that includes Modernizr.load(), as well as choosin
 * which tests to include, go to www.modernizr.com/download
 
 * Authors        Faruk Ates, Paul Irish, Alex Sexto
 * Contributors   Ryan Seddon, Ben Alma
 *

window.Modernizr = (function( window, document, undefined ) 

    var version = '2.6.2'

    Modernizr = {}

    /*>>cssclasses*
    // option for enabling the HTML classes to be adde
    enableClasses = true
    /*>>cssclasses*

    docElement = document.documentElement

    /*
     * Create our "modernizr" element that we do most feature tests on
     *
    mod = 'modernizr'
    modElem = document.createElement(mod)
    mStyle = modElem.style

    /*
     * Create the input element for various Web Forms feature tests
     *
    inputElem /*>>inputelem*/ = document.createElement('input') /*>>inputelem*/ 

    /*>>smile*
    smile = ':)'
    /*>>smile*

    toString = {}.toString

    // TODO :: make the prefixes more granula
    /*>>prefixes*
    // List of property values to set for css tests. See ticket #2
    prefixes = ' -webkit- -moz- -o- -ms- '.split(' ')
    /*>>prefixes*

    /*>>domprefixes*
    // Following spec is to expose vendor-specific style properties as
    //   elem.style.WebkitBorderRadiu
    // and the following would be incorrect
    //   elem.style.webkitBorderRadiu

    // Webkit ghosts their properties in lowercase but Opera & Moz do not
    // Microsoft uses a lowercase `ms` instead of the correct `Ms` in IE8
    //   erik.eae.net/archives/2008/03/10/21.48.10

    // More here: github.com/Modernizr/Modernizr/issues/issue/2
    omPrefixes = 'Webkit Moz O ms'

    cssomPrefixes = omPrefixes.split(' ')

    domPrefixes = omPrefixes.toLowerCase().split(' ')
    /*>>domprefixes*

    /*>>ns*
    ns = {'svg': 'http://www.w3.org/2000/svg'}
    /*>>ns*

    tests = {}
    inputs = {}
    attrs = {}

    classes = []

    slice = classes.slice

    featureName, // used in testing loo

    /*>>teststyles*
    // Inject element with style element and some CSS rule
    injectElementWithStyles = function( rule, callback, nodes, testnames ) 

      var style, ret, node, docOverflow
          div = document.createElement('div')
          // After page load injecting a fake body doesn't work so check if body exist
          body = document.body
          // IE6 and 7 won't return offsetWidth or offsetHeight unless it's in the body element, so we fake it
          fakeBody = body || document.createElement('body')

      if ( parseInt(nodes, 10) ) 
          // In order not to give false positives we create a node for each tes
          // This also allows the method to scale for unspecified use
          while ( nodes-- ) 
              node = document.createElement('div')
              node.id = testnames ? testnames[nodes] : mod + (nodes + 1)
              div.appendChild(node)
          
      

      // <style> elements in IE6-9 are considered 'NoScope' elements and therefore will be remove
      // when injected with innerHTML. To get around this you need to prepend the 'NoScope' elemen
      // with a 'scoped' element, in our case the soft-hyphen entity as it won't mess with our measurements
      // msdn.microsoft.com/en-us/library/ms533897%28VS.85%29.asp
      // Documents served as xml will throw if using &shy; so use xml friendly encoded version. See issue #27
      style = ['&#173;','<style id="s', mod, '">', rule, '</style>'].join('')
      div.id = mod
      // IE6 will false positive on some tests due to the style element inside the test div somehow interfering offsetHeight, so insert it into body or fakebody
      // Opera will act all quirky when injecting elements in documentElement when page is served as xml, needs fakebody too. #27
      (body ? div : fakeBody).innerHTML += style
      fakeBody.appendChild(div)
      if ( !body ) 
          //avoid crashing IE8, if background image is use
          fakeBody.style.background = ''
          //Safari 5.13/5.1.4 OSX stops loading if ::-webkit-scrollbar is used and scrollbars are visibl
          fakeBody.style.overflow = 'hidden'
          docOverflow = docElement.style.overflow
          docElement.style.overflow = 'hidden'
          docElement.appendChild(fakeBody)
      

      ret = callback(div, rule)
      // If this is done after page load we don't want to remove the body so check if body exist
      if ( !body ) 
          fakeBody.parentNode.removeChild(fakeBody)
          docElement.style.overflow = docOverflow
      } else 
          div.parentNode.removeChild(div)
      

      return !!ret

    }
    /*>>teststyles*

    /*>>mq*
    // adapted from matchMedia polyfil
    // by Scott Jehl and Paul Iris
    // gist.github.com/78676
    testMediaQuery = function( mq ) 

      var matchMedia = window.matchMedia || window.msMatchMedia
      if ( matchMedia ) 
        return matchMedia(mq).matches
      

      var bool

      injectElementWithStyles('@media ' + mq + ' { #' + mod + ' { position: absolute; } }', function( node ) 
        bool = (window.getComputedStyle 
                  getComputedStyle(node, null) 
                  node.currentStyle)['position'] == 'absolute'
      })

      return bool

     }
     /*>>mq*

    /*>>hasevent*
    /
    // isEventSupported determines if a given element supports the given even
    // kangax.github.com/iseventsupported
    /
    // The following results are known incorrects
    //   Modernizr.hasEvent("webkitTransitionEnd", elem) // false negativ
    //   Modernizr.hasEvent("textInput") // in Webkit. github.com/Modernizr/Modernizr/issues/33
    //   ..
    isEventSupported = (function() 

      var TAGNAMES = 
        'select': 'input', 'change': 'input'
        'submit': 'form', 'reset': 'form'
        'error': 'img', 'load': 'img', 'abort': 'img
      }

      function isEventSupported( eventName, element ) 

        element = element || document.createElement(TAGNAMES[eventName] || 'div')
        eventName = 'on' + eventName

        // When using `setAttribute`, IE skips "unload", WebKit skips "unload" and "resize", whereas `in` "catches" thos
        var isSupported = eventName in element

        if ( !isSupported ) 
          // If it has no `setAttribute` (i.e. doesn't implement Node interface), try generic elemen
          if ( !element.setAttribute ) 
            element = document.createElement('div')
          
          if ( element.setAttribute && element.removeAttribute ) 
            element.setAttribute(eventName, '')
            isSupported = is(element[eventName], 'function')

            // If property was created, "remove it" (by setting value to `undefined`
            if ( !is(element[eventName], 'undefined') ) 
              element[eventName] = undefined
            
            element.removeAttribute(eventName)
          
        

        element = null
        return isSupported
      
      return isEventSupported
    })()
    /*>>hasevent*

    // TODO :: Add flag for hasownprop ? didn't last tim

    // hasOwnProperty shim by kangax needed for Safari 2.0 suppor
    _hasOwnProperty = ({}).hasOwnProperty, hasOwnProp

    if ( !is(_hasOwnProperty, 'undefined') && !is(_hasOwnProperty.call, 'undefined') ) 
      hasOwnProp = function (object, property) 
        return _hasOwnProperty.call(object, property)
      }
    
    else 
      hasOwnProp = function (object, property) { /* yes, this can give false positives/negatives, but most of the time we don't care about those *
        return ((property in object) && is(object.constructor.prototype[property], 'undefined'))
      }
    

    // Adapted from ES5-shim https://github.com/kriskowal/es5-shim/blob/master/es5-shim.j
    // es5.github.com/#x15.3.4.

    if (!Function.prototype.bind) 
      Function.prototype.bind = function bind(that) 

        var target = this

        if (typeof target != "function") 
            throw new TypeError()
        

        var args = slice.call(arguments, 1)
            bound = function () 

            if (this instanceof bound) 

              var F = function(){}
              F.prototype = target.prototype
              var self = new F()

              var result = target.apply
                  self
                  args.concat(slice.call(arguments)
              )
              if (Object(result) === result) 
                  return result
              
              return self

            } else 

              return target.apply
                  that
                  args.concat(slice.call(arguments)
              )

            

        }

        return bound
      }
    

    /*
     * setCss applies given styles to the Modernizr DOM node
     *
    function setCss( str ) 
        mStyle.cssText = str
    

    /*
     * setCssAll extrapolates all vendor-specific css strings
     *
    function setCssAll( str1, str2 ) 
        return setCss(prefixes.join(str1 + ';') + ( str2 || '' ))
    

    /*
     * is returns a boolean for if typeof obj is exactly type
     *
    function is( obj, type ) 
        return typeof obj === type
    

    /*
     * contains returns a boolean for if substr is found within str
     *
    function contains( str, substr ) 
        return !!~('' + str).indexOf(substr)
    

    /*>>testprop*

    // testProps is a generic CSS / DOM property test

    // In testing support for a given CSS property, it's legit to test
    //    `elem.style[styleName] !== undefined
    // If the property is supported it will return an empty string
    // if unsupported it will return undefined

    // We'll take advantage of this quick test and skip setting a styl
    // on our modernizr element, but instead just testing undefined v
    // empty string

    // Because the testing of the CSS property names (with "-", a
    // opposed to the camelCase DOM properties) is non-portable an
    // non-standard but works in WebKit and IE (but not Gecko or Opera)
    // we explicitly reject properties with dashes so that author
    // developing in WebKit or IE first don't end up wit
    // browser-specific content by accident

    function testProps( props, prefixed ) 
        for ( var i in props ) 
            var prop = props[i]
            if ( !contains(prop, "-") && mStyle[prop] !== undefined ) 
                return prefixed == 'pfx' ? prop : true
            
        
        return false
    
    /*>>testprop*

    // TODO :: add testDOMProp
    /*
     * testDOMProps is a generic DOM property test; if a browser support
     *   a certain property, it won't return undefined for it
     *
    function testDOMProps( props, obj, elem ) 
        for ( var i in props ) 
            var item = obj[props[i]]
            if ( item !== undefined) 

                // return the property name as a strin
                if (elem === false) return props[i]

                // let's bind a functio
                if (is(item, 'function'))
                  // default to autobind unless overrid
                  return item.bind(elem || obj)
                

                // return the unbound function or obj or valu
                return item
            
        
        return false
    

    /*>>testallprops*
    /*
     * testPropsAll tests a list of DOM properties we want to check against
     *   We specify literally ALL possible (known and/or likely) properties o
     *   the element including the non-vendor prefixed one, for forward
     *   compatibility
     *
    function testPropsAll( prop, prefixed, elem ) 

        var ucProp  = prop.charAt(0).toUpperCase() + prop.slice(1)
            props   = (prop + ' ' + cssomPrefixes.join(ucProp + ' ') + ucProp).split(' ')

        // did they call .prefixed('boxSizing') or are we just testing a prop
        if(is(prefixed, "string") || is(prefixed, "undefined")) 
          return testProps(props, prefixed)

        // otherwise, they called .prefixed('requestAnimationFrame', window[, elem]
        } else 
          props = (prop + ' ' + (domPrefixes).join(ucProp + ' ') + ucProp).split(' ')
          return testDOMProps(props, prefixed, elem)
        
    
    /*>>testallprops*

    /*
     * Test
     * ----
     *

    // The *new* flexbo
    // dev.w3.org/csswg/css3-flexbo

    tests['flexbox'] = function() 
      return testPropsAll('flexWrap')
    }

    // The *old* flexbo
    // www.w3.org/TR/2009/WD-css3-flexbox-20090723

    tests['flexboxlegacy'] = function() 
        return testPropsAll('boxDirection')
    }

    // On the S60 and BB Storm, getContext exists, but always returns undefine
    // so we actually have to call getContext() to verif
    // github.com/Modernizr/Modernizr/issues/issue/97

    tests['canvas'] = function() 
        var elem = document.createElement('canvas')
        return !!(elem.getContext && elem.getContext('2d'))
    }

    tests['canvastext'] = function() 
        return !!(Modernizr['canvas'] && is(document.createElement('canvas').getContext('2d').fillText, 'function'))
    }

    // webk.it/70117 is tracking a legit WebGL feature detect proposa

    // We do a soft detect which may false positive in order to avoi
    // an expensive context creation: bugzil.la/73244

    tests['webgl'] = function() 
        return !!window.WebGLRenderingContext
    }

    /
     * The Modernizr.touch test only indicates if the browser support
     *    touch events, which does not necessarily reflect a touchscree
     *    device, as evidenced by tablets running Windows 7 or, alas
     *    the Palm Pre / WebOS (touch) phones
     
     * Additionally, Chrome (desktop) used to lie about its support on this
     *    but that has since been rectified: crbug.com/3641
     
     * We also test for Firefox 4 Multitouch Support
     
     * For more info, see: modernizr.github.com/Modernizr/touch.htm
     *

    tests['touch'] = function() 
        var bool

        if(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) 
          bool = true
        } else 
          injectElementWithStyles(['@media (',prefixes.join('touch-enabled),('),mod,')','{#modernizr{top:9px;position:absolute}}'].join(''), function( node ) 
            bool = node.offsetTop === 9
          })
        

        return bool
    }

    // geolocation is often considered a trivial feature detect..
    // Turns out, it's quite tricky to get right
    /
    // Using !!navigator.geolocation does two things we don't want. It
    //   1. Leaks memory in IE9: github.com/Modernizr/Modernizr/issues/51
    //   2. Disables page caching in WebKit: webk.it/4395
    /
    // Meanwhile, in Firefox < 8, an about:config setting could expos
    // a false positive that would throw an exception: bugzil.la/68815

    tests['geolocation'] = function() 
        return 'geolocation' in navigator
    }

    tests['postmessage'] = function() 
      return !!window.postMessage
    }

    // Chrome incognito mode used to throw an exception when using openDatabas
    // It doesn't anymore
    tests['websqldatabase'] = function() 
      return !!window.openDatabase
    }

    // Vendors had inconsistent prefixing with the experimental Indexed DB
    // - Webkit's implementation is accessible through webkitIndexedD
    // - Firefox shipped moz_indexedDB before FF4b9, but since then has been mozIndexedD
    // For speed, we don't test the legacy (and beta-only) indexedD
    tests['indexedDB'] = function() 
      return !!testPropsAll("indexedDB", window)
    }

    // documentMode logic from YUI to filter out IE8 Compat Mod
    //   which false positives
    tests['hashchange'] = function() 
      return isEventSupported('hashchange', window) && (document.documentMode === undefined || document.documentMode > 7)
    }

    // Per 1.6
    // This used to be Modernizr.historymanagement but the longe
    // name has been deprecated in favor of a shorter and property-matching one
    // The old API is still available in 1.6, but as of 2.0 will throw a warning
    // and in the first release thereafter disappear entirely
    tests['history'] = function() 
      return !!(window.history && history.pushState)
    }

    tests['draganddrop'] = function() 
        var div = document.createElement('div')
        return ('draggable' in div) || ('ondragstart' in div && 'ondrop' in div)
    }

    // FF3.6 was EOL'ed on 4/24/12, but the ESR version of FF1
    // will be supported until FF19 (2/12/13), at which time, ESR becomes FF17
    // FF10 still uses prefixes, so check for it until then
    // for more ESR info, see: mozilla.org/en-US/firefox/organizations/faq
    tests['websockets'] = function() 
        return 'WebSocket' in window || 'MozWebSocket' in window
    }

    // css-tricks.com/rgba-browser-support
    tests['rgba'] = function() 
        // Set an rgba() color and check the returned valu

        setCss('background-color:rgba(150,255,150,.5)')

        return contains(mStyle.backgroundColor, 'rgba')
    }

    tests['hsla'] = function() 
        // Same as rgba(), in fact, browsers re-map hsla() to rgba() internally
        //   except IE9 who retains it as hsl

        setCss('background-color:hsla(120,40%,100%,.5)')

        return contains(mStyle.backgroundColor, 'rgba') || contains(mStyle.backgroundColor, 'hsla')
    }

    tests['multiplebgs'] = function() 
        // Setting multiple images AND a color on the background shorthand propert
        //  and then querying the style.background property value for the number o
        //  occurrences of "url(" is a reliable method for detecting ACTUAL support for this

        setCss('background:url(https://),url(https://),red url(https://)')

        // If the UA supports multiple backgrounds, there should be three occurrence
        //   of the string "url(" in the return value for elemStyle.backgroun

        return (/(url\s*\(.*?){3}/).test(mStyle.background)
    }


    // this will false positive in Opera Min
    //   github.com/Modernizr/Modernizr/issues/39

    tests['backgroundsize'] = function() 
        return testPropsAll('backgroundSize')
    }

    tests['borderimage'] = function() 
        return testPropsAll('borderImage')
    }

    // Super comprehensive table about all the unique implementations o
    // border-radius: muddledramblings.com/table-of-css3-border-radius-complianc

    tests['borderradius'] = function() 
        return testPropsAll('borderRadius')
    }

    // WebOS unfortunately false positives on this test
    tests['boxshadow'] = function() 
        return testPropsAll('boxShadow')
    }

    // FF3.0 will false positive on this tes
    tests['textshadow'] = function() 
        return document.createElement('div').style.textShadow === ''
    }

    tests['opacity'] = function() 
        // Browsers that actually have CSS Opacity implemented have done s
        //  according to spec, which means their return values are within th
        //  range of [0.0,1.0] - including the leading zero

        setCssAll('opacity:.55')

        // The non-literal . in this regex is intentional
        //   German Chrome returns this value as 0,5
        // github.com/Modernizr/Modernizr/issues/#issue/59/comment/51663
        return (/^0.55$/).test(mStyle.opacity)
    }

    // Note, Android < 4 will pass this test, but can only animat
    //   a single property at a tim
    //   daneden.me/2011/12/putting-up-with-androids-bullshit
    tests['cssanimations'] = function() 
        return testPropsAll('animationName')
    }

    tests['csscolumns'] = function() 
        return testPropsAll('columnCount')
    }

    tests['cssgradients'] = function() 
        /*
         * For CSS Gradients syntax, please see
         * webkit.org/blog/175/introducing-css-gradients
         * developer.mozilla.org/en/CSS/-moz-linear-gradien
         * developer.mozilla.org/en/CSS/-moz-radial-gradien
         * dev.w3.org/csswg/css3-images/#gradients
         *

        var str1 = 'background-image:'
            str2 = 'gradient(linear,left top,right bottom,from(#9f9),to(white));'
            str3 = 'linear-gradient(left top,#9f9, white);'

        setCss
             // legacy webkit syntax (FIXME: remove when syntax not in use anymore
              (str1 + '-webkit- '.split(' ').join(str2 + str1) 
             // standard syntax             // trailing 'background-image:
              prefixes.join(str3 + str1)).slice(0, -str1.length
        )

        return contains(mStyle.backgroundImage, 'gradient')
    }

    tests['cssreflections'] = function() 
        return testPropsAll('boxReflect')
    }

    tests['csstransforms'] = function() 
        return !!testPropsAll('transform')
    }

    tests['csstransforms3d'] = function() 

        var ret = !!testPropsAll('perspective')

        // Webkit's 3D transforms are passed off to the browser's own graphics renderer
        //   It works fine in Safari on Leopard and Snow Leopard, but not in Chrome i
        //   some conditions. As a result, Webkit typically recognizes the syntax bu
        //   will sometimes throw a false positive, thus we must do a more thorough check
        if ( ret && 'webkitPerspective' in docElement.style ) 

          // Webkit allows this media query to succeed only if the feature is enabled
          // `@media (transform-3d),(-webkit-transform-3d){ ... }
          injectElementWithStyles('@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}', function( node, rule ) 
            ret = node.offsetLeft === 9 && node.offsetHeight === 3
          })
        
        return ret
    }

    tests['csstransitions'] = function() 
        return testPropsAll('transition')
    }

    /*>>fontface*
    // @font-face detection routine by Diego Perin
    // javascript.nwbox.com/CSSSupport

    // false positives
    //   WebOS github.com/Modernizr/Modernizr/issues/34
    //   WP7   github.com/Modernizr/Modernizr/issues/53
    tests['fontface'] = function() 
        var bool

        injectElementWithStyles('@font-face {font-family:"font";src:url("https://")}', function( node, rule ) 
          var style = document.getElementById('smodernizr')
              sheet = style.sheet || style.styleSheet
              cssText = sheet ? (sheet.cssRules && sheet.cssRules[0] ? sheet.cssRules[0].cssText : sheet.cssText || '') : ''

          bool = /src/i.test(cssText) && cssText.indexOf(rule.split(' ')[0]) === 0
        })

        return bool
    }
    /*>>fontface*

    // CSS generated content detectio
    tests['generatedcontent'] = function() 
        var bool

        injectElementWithStyles(['#',mod,'{font:0/0 a}#',mod,':after{content:"',smile,'";visibility:hidden;font:3px/1 a}'].join(''), function( node ) 
          bool = node.offsetHeight >= 3
        })

        return bool
    }


    // These tests evaluate support of the video/audio elements, as well a
    // testing what types of content they support
    /
    // We're using the Boolean constructor here, so that we can extend the valu
    // e.g.  Modernizr.video     // tru
    //       Modernizr.video.ogg // 'probably
    /
    // Codec values from : github.com/NielsLeenheer/html5test/blob/9106a8/index.html#L84
    //                     thx to NielsLeenheer and zcorpa

    // Note: in some older browsers, "no" was a return value instead of empty string
    //   It was live in FF3.5.0 and 3.5.1, but fixed in 3.5.
    //   It was also live in Safari 4.0.0 - 4.0.4, but fixed in 4.0.

    tests['video'] = function() 
        var elem = document.createElement('video')
            bool = false

        // IE9 Running on Windows Server SKU can cause an exception to be thrown, bug #22
        try 
            if ( bool = !!elem.canPlayType ) 
                bool      = new Boolean(bool)
                bool.ogg  = elem.canPlayType('video/ogg; codecs="theora"')      .replace(/^no$/,'')

                // Without QuickTime, this value will be `undefined`. github.com/Modernizr/Modernizr/issues/54
                bool.h264 = elem.canPlayType('video/mp4; codecs="avc1.42E01E"') .replace(/^no$/,'')

                bool.webm = elem.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/,'')
            

        } catch(e) { 

        return bool
    }

    tests['audio'] = function() 
        var elem = document.createElement('audio')
            bool = false

        try 
            if ( bool = !!elem.canPlayType ) 
                bool      = new Boolean(bool)
                bool.ogg  = elem.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,'')
                bool.mp3  = elem.canPlayType('audio/mpeg;')               .replace(/^no$/,'')

                // Mimetypes accepted
                //   developer.mozilla.org/En/Media_formats_supported_by_the_audio_and_video_element
                //   bit.ly/iphoneoscodec
                bool.wav  = elem.canPlayType('audio/wav; codecs="1"')     .replace(/^no$/,'')
                bool.m4a  = ( elem.canPlayType('audio/x-m4a;')            |
                              elem.canPlayType('audio/aac;'))             .replace(/^no$/,'')
            
        } catch(e) { 

        return bool
    }

    // In FF4, if disabled, window.localStorage should === null

    // Normally, we could not test that directly and need to do 
    //   `('localStorage' in window) && ` test first because otherwise Firefox wil
    //   throw bugzil.la/365772 if cookies are disable

    // Also in iOS5 Private Browsing mode, attempting to use localStorage.setIte
    // will throw the exception
    //   QUOTA_EXCEEDED_ERRROR DOM Exception 22
    // Peculiarly, getItem and removeItem calls do not throw

    // Because we are forced to try/catch this, we'll go aggressive

    // Just FWIW: IE8 Compat mode supports these features completely
    //   www.quirksmode.org/dom/html5.htm
    // But IE8 doesn't support either with local file

    tests['localstorage'] = function() 
        try 
            localStorage.setItem(mod, mod)
            localStorage.removeItem(mod)
            return true
        } catch(e) 
            return false
        
    }

    tests['sessionstorage'] = function() 
        try 
            sessionStorage.setItem(mod, mod)
            sessionStorage.removeItem(mod)
            return true
        } catch(e) 
            return false
        
    }

    tests['webworkers'] = function() 
        return !!window.Worker
    }

    tests['applicationcache'] = function() 
        return !!window.applicationCache
    }

    // Thanks to Erik Dahlstro
    tests['svg'] = function() 
        return !!document.createElementNS && !!document.createElementNS(ns.svg, 'svg').createSVGRect
    }

    // specifically for SVG inline in HTML, not within XHTM
    // test page: paulirish.com/demo/inline-sv
    tests['inlinesvg'] = function() 
      var div = document.createElement('div')
      div.innerHTML = '<svg/>'
      return (div.firstChild && div.firstChild.namespaceURI) == ns.svg
    }

    // SVG SMIL animatio
    tests['smil'] = function() 
        return !!document.createElementNS && /SVGAnimate/.test(toString.call(document.createElementNS(ns.svg, 'animate')))
    }

    // This test is only for clip paths in SVG proper, not clip paths on HTML conten
    // demo: srufaculty.sru.edu/david.dailey/svg/newstuff/clipPath4.sv

    // However read the comments to dig into applying SVG clippaths to HTML content here
    //   github.com/Modernizr/Modernizr/issues/213#issuecomment-114949
    tests['svgclippaths'] = function() 
        return !!document.createElementNS && /SVGClipPath/.test(toString.call(document.createElementNS(ns.svg, 'clipPath')))
    }

    /*>>webforms*
    // input features and input types go directly onto the ret object, bypassing the tests loop
    // Hold this guy to execute in a moment
    function webforms() 
        /*>>input*
        // Run through HTML5's new input attributes to see if the UA understands any
        // We're using f which is the <input> element created early o
        // Mike Taylr has created a comprehensive resource for testing these attribute
        //   when applied to all input types
        //   miketaylr.com/code/input-type-attr.htm
        // spec: www.whatwg.org/specs/web-apps/current-work/multipage/the-input-element.html#input-type-attr-summar

        // Only input placeholder is tested while textarea's placeholder is not
        // Currently Safari 4 and Opera 11 have support only for the input placeholde
        // Both tests are available in feature-detects/forms-placeholder.j
        Modernizr['input'] = (function( props ) 
            for ( var i = 0, len = props.length; i < len; i++ ) 
                attrs[ props[i] ] = !!(props[i] in inputElem)
            
            if (attrs.list)
              // safari false positive's on datalist: webk.it/7425
              // see also github.com/Modernizr/Modernizr/issues/14
              attrs.list = !!(document.createElement('datalist') && window.HTMLDataListElement)
            
            return attrs
        })('autocomplete autofocus list placeholder max min multiple pattern required step'.split(' '))
        /*>>input*

        /*>>inputtypes*
        // Run through HTML5's new input types to see if the UA understands any
        //   This is put behind the tests runloop because it doesn't return 
        //   true/false like all the other tests; instead, it returns an objec
        //   containing each input type with its corresponding true/false valu

        // Big thanks to @miketaylr for the html5 forms expertise. miketaylr.com
        Modernizr['inputtypes'] = (function(props) 

            for ( var i = 0, bool, inputElemType, defaultView, len = props.length; i < len; i++ ) 

                inputElem.setAttribute('type', inputElemType = props[i])
                bool = inputElem.type !== 'text'

                // We first check to see if the type we give it sticks.
                // If the type does, we feed it a textual value, which shouldn't be valid
                // If the value doesn't stick, we know there's input sanitization which infers a custom U
                if ( bool ) 

                    inputElem.value         = smile
                    inputElem.style.cssText = 'position:absolute;visibility:hidden;'

                    if ( /^range$/.test(inputElemType) && inputElem.style.WebkitAppearance !== undefined ) 

                      docElement.appendChild(inputElem)
                      defaultView = document.defaultView

                      // Safari 2-4 allows the smiley as a value, despite making a slide
                      bool =  defaultView.getComputedStyle &
                              defaultView.getComputedStyle(inputElem, null).WebkitAppearance !== 'textfield' &
                              // Mobile android web browser has false positive, so mus
                              // check the height to see if the widget is actually there
                              (inputElem.offsetHeight !== 0)

                      docElement.removeChild(inputElem)

                    } else if ( /^(search|tel)$/.test(inputElemType) )
                      // Spec doesn't define any special parsing or detectable U
                      //   behaviors so we pass these through as tru

                      // Interestingly, opera fails the earlier test, so it doesn'
                      //  even make it here

                    } else if ( /^(url|email)$/.test(inputElemType) ) 
                      // Real url and email support comes with prebaked validation
                      bool = inputElem.checkValidity && inputElem.checkValidity() === false

                    } else 
                      // If the upgraded input compontent rejects the :) text, we got a winne
                      bool = inputElem.value != smile
                    
                

                inputs[ props[i] ] = !!bool
            
            return inputs
        })('search tel url email datetime date month week time datetime-local number range color'.split(' '))
        /*>>inputtypes*
    
    /*>>webforms*

    // End of test definition
    // ----------------------


    // Run through all tests and detect their support in the current UA
    // todo: hypothetically we could be doing an array of tests and use a basic loop here
    for ( var feature in tests ) 
        if ( hasOwnProp(tests, feature) ) 
            // run the test, throw the return value into the Modernizr
            //   then based on that boolean, define an appropriate classNam
            //   and push it into an array of classes we'll join later
            featureName  = feature.toLowerCase()
            Modernizr[featureName] = tests[feature]()

            classes.push((Modernizr[featureName] ? '' : 'no-') + featureName)
        
    

    /*>>webforms*
    // input tests need to run
    Modernizr.input || webforms()
    /*>>webforms*

    /*
     * addTest allows the user to define their own feature test
     * the result will be added onto the Modernizr object
     * as well as an appropriate className set on the html elemen
     
     * @param feature - String naming the featur
     * @param test - Function returning true if feature is supported, false if no
     *
     Modernizr.addTest = function ( feature, test ) 
       if ( typeof feature == 'object' ) 
         for ( var key in feature ) 
           if ( hasOwnProp( feature, key ) ) 
             Modernizr.addTest( key, feature[ key ] )
           
         
       } else 

         feature = feature.toLowerCase()

         if ( Modernizr[feature] !== undefined ) 
           // we're going to quit if you're trying to overwrite an existing tes
           // if we were to allow it, we'd do this
           //   var re = new RegExp("\\b(no-)?" + feature + "\\b")
           //   docElement.className = docElement.className.replace( re, '' )
           // but, no rly, stuff 'em
           return Modernizr
         

         test = typeof test == 'function' ? test() : test

         if (typeof enableClasses !== "undefined" && enableClasses) 
           docElement.className += ' ' + (test ? '' : 'no-') + feature
         
         Modernizr[feature] = test

       

       return Modernizr; // allow chaining
     }

    // Reset modElem.cssText to nothing to reduce memory footprint
    setCss('')
    modElem = inputElem = null

    /*>>shiv*
    /*! HTML5 Shiv v3.6.1 | @afarkas @jdalton @jon_neal @rem | MIT/GPL2 Licensed *
    ;(function(window, document) 
    /*jshint evil:true *
      /** Preset options *
      var options = window.html5 || {}

      /** Used to skip problem elements *
      var reSkip = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i

      /** Not all elements can be cloned in IE **
      var saveClones = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i

      /** Detect whether the browser supports default html5 styles *
      var supportsHtml5Styles

      /** Name of the expando, to work with multiple documents or to re-shiv one document *
      var expando = '_html5shiv'

      /** The id for the the documents expando *
      var expanID = 0

      /** Cached data for each document *
      var expandoData = {}

      /** Detect whether the browser supports unknown elements *
      var supportsUnknownElements

      (function() 
        try 
            var a = document.createElement('a')
            a.innerHTML = '<xyz></xyz>'
            //if the hidden property is implemented we can assume, that the browser supports basic HTML5 Style
            supportsHtml5Styles = ('hidden' in a)

            supportsUnknownElements = a.childNodes.length == 1 || (function() 
              // assign a false positive if unable to shi
              (document.createElement)('a')
              var frag = document.createDocumentFragment()
              return 
                typeof frag.cloneNode == 'undefined' |
                typeof frag.createDocumentFragment == 'undefined' |
                typeof frag.createElement == 'undefined
              )
            }())
        } catch(e) 
          supportsHtml5Styles = true
          supportsUnknownElements = true
        

      }())

      /*--------------------------------------------------------------------------*

      /*
       * Creates a style sheet with the given CSS text and adds it to the document
       * @privat
       * @param {Document} ownerDocument The document
       * @param {String} cssText The CSS text
       * @returns {StyleSheet} The style element
       *
      function addStyleSheet(ownerDocument, cssText) 
        var p = ownerDocument.createElement('p')
            parent = ownerDocument.getElementsByTagName('head')[0] || ownerDocument.documentElement

        p.innerHTML = 'x<style>' + cssText + '</style>'
        return parent.insertBefore(p.lastChild, parent.firstChild)
      

      /*
       * Returns the value of `html5.elements` as an array
       * @privat
       * @returns {Array} An array of shived element node names
       *
      function getElements() 
        var elements = html5.elements
        return typeof elements == 'string' ? elements.split(' ') : elements
      

        /*
       * Returns the data associated to the given documen
       * @privat
       * @param {Document} ownerDocument The document
       * @returns {Object} An object of data
       *
      function getExpandoData(ownerDocument) 
        var data = expandoData[ownerDocument[expando]]
        if (!data) 
            data = {}
            expanID++
            ownerDocument[expando] = expanID
            expandoData[expanID] = data
        
        return data
      

      /*
       * returns a shived element for the given nodeName and documen
       * @memberOf html
       * @param {String} nodeName name of the elemen
       * @param {Document} ownerDocument The context document
       * @returns {Object} The shived element
       *
      function createElement(nodeName, ownerDocument, data)
        if (!ownerDocument) 
            ownerDocument = document
        
        if(supportsUnknownElements)
            return ownerDocument.createElement(nodeName)
        
        if (!data) 
            data = getExpandoData(ownerDocument)
        
        var node

        if (data.cache[nodeName]) 
            node = data.cache[nodeName].cloneNode()
        } else if (saveClones.test(nodeName)) 
            node = (data.cache[nodeName] = data.createElem(nodeName)).cloneNode()
        } else 
            node = data.createElem(nodeName)
        

        // Avoid adding some elements to fragments in IE < 9 becaus
        // * Attributes like `name` or `type` cannot be set/changed once an elemen
        //   is inserted into a document/fragmen
        // * Link elements with `src` attributes that are inaccessible, as wit
        //   a 403 response, will cause the tab/window to cras
        // * Script elements appended to fragments will execute when their `src
        //   or `text` property is se
        return node.canHaveChildren && !reSkip.test(nodeName) ? data.frag.appendChild(node) : node
      

      /*
       * returns a shived DocumentFragment for the given documen
       * @memberOf html
       * @param {Document} ownerDocument The context document
       * @returns {Object} The shived DocumentFragment
       *
      function createDocumentFragment(ownerDocument, data)
        if (!ownerDocument) 
            ownerDocument = document
        
        if(supportsUnknownElements)
            return ownerDocument.createDocumentFragment()
        
        data = data || getExpandoData(ownerDocument)
        var clone = data.frag.cloneNode()
            i = 0
            elems = getElements()
            l = elems.length
        for(;i<l;i++)
            clone.createElement(elems[i])
        
        return clone
      

      /*
       * Shivs the `createElement` and `createDocumentFragment` methods of the document
       * @privat
       * @param {Document|DocumentFragment} ownerDocument The document
       * @param {Object} data of the document
       *
      function shivMethods(ownerDocument, data) 
        if (!data.cache) 
            data.cache = {}
            data.createElem = ownerDocument.createElement
            data.createFrag = ownerDocument.createDocumentFragment
            data.frag = data.createFrag()
        

        ownerDocument.createElement = function(nodeName) 
          //abort shi
          if (!html5.shivMethods) 
              return data.createElem(nodeName)
          
          return createElement(nodeName, ownerDocument, data)
        }

        ownerDocument.createDocumentFragment = Function('h,f', 'return function(){' 
          'var n=f.cloneNode(),c=n.createElement;' 
          'h.shivMethods&&(' 
            // unroll the `createElement` call
            getElements().join().replace(/\w+/g, function(nodeName) 
              data.createElem(nodeName)
              data.frag.createElement(nodeName)
              return 'c("' + nodeName + '")'
            }) 
          ');return n}
        )(html5, data.frag)
      

      /*--------------------------------------------------------------------------*

      /*
       * Shivs the given document
       * @memberOf html
       * @param {Document} ownerDocument The document to shiv
       * @returns {Document} The shived document
       *
      function shivDocument(ownerDocument) 
        if (!ownerDocument) 
            ownerDocument = document
        
        var data = getExpandoData(ownerDocument)

        if (html5.shivCSS && !supportsHtml5Styles && !data.hasCSS) 
          data.hasCSS = !!addStyleSheet(ownerDocument
            // corrects block display not defined in IE6/7/8/
            'article,aside,figcaption,figure,footer,header,hgroup,nav,section{display:block}' 
            // adds styling not present in IE6/7/8/
            'mark{background:#FF0;color:#000}
          )
        
        if (!supportsUnknownElements) 
          shivMethods(ownerDocument, data)
        
        return ownerDocument
      

      /*--------------------------------------------------------------------------*

      /*
       * The `html5` object is exposed so that more elements can be shived an
       * existing shiving can be detected on iframes
       * @type Objec
       * @exampl
       
       * // options can be changed before the script is include
       * html5 = { 'elements': 'mark section', 'shivCSS': false, 'shivMethods': false }
       *
      var html5 = 

        /*
         * An array or space separated string of node names of the elements to shiv
         * @memberOf html
         * @type Array|Strin
         *
        'elements': options.elements || 'abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video'

        /*
         * A flag to indicate that the HTML5 style sheet should be inserted
         * @memberOf html
         * @type Boolea
         *
        'shivCSS': (options.shivCSS !== false)

        /*
         * Is equal to true if a browser supports creating unknown/HTML5 element
         * @memberOf html
         * @type boolea
         *
        'supportsUnknownElements': supportsUnknownElements

        /*
         * A flag to indicate that the document's `createElement` and `createDocumentFragment
         * methods should be overwritten
         * @memberOf html
         * @type Boolea
         *
        'shivMethods': (options.shivMethods !== false)

        /*
         * A string to describe the type of `html5` object ("default" or "default print")
         * @memberOf html
         * @type Strin
         *
        'type': 'default'

        // shivs the document according to the specified `html5` object option
        'shivDocument': shivDocument

        //creates a shived elemen
        createElement: createElement

        //creates a shived documentFragmen
        createDocumentFragment: createDocumentFragmen
      }

      /*--------------------------------------------------------------------------*

      // expose html
      window.html5 = html5

      // shiv the documen
      shivDocument(document)

    }(this, document))
    /*>>shiv*

    // Assign private properties to the return object with prefi
    Modernizr._version      = version

    // expose these for the plugin API. Look in the source for how to join() them against your inpu
    /*>>prefixes*
    Modernizr._prefixes     = prefixes
    /*>>prefixes*
    /*>>domprefixes*
    Modernizr._domPrefixes  = domPrefixes
    Modernizr._cssomPrefixes  = cssomPrefixes
    /*>>domprefixes*

    /*>>mq*
    // Modernizr.mq tests a given media query, live against the current state of the windo
    // A few important notes
    //   * If a browser does not support media queries at all (eg. oldIE) the mq() will always return fals
    //   * A max-width or orientation query will be evaluated against the current state, which may change later
    //   * You must specify values. Eg. If you are testing support for the min-width media query use
    //       Modernizr.mq('(min-width:0)'
    // usage
    // Modernizr.mq('only screen and (max-width:768)'
    Modernizr.mq            = testMediaQuery
    /*>>mq*

    /*>>hasevent*
    // Modernizr.hasEvent() detects support for a given event, with an optional element to test o
    // Modernizr.hasEvent('gesturestart', elem
    Modernizr.hasEvent      = isEventSupported
    /*>>hasevent*

    /*>>testprop*
    // Modernizr.testProp() investigates whether a given style property is recognize
    // Note that the property names must be provided in the camelCase variant
    // Modernizr.testProp('pointerEvents'
    Modernizr.testProp      = function(prop)
        return testProps([prop])
    }
    /*>>testprop*

    /*>>testallprops*
    // Modernizr.testAllProps() investigates whether a given style property
    //   or any of its vendor-prefixed variants, is recognize
    // Note that the property names must be provided in the camelCase variant
    // Modernizr.testAllProps('boxSizing'
    Modernizr.testAllProps  = testPropsAll
    /*>>testallprops*

    /*>>teststyles*
    // Modernizr.testStyles() allows you to add custom styles to the document and test an element afterward
    // Modernizr.testStyles('#modernizr { position:absolute }', function(elem, rule){ ... }
    Modernizr.testStyles    = injectElementWithStyles
    /*>>teststyles*

    /*>>prefixed*
    // Modernizr.prefixed() returns the prefixed or nonprefixed property name variant of your inpu
    // Modernizr.prefixed('boxSizing') // 'MozBoxSizing

    // Properties must be passed as dom-style camelcase, rather than `box-sizing` hypentated style
    // Return values will also be the camelCase variant, if you need to translate that to hypenated style use
    /
    //     str.replace(/([A-Z])/g, function(str,m1){ return '-' + m1.toLowerCase(); }).replace(/^ms-/,'-ms-')

    // If you're trying to ascertain which transition end event to bind to, you might do something like..
    /
    //     var transEndEventNames = 
    //       'WebkitTransition' : 'webkitTransitionEnd'
    //       'MozTransition'    : 'transitionend'
    //       'OTransition'      : 'oTransitionEnd'
    //       'msTransition'     : 'MSTransitionEnd'
    //       'transition'       : 'transitionend
    //     }
    //     transEndEventName = transEndEventNames[ Modernizr.prefixed('transition') ]

    Modernizr.prefixed      = function(prop, obj, elem)
      if(!obj) 
        return testPropsAll(prop, 'pfx')
      } else 
        // Testing DOM property e.g. Modernizr.prefixed('requestAnimationFrame', window) // 'mozRequestAnimationFrame
        return testPropsAll(prop, obj, elem)
      
    }
    /*>>prefixed*

    /*>>cssclasses*
    // Remove "no-js" class from <html> element, if it exists
    docElement.className = docElement.className.replace(/(^|\s)no-js(\s|$)/, '$1$2') 

                            // Add the new classes to the <html> element
                            (enableClasses ? ' js ' + classes.join(' ') : '')
    /*>>cssclasses*

    return Modernizr

})(this, this.document);
