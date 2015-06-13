/*! DataTables 1.10.0-de
 * ©2008-2013 SpryMedia Ltd - datatables.net/licens
 *

/*
 * @summary     DataTable
 * @description Paginate, search and order HTML table
 * @version     1.10.0-de
 * @file        jquery.dataTables.j
 * @author      SpryMedia Ltd (www.sprymedia.co.uk
 * @contact     www.sprymedia.co.uk/contac
 * @copyright   Copyright 2008-2013 SpryMedia Ltd
 
 * This source file is free software, available under the following license
 *   MIT license - http://datatables.net/licens
 
 * This source file is distributed in the hope that it will be useful, bu
 * WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILIT
 * or FITNESS FOR A PARTICULAR PURPOSE. See the license files for details
 
 * For details please refer to: http://www.datatables.ne
 *

/*jslint evil: true, undef: true, browser: true *
/*globals $,require,jQuery,define,_selector_run,_selector_opts,_selector_first,_selector_row_indexes,_ext,_Api,_api_register,_api_registerPlural,_re_new_lines,_re_html,_re_formatted_numeric,_empty,_intVal,_isNumber,_isHtml,_htmlNumeric,_pluck,_pluck_order,_range,_stripHtml,_unique,_fnBuildAjax,_fnAjaxUpdate,_fnAjaxParameters,_fnAjaxUpdateDraw,_fnAjaxDataSrc,_fnAddColumn,_fnColumnOptions,_fnAdjustColumnSizing,_fnVisibleToColumnIndex,_fnColumnIndexToVisible,_fnVisbleColumns,_fnGetColumns,_fnColumnTypes,_fnApplyColumnDefs,_fnHungarianMap,_fnCamelToHungarian,_fnLanguageCompat,_fnBrowserDetect,_fnAddData,_fnAddTr,_fnNodeToDataIndex,_fnNodeToColumnIndex,_fnGetRowData,_fnGetCellData,_fnSetCellData,_fnSplitObjNotation,_fnGetObjectDataFn,_fnSetObjectDataFn,_fnGetDataMaster,_fnClearTable,_fnDeleteIndex,_fnInvalidateRow,_fnGetRowElements,_fnCreateTr,_fnBuildHead,_fnDrawHead,_fnDraw,_fnReDraw,_fnAddOptionsHtml,_fnDetectHeader,_fnGetUniqueThs,_fnFeatureHtmlFilter,_fnFilterComplete,_fnFilterCustom,_fnFilterColumn,_fnFilter,_fnFilterCreateSearch,_fnEscapeRegex,_fnFilterData,_fnFeatureHtmlInfo,_fnUpdateInfo,_fnInfoMacros,_fnInitialise,_fnInitComplete,_fnLengthChange,_fnFeatureHtmlLength,_fnFeatureHtmlPaginate,_fnPageChange,_fnFeatureHtmlProcessing,_fnProcessingDisplay,_fnFeatureHtmlTable,_fnScrollDraw,_fnApplyToChildren,_fnCalculateColumnWidths,_fnThrottle,_fnConvertToWidth,_fnScrollingWidthAdjust,_fnGetWidestNode,_fnGetMaxLenString,_fnStringToCss,_fnScrollBarWidth,_fnSortFlatten,_fnSort,_fnSortAria,_fnSortListener,_fnSortAttachListener,_fnSortingClasses,_fnSortData,_fnSaveState,_fnLoadState,_fnSettingsFromNode,_fnLog,_fnMap,_fnBindAction,_fnCallbackReg,_fnCallbackFire,_fnLengthOverflow,_fnRenderer,_fnDataSource,_fnRowAttributes*

(/** @lends <global> */function( window, document, undefined ) 

(function( factory ) 
	"use strict"

	// Define as an AMD module if possibl
	if ( typeof define === 'function' && define.amd 
	
		define( 'datatables', ['jquery'], factory )
	
	/* Define using browser globals otherwis
	 * Prevent multiple instantiations if the script is loaded twic
	 *
	else if ( jQuery && !jQuery.fn.dataTable 
	
		factory( jQuery )
	

(/** @lends <global> */function( $ ) 
	"use strict"

	/*
	 * DataTables is a plug-in for the jQuery Javascript library. It is a highl
	 * flexible tool, based upon the foundations of progressive enhancement
	 * which will add advanced interaction controls to any HTML table. For 
	 * full list of features please refer t
	 * [DataTables.net](href="http://datatables.net)
	 
	 * Note that the `DataTable` object is not a global variable but is aliase
	 * to `jQuery.fn.DataTable` and `jQuery.fn.dataTable` through which it ma
	 * be  accessed
	 
	 *  @clas
	 *  @param {object} [init={}] Configuration object for DataTables. Option
	 *    are defined by {@link DataTable.defaults
	 *  @requires jQuery 1.7
	 
	 *  @exampl
	 *    // Basic initialisatio
	 *    $(document).ready( function 
	 *      $('#example').dataTable()
	 *    } )
	 
	 *  @exampl
	 *    // Initialisation with configuration options - in this case, disabl
	 *    // pagination and sorting
	 *    $(document).ready( function 
	 *      $('#example').dataTable( 
	 *        "paginate": false
	 *        "sort": fals
	 *      } )
	 *    } )
	 *
	var DataTable


	/
	 * It is useful to have variables which are scoped locally so only th
	 * DataTables functions can access them and they don't leak into global space
	 * At the same time these functions are often useful over multiple files in th
	 * core and API, so we list, or at least document, all variables which are use
	 * by DataTables as private variables here. This also ensures that there is n
	 * clashing of variable names and that they can easily referenced for reuse
	 *


	// Defined else wher
	//  _selector_ru
	//  _selector_opt
	//  _selector_firs
	//  _selector_row_indexe

	var _ext; // DataTable.ex
	var _Api; // DataTable.Ap
	var _api_register; // DataTable.Api.registe
	var _api_registerPlural; // DataTable.Api.registerPlura

	var _re_new_lines = /[\r\n]/g
	var _re_html = /<.*?>/g
	var _re_formatted_numeric = /[',$£€¥%]/g
	var _re_date_start = /^[\d\+\-a-zA-Z]/




	var _empty = function ( d ) 
		return !d || d === '-' ? true : false
	}


	var _intVal = function ( s ) 
		var integer = parseInt( s, 10 )
		return !isNaN(integer) && isFinite(s) ? integer : null
	}


	var _isNumber = function ( d, formatted ) 
		if ( formatted && typeof d === 'string' ) 
			d = d.replace( _re_formatted_numeric, '' )
		

		return !d || d==='-' || (!isNaN( parseFloat(d) ) && isFinite( d ))
	}


	// A string without HTML in it can be considered to be HTML stil
	var _isHtml = function ( d ) 
		return !d || typeof d === 'string'
	}


	var _htmlNumeric = function ( d, formatted ) 
		if ( _empty( d ) ) 
			return true
		

		var html = _isHtml( d )
		return ! html 
			null 
			_isNumber( _stripHtml( d ), formatted ) 
				true 
				null
	}


	var _pluck = function ( a, prop, prop2 ) 
		var out = []
		var i=0, ien=a.length

		// Could have the test in the loop for slightly smaller code, but spee
		// is essential her
		if ( prop2 !== undefined ) 
			for ( ; i<ien ; i++ ) 
				if ( a[i] && a[i][ prop ] ) 
					out.push( a[i][ prop ][ prop2 ] )
				
			
		
		else 
			for ( ; i<ien ; i++ ) 
				if ( a[i] ) 
					out.push( a[i][ prop ] )
				
			
		

		return out
	}


	// Basically the same as _pluck, but rather than looping over `a` we use `order
	// as the indexes to pick from `a
	var _pluck_order = function ( a, order, prop, prop2 
	
		var out = []
		var i=0, ien=order.length

		// Could have the test in the loop for slightly smaller code, but spee
		// is essential her
		if ( prop2 !== undefined ) 
			for ( ; i<ien ; i++ ) 
				out.push( a[ order[i] ][ prop ][ prop2 ] )
			
		
		else 
			for ( ; i<ien ; i++ ) 
				out.push( a[ order[i] ][ prop ] )
			
		

		return out
	}


	var _range = function ( len, start 
	
		var out = []
		var end

		if ( start === undefined ) 
			start = 0
			end = len
		
		else 
			end = start
			start = len
		

		for ( var i=start ; i<end ; i++ ) 
			out.push( i )
		

		return out
	}


	var _stripHtml = function ( d ) 
		return d.replace( _re_html, '' )
	}


	/*
	 * Find the unique elements in a source array
	 
	 * @param  {array} src Source arra
	 * @return {array} Array of unique item
	 * @ignor
	 *
	var _unique = function ( src 
	
		// A faster unique method is to use object keys to identify used values
		// but this doesn't work with arrays or objects, which we must als
		// consider. See jsperf.com/compare-array-unique-versions/4 for mor
		// information
		va
			out = []
			val
			i, ien=src.length
			j, k=0

		again: for ( i=0 ; i<ien ; i++ ) 
			val = src[i]

			for ( j=0 ; j<k ; j++ ) 
				if ( out[j] === val ) 
					continue again
				
			

			out.push( val )
			k++
		

		return out
	}



	/*
	 * Create a mapping object that allows camel case parameters to be looked u
	 * for their Hungarian counterparts. The mapping is stored in a privat
	 * parameter called `_hungarianMap` which can be accessed on the source object
	 *  @param {object} 
	 *  @memberof DataTable#oAp
	 *
	function _fnHungarianMap ( o 
	
		va
			hungarian = 'a aa ao as b fn i m o s '
			match
			newKey
			map = {}

		$.each( o, function (key, val) 
			match = key.match(/^([^A-Z]+?)([A-Z])/)

			if ( match && hungarian.indexOf(match[1]+' ') !== -1 
			
				newKey = key.replace( match[0], match[2].toLowerCase() )
				map[ newKey ] = key

				if ( match[1] === 'o' 
				
					_fnHungarianMap( o[key] )
				
			
		} )

		o._hungarianMap = map
	


	/*
	 * Convert from camel case parameters to Hungarian, based on a Hungarian ma
	 * created by _fnHungarianMap
	 *  @param {object} src The model object which holds all parameters that can b
	 *    mapped
	 *  @param {object} user The object to convert from camel case to Hungarian
	 *  @param {boolean} force When set to `true`, properties which already have 
	 *    Hungarian value in the `user` object will be overwritten. Otherwise the
	 *    won't be
	 *  @memberof DataTable#oAp
	 *
	function _fnCamelToHungarian ( src, user, force 
	
		if ( ! src._hungarianMap 
		
			_fnHungarianMap( src )
		

		var hungarianKey

		$.each( user, function (key, val) 
			hungarianKey = src._hungarianMap[ key ]

			if ( hungarianKey !== undefined && (force || user[hungarianKey] === undefined) 
			
				user[hungarianKey] = user[ key ]

				if ( hungarianKey.charAt(0) === 'o' 
				
					_fnCamelToHungarian( src[hungarianKey], user[key] )
				
			
		} )
	


	/*
	 * Language compatibility - when certain options are given, and others aren't, w
	 * need to duplicate the values over, in order to provide backwards compatibilit
	 * with older language files
	 *  @param {object} oSettings dataTables settings objec
	 *  @memberof DataTable#oAp
	 *
	function _fnLanguageCompat( oLanguage 
	
		var oDefaults = DataTable.defaults.oLanguage
		var zeroRecords = oLanguage.sZeroRecords

		/* Backwards compatibility - if there is no sEmptyTable given, then use the same a
		 * sZeroRecords - assuming that is given
		 *
		if ( !oLanguage.sEmptyTable && zeroRecords &
			oDefaults.sEmptyTable === "No data available in table" 
		
			_fnMap( oLanguage, oLanguage, 'sZeroRecords', 'sEmptyTable' )
		

		/* Likewise with loading records *
		if ( !oLanguage.sLoadingRecords && zeroRecords &
			oDefaults.sLoadingRecords === "Loading..." 
		
			_fnMap( oLanguage, oLanguage, 'sZeroRecords', 'sLoadingRecords' )
		
	


	/*
	 * Map one parameter onto anothe
	 *  @param {object} o Object to ma
	 *  @param {*} knew The new parameter nam
	 *  @param {*} old The old parameter nam
	 *
	var _fnCompatMap = function ( o, knew, old ) 
		if ( o[ knew ] !== undefined ) 
			o[ old ] = o[ knew ]
		
	}


	/*
	 * Provide backwards compatibility for the main DT options. Note that the ne
	 * options are mapped onto the old parameters, so this is an external interfac
	 * change only
	 *  @param {object} init Object to ma
	 *
	function _fnCompatOpts ( init 
	
		_fnCompatMap( init, 'ordering',      'bSort' )
		_fnCompatMap( init, 'orderMulti',    'bSortMulti' )
		_fnCompatMap( init, 'orderClasses',  'bSortClasses' )
		_fnCompatMap( init, 'orderCellsTop', 'bSortCellsTop' )
		_fnCompatMap( init, 'order',         'aaSorting' )
		_fnCompatMap( init, 'orderFixed',    'aaSortingFixed' )
		_fnCompatMap( init, 'paging',        'bPaginate' )
		_fnCompatMap( init, 'pagingType',    'sPaginationType' )
		_fnCompatMap( init, 'pageLength',    'iDisplayLength' )
		_fnCompatMap( init, 'searching',     'bFilter' )
	


	/*
	 * Provide backwards compatibility for column options. Note that the new option
	 * are mapped onto the old parameters, so this is an external interface chang
	 * only
	 *  @param {object} init Object to ma
	 *
	function _fnCompatCols ( init 
	
		_fnCompatMap( init, 'orderable',     'bSortable' )
		_fnCompatMap( init, 'orderData',     'aDataSort' )
		_fnCompatMap( init, 'orderSequence', 'asSorting' )
		_fnCompatMap( init, 'orderDataType', 'sortDataType' )
	


	/*
	 * Browser feature detection for capabilities, quirk
	 *  @param {object} settings dataTables settings objec
	 *  @memberof DataTable#oAp
	 *
	function _fnBrowserDetect( settings 
	
		var browser = settings.oBrowser

		// Scrolling feature / quirks detectio
		var n = $('<div/>'
			.css( 
				position: 'absolute'
				top: 0
				left: 0
				height: 1
				width: 1
				overflow: 'hidden
			} 
			.append
				$('<div/>'
					.css( 
						position: 'absolute'
						top: 1
						left: 1
						width: 100
						overflow: 'scroll
					} 
					.append
						$('<div class="test"/>'
							.css( 
								width: '100%'
								height: 1
							} 
					
			
			.appendTo( 'body' )

		var test = n.find('.test')

		// IE6/7 will oversize a width 100% element inside a scrolling element, t
		// include the width of the scrollbar, while other browsers ensure the inne
		// element is contained without forcing scrollin
		browser.bScrollOversize = test[0].offsetWidth === 100

		// In rtl text layout, some browsers (most, but not all) will place th
		// scrollbar on the left, rather than the right
		browser.bScrollbarLeft = test.offset().left !== 1

		n.remove()
	

	/*
	 * Add a column to the list used for the table with default value
	 *  @param {object} oSettings dataTables settings objec
	 *  @param {node} nTh The th element for this colum
	 *  @memberof DataTable#oAp
	 *
	function _fnAddColumn( oSettings, nTh 
	
		var oDefaults = DataTable.defaults.column
		var iCol = oSettings.aoColumns.length
		var oCol = $.extend( {}, DataTable.models.oColumn, oDefaults, 
			"sSortingClass": oSettings.oClasses.sSortable
			"sSortingClassJUI": oSettings.oClasses.sSortJUI
			"nTh": nTh ? nTh : document.createElement('th')
			"sTitle":    oDefaults.sTitle    ? oDefaults.sTitle    : nTh ? nTh.innerHTML : ''
			"aDataSort": oDefaults.aDataSort ? oDefaults.aDataSort : [iCol]
			"mData": oDefaults.mData ? oDefaults.mData : iCo
		} )
		oSettings.aoColumns.push( oCol )

		/* Add a column specific filter *
		if ( oSettings.aoPreSearchCols[ iCol ] === undefined || oSettings.aoPreSearchCols[ iCol ] === null 
		
			oSettings.aoPreSearchCols[ iCol ] = $.extend( true, {}, DataTable.models.oSearch )
		
		els
		
			var oPre = oSettings.aoPreSearchCols[ iCol ]

			/* Don't require that the user must specify bRegex, bSmart or bCaseInsensitive *
			if ( oPre.bRegex === undefined 
			
				oPre.bRegex = true
			

			if ( oPre.bSmart === undefined 
			
				oPre.bSmart = true
			

			if ( oPre.bCaseInsensitive === undefined 
			
				oPre.bCaseInsensitive = true
			
		

		/* Use the column options function to initialise classes etc *
		_fnColumnOptions( oSettings, iCol, null )
	


	/*
	 * Apply options for a colum
	 *  @param {object} oSettings dataTables settings objec
	 *  @param {int} iCol column index to conside
	 *  @param {object} oOptions object with sType, bVisible and bSearchable et
	 *  @memberof DataTable#oAp
	 *
	function _fnColumnOptions( oSettings, iCol, oOptions 
	
		var oCol = oSettings.aoColumns[ iCol ]
		var oClasses = oSettings.oClasses

		// Try to get width information from the DOM. We can't get it from CS
		// as we'd need to parse the CSS stylesheet. `width` option can overrid
		if ( ! oCol.sWidthOrig ) 
			var th = $(oCol.nTh)

			// Width attribut
			oCol.sWidthOrig = th.attr('width') || null

			// Style attribut
			var t = (th.attr('style') || '').match(/width:\s*(\d+[pxem%])/)
			if ( t ) 
				oCol.sWidthOrig = t[1]
			
		

		/* User specified column options *
		if ( oOptions !== undefined && oOptions !== null 
		
			// Backwards compatibilit
			_fnCompatCols( oOptions )

			// Map camel case parameters to their Hungarian counterpart
			_fnCamelToHungarian( DataTable.defaults.column, oOptions )

			/* Backwards compatibility for mDataProp *
			if ( oOptions.mDataProp !== undefined && !oOptions.mData 
			
				oOptions.mData = oOptions.mDataProp
			

			oCol._sManualType = oOptions.sType

			// `class` is a reserved word in Javascript, so we need to provid
			// the ability to use a valid name for the camel case inpu
			if ( oOptions.className && ! oOptions.sClass 
			
				oOptions.sClass = oOptions.className
			

			$.extend( oCol, oOptions )
			_fnMap( oCol, oOptions, "sWidth", "sWidthOrig" )

			/* iDataSort to be applied (backwards compatibility), but aDataSort will tak
			 * priority if define
			 *
			if ( typeof oOptions.iDataSort === 'number' 
			
				oCol.aDataSort = [ oOptions.iDataSort ]
			
			_fnMap( oCol, oOptions, "aDataSort" )
		

		/* Cache the data get and set functions for speed *
		var mDataSrc = oCol.mData
		var mData = _fnGetObjectDataFn( mDataSrc )
		var mRender = oCol.mRender ? _fnGetObjectDataFn( oCol.mRender ) : null

		var attrTest = function( src ) 
			return typeof src === 'string' && src.indexOf('@') !== -1
		}
		oCol._bAttrSrc = $.isPlainObject( mDataSrc ) && 
			attrTest(mDataSrc.sort) || attrTest(mDataSrc.type) || attrTest(mDataSrc.filter
		)

		oCol.fnGetData = function (oData, sSpecific) 
			var innerData = mData( oData, sSpecific )

			if ( oCol.mRender && (sSpecific && sSpecific !== '') 
			
				return mRender( innerData, sSpecific, oData )
			
			return innerData
		}
		oCol.fnSetData = _fnSetObjectDataFn( mDataSrc )

		/* Feature sorting overrides column specific when off *
		if ( !oSettings.oFeatures.bSort 
		
			oCol.bSortable = false
		

		/* Check that the class assignment is correct for sorting *
		var bAsc = $.inArray('asc', oCol.asSorting) !== -1
		var bDesc = $.inArray('desc', oCol.asSorting) !== -1
		if ( !oCol.bSortable || (!bAsc && !bDesc) 
		
			oCol.sSortingClass = oClasses.sSortableNone
			oCol.sSortingClassJUI = ""
		
		else if ( bAsc && !bDesc 
		
			oCol.sSortingClass = oClasses.sSortableAsc
			oCol.sSortingClassJUI = oClasses.sSortJUIAscAllowed
		
		else if ( !bAsc && bDesc 
		
			oCol.sSortingClass = oClasses.sSortableDesc
			oCol.sSortingClassJUI = oClasses.sSortJUIDescAllowed
		
	


	/*
	 * Adjust the table column widths for new data. Note: you would probably want t
	 * do a redraw after calling this function
	 *  @param {object} settings dataTables settings objec
	 *  @memberof DataTable#oAp
	 *
	function _fnAdjustColumnSizing ( settings 
	
		/* Not interested in doing column width calculation if auto-width is disabled *
		if ( settings.oFeatures.bAutoWidth !== false 
		
			var columns = settings.aoColumns

			_fnCalculateColumnWidths( settings )
			for ( var i=0 , iLen=columns.length ; i<iLen ; i++ 
			
				columns[i].nTh.style.width = columns[i].sWidth
			
		

		var scroll = settings.oScroll
		if ( scroll.sY !== '' || scroll.sX !== ''
		
			_fnScrollDraw( settings )
		

		_fnCallbackFire( settings, null, 'column-sizing', [settings] )
	


	/*
	 * Covert the index of a visible column to the index in the data array (take accoun
	 * of hidden columns
	 *  @param {object} oSettings dataTables settings objec
	 *  @param {int} iMatch Visible column index to looku
	 *  @returns {int} i the data inde
	 *  @memberof DataTable#oAp
	 *
	function _fnVisibleToColumnIndex( oSettings, iMatch 
	
		var aiVis = _fnGetColumns( oSettings, 'bVisible' )

		return typeof aiVis[iMatch] === 'number' 
			aiVis[iMatch] 
			null
	


	/*
	 * Covert the index of an index in the data array and convert it to the visibl
	 *   column index (take account of hidden columns
	 *  @param {int} iMatch Column index to looku
	 *  @param {object} oSettings dataTables settings objec
	 *  @returns {int} i the data inde
	 *  @memberof DataTable#oAp
	 *
	function _fnColumnIndexToVisible( oSettings, iMatch 
	
		var aiVis = _fnGetColumns( oSettings, 'bVisible' )
		var iPos = $.inArray( iMatch, aiVis )

		return iPos !== -1 ? iPos : null
	


	/*
	 * Get the number of visible column
	 *  @param {object} oSettings dataTables settings objec
	 *  @returns {int} i the number of visible column
	 *  @memberof DataTable#oAp
	 *
	function _fnVisbleColumns( oSettings 
	
		return _fnGetColumns( oSettings, 'bVisible' ).length
	


	/*
	 * Get an array of column indexes that match a given propert
	 *  @param {object} oSettings dataTables settings objec
	 *  @param {string} sParam Parameter in aoColumns to look for - typicall
	 *    bVisible or bSearchabl
	 *  @returns {array} Array of indexes with matched propertie
	 *  @memberof DataTable#oAp
	 *
	function _fnGetColumns( oSettings, sParam 
	
		var a = []

		$.map( oSettings.aoColumns, function(val, i) 
			if ( val[sParam] ) 
				a.push( i )
			
		} )

		return a
	


	function _fnColumnTypes ( settings 
	
		var columns = settings.aoColumns
		var data = settings.aoData
		var types = DataTable.ext.type.detect
		var i, ien, j, jen, k, ken
		var col, cell, detectedType, cache

		// For each column, spin over the
		for ( i=0, ien=columns.length ; i<ien ; i++ ) 
			col = columns[i]
			cache = []

			if ( ! col.sType && col._sManualType ) 
				col.sType = col._sManualType
			
			else if ( ! col.sType ) 
				for ( j=0, jen=types.length ; j<jen ; j++ ) 
					for ( k=0, ken=data.length ; k<ken ; k++ ) 
						// Use a cache array so we only need to get the type dat
						// from the formatter once (when using multiple detectors
						if ( cache[k] === undefined ) 
							cache[k] = _fnGetCellData( settings, k, i, 'type' )
						

						detectedType = types[j]( cache[k] )

						// Doesn't match, so break early, since this type can'
						// apply to this column. Also, HTML is a special case sinc
						// it is so similar to `string`. Just a single match i
						// needed for a column to be html typ
						if ( ! detectedType || detectedType === 'html' ) 
							break
						
					

					// Type is valid for all data points in the column - use thi
					// typ
					if ( detectedType ) 
						col.sType = detectedType
						break
					
				

				// Fall back - if no type was detected, always use strin
				if ( ! col.sType ) 
					col.sType = 'string'
				
			
		
	


	/*
	 * Take the column definitions and static columns arrays and calculate ho
	 * they relate to column indexes. The callback function will then apply th
	 * definition found for a column to a suitable configuration object
	 *  @param {object} oSettings dataTables settings objec
	 *  @param {array} aoColDefs The aoColumnDefs array that is to be applie
	 *  @param {array} aoCols The aoColumns array that defines columns individuall
	 *  @param {function} fn Callback function - takes two parameters, the calculate
	 *    column index and the definition for that column
	 *  @memberof DataTable#oAp
	 *
	function _fnApplyColumnDefs( oSettings, aoColDefs, aoCols, fn 
	
		var i, iLen, j, jLen, k, kLen, def

		// Column definitions with aTarget
		if ( aoColDefs 
		
			/* Loop over the definitions array - loop in reverse so first instance has priority *
			for ( i=aoColDefs.length-1 ; i>=0 ; i-- 
			
				def = aoColDefs[i]

				/* Each definition can target multiple columns, as it is an array *
				var aTargets = def.targets !== undefined 
					def.targets 
					def.aTargets

				if ( ! $.isArray( aTargets ) 
				
					aTargets = [ aTargets ]
				

				for ( j=0, jLen=aTargets.length ; j<jLen ; j++ 
				
					if ( typeof aTargets[j] === 'number' && aTargets[j] >= 0 
					
						/* Add columns that we don't yet know about *
						while( oSettings.aoColumns.length <= aTargets[j] 
						
							_fnAddColumn( oSettings )
						

						/* Integer, basic index *
						fn( aTargets[j], def )
					
					else if ( typeof aTargets[j] === 'number' && aTargets[j] < 0 
					
						/* Negative integer, right to left column counting *
						fn( oSettings.aoColumns.length+aTargets[j], def )
					
					else if ( typeof aTargets[j] === 'string' 
					
						/* Class name matching on TH element *
						for ( k=0, kLen=oSettings.aoColumns.length ; k<kLen ; k++ 
						
							if ( aTargets[j] == "_all" |
							     $(oSettings.aoColumns[k].nTh).hasClass( aTargets[j] ) 
							
								fn( k, def )
							
						
					
				
			
		

		// Statically defined columns arra
		if ( aoCols 
		
			for ( i=0, iLen=aoCols.length ; i<iLen ; i++ 
			
				fn( i, aoCols[i] )
			
		
	

	/*
	 * Add a data array to the table, creating DOM node etc. This is the parallel t
	 * _fnGatherData, but for adding rows from a Javascript source, rather than 
	 * DOM source
	 *  @param {object} oSettings dataTables settings objec
	 *  @param {array} aData data array to be adde
	 *  @param {node} [nTr] TR element to add to the table - optional. If not given
	 *    DataTables will create a row automaticall
	 *  @param {array} [anTds] Array of TD|TH elements for the row - must be give
	 *    if nTr is
	 *  @returns {int} >=0 if successful (index of new aoData entry), -1 if faile
	 *  @memberof DataTable#oAp
	 *
	function _fnAddData ( oSettings, aDataIn, nTr, anTds 
	
		/* Create the object for storing information about this new row *
		var iRow = oSettings.aoData.length
		var oData = $.extend( true, {}, DataTable.models.oRow, 
			src: nTr ? 'dom' : 'data
		} )

		oData._aData = aDataIn
		oSettings.aoData.push( oData )

		/* Create the cells *
		var nTd, sThisType
		var columns = oSettings.aoColumns
		for ( var i=0, iLen=columns.length ; i<iLen ; i++ 
		
			// When working with a row, the data source object must be populated. I
			// all other cases, the data source object is already populated, so w
			// don't overwrite it, which might break bindings et
			if ( nTr ) 
				_fnSetCellData( oSettings, iRow, i, _fnGetCellData( oSettings, iRow, i ) )
			
			columns[i].sType = null
		

		/* Add to the display array *
		oSettings.aiDisplayMaster.push( iRow )

		/* Create the DOM information *
		if ( !oSettings.oFeatures.bDeferRender 
		
			_fnCreateTr( oSettings, iRow, nTr, anTds )
		

		return iRow
	


	/*
	 * Add one or more TR elements to the table. Generally we'd expect t
	 * use this for reading data from a DOM sourced table, but it could b
	 * used for an TR element. Note that if a TR is given, it is used (i.e
	 * it is not cloned)
	 *  @param {object} settings dataTables settings objec
	 *  @param {array|node|jQuery} trs The TR element(s) to add to the tabl
	 *  @returns {array} Array of indexes for the added row
	 *  @memberof DataTable#oAp
	 *
	function _fnAddTr( settings, trs 
	
		var row

		// Allow an individual node to be passed i
		if ( ! (trs instanceof $) ) 
			trs = $(trs)
		

		return trs.map( function (i, el) 
			row = _fnGetRowElements( settings, el )
			return _fnAddData( settings, row.data, el, row.cells )
		} )
	


	/*
	 * Take a TR element and convert it to an index in aoDat
	 *  @param {object} oSettings dataTables settings objec
	 *  @param {node} n the TR element to fin
	 *  @returns {int} index if the node is found, null if no
	 *  @memberof DataTable#oAp
	 *
	function _fnNodeToDataIndex( oSettings, n 
	
		return (n._DT_RowIndex!==undefined) ? n._DT_RowIndex : null
	


	/*
	 * Take a TD element and convert it into a column data index (not the visible index
	 *  @param {object} oSettings dataTables settings objec
	 *  @param {int} iRow The row number the TD/TH can be found i
	 *  @param {node} n The TD/TH element to fin
	 *  @returns {int} index if the node is found, -1 if no
	 *  @memberof DataTable#oAp
	 *
	function _fnNodeToColumnIndex( oSettings, iRow, n 
	
		return $.inArray( n, oSettings.aoData[ iRow ].anCells )
	


	/*
	 * Get an array of data for a given row from the internal data cach
	 *  @param {object} oSettings dataTables settings objec
	 *  @param {int} iRow aoData row i
	 *  @param {string} sSpecific data get type ('type' 'filter' 'sort'
	 *  @param {array} aiColumns Array of column indexes to get data fro
	 *  @returns {array} Data arra
	 *  @memberof DataTable#oAp
	 *
	function _fnGetRowData( oSettings, iRow, sSpecific, aiColumns 
	
		var out = []
		for ( var i=0, iLen=aiColumns.length ; i<iLen ; i++ 
		
			out.push( _fnGetCellData( oSettings, iRow, aiColumns[i], sSpecific ) )
		
		return out
	


	/*
	 * Get the data for a given cell from the internal cache, taking into account data mappin
	 *  @param {object} oSettings dataTables settings objec
	 *  @param {int} iRow aoData row i
	 *  @param {int} iCol Column inde
	 *  @param {string} sSpecific data get type ('display', 'type' 'filter' 'sort'
	 *  @returns {*} Cell dat
	 *  @memberof DataTable#oAp
	 *
	function _fnGetCellData( oSettings, iRow, iCol, sSpecific 
	
		var oCol = oSettings.aoColumns[iCol]
		var oData = oSettings.aoData[iRow]._aData
		var sData = oCol.fnGetData( oData, sSpecific )

		if ( sData === undefined 
		
			if ( oSettings.iDrawError != oSettings.iDraw && oCol.sDefaultContent === null 
			
				_fnLog( oSettings, 0, "Requested unknown parameter "
					(typeof oCol.mData=='function' ? '{function}' : "'"+oCol.mData+"'")
					" for row "+iRow, 4 )
				oSettings.iDrawError = oSettings.iDraw
			
			return oCol.sDefaultContent
		

		/* When the data source is null, we can use default column data *
		if ( (sData === oData || sData === null) && oCol.sDefaultContent !== null 
		
			sData = oCol.sDefaultContent
		
		else if ( typeof sData === 'function' 
		
			// If the data source is a function, then we run it and use the retur
			return sData()
		

		if ( sData === null && sSpecific == 'display' 
		
			return ''
		
		return sData
	


	/*
	 * Set the value for a specific cell, into the internal data cach
	 *  @param {object} oSettings dataTables settings objec
	 *  @param {int} iRow aoData row i
	 *  @param {int} iCol Column inde
	 *  @param {*} val Value to se
	 *  @memberof DataTable#oAp
	 *
	function _fnSetCellData( oSettings, iRow, iCol, val 
	
		var oCol = oSettings.aoColumns[iCol]
		var oData = oSettings.aoData[iRow]._aData

		oCol.fnSetData( oData, val )
	


	// Private variable that is used to match action syntax in the data property objec
	var __reArray = /\[.*?\]$/
	var __reFn = /\(\)$/

	/*
	 * Split string on periods, taking into account escaped period
	 * @param  {string} str String to spli
	 * @return {array} Split strin
	 *
	function _fnSplitObjNotation( str 
	
		return $.map( str.match(/(\\.|[^\.])+/g), function ( s ) 
			return s.replace('\\.', '.')
		} )
	


	/*
	 * Return a function that can be used to get data from a source object, takin
	 * into account the ability to use nested objects as a sourc
	 *  @param {string|int|function} mSource The data source for the objec
	 *  @returns {function} Data get functio
	 *  @memberof DataTable#oAp
	 *
	function _fnGetObjectDataFn( mSource 
	
		if ( $.isPlainObject( mSource ) 
		
			/* Build an object of get functions, and wrap them in a single call *
			var o = {}
			$.each( mSource, function (key, val) 
				if ( val ) 
					o[key] = _fnGetObjectDataFn( val )
				
			} )

			return function (data, type, extra) 
				return o[ o[type] !== undefined ? type : '_' ](data, type, extra)
			}
		
		else if ( mSource === null 
		
			/* Give an empty string for rendering / sorting etc *
			return function (data, type) 
				return data
			}
		
		else if ( typeof mSource === 'function' 
		
			return function (data, type, extra) 
				return mSource( data, type, extra )
			}
		
		else if ( typeof mSource === 'string' && (mSource.indexOf('.') !== -1 |
			      mSource.indexOf('[') !== -1 || mSource.indexOf('(') !== -1) 
		
			/* If there is a . in the source string then the data source is in 
			 * nested object so we loop over the data for each level to get the nex
			 * level down. On each loop we test for undefined, and if found immediatel
			 * return. This allows entire objects to be missing and sDefaultContent t
			 * be used if defined, rather than throwing an erro
			 *
			var fetchData = function (data, type, src) 
				var arrayNotation, funcNotation, out, innerSrc

				if ( src !== "" 
				
					var a = _fnSplitObjNotation( src )

					for ( var i=0, iLen=a.length ; i<iLen ; i++ 
					
						// Check if we are dealing with special notatio
						arrayNotation = a[i].match(__reArray)
						funcNotation = a[i].match(__reFn)

						if ( arrayNotation 
						
							// Array notatio
							a[i] = a[i].replace(__reArray, '')

							// Condition allows simply [] to be passed i
							if ( a[i] !== "" ) 
								data = data[ a[i] ]
							
							out = []

							// Get the remainder of the nested object to ge
							a.splice( 0, i+1 )
							innerSrc = a.join('.')

							// Traverse each entry in the array getting the properties requeste
							for ( var j=0, jLen=data.length ; j<jLen ; j++ ) 
								out.push( fetchData( data[j], type, innerSrc ) )
							

							// If a string is given in between the array notation indicators, tha
							// is used to join the strings together, otherwise an array is returne
							var join = arrayNotation[0].substring(1, arrayNotation[0].length-1)
							data = (join==="") ? out : out.join(join)

							// The inner call to fetchData has already traversed through the remainde
							// of the source requested, so we exit from the loo
							break
						
						else if ( funcNotation 
						
							// Function cal
							a[i] = a[i].replace(__reFn, '')
							data = data[ a[i] ]()
							continue
						

						if ( data === null || data[ a[i] ] === undefined 
						
							return undefined
						
						data = data[ a[i] ]
					
				

				return data
			}

			return function (data, type) 
				return fetchData( data, type, mSource )
			}
		
		els
		
			/* Array or flat object mapping *
			return function (data, type) 
				return data[mSource]
			}
		
	


	/*
	 * Return a function that can be used to set data from a source object, takin
	 * into account the ability to use nested objects as a sourc
	 *  @param {string|int|function} mSource The data source for the objec
	 *  @returns {function} Data set functio
	 *  @memberof DataTable#oAp
	 *
	function _fnSetObjectDataFn( mSource 
	
		if ( $.isPlainObject( mSource ) 
		
			/* Unlike get, only the underscore (global) option is used for fo
			 * setting data since we don't know the type here. This is why an objec
			 * option is not documented for `mData` (which is read/write), but it i
			 * for `mRender` which is read only
			 *
			return _fnSetObjectDataFn( mSource._ )
		
		else if ( mSource === null 
		
			/* Nothing to do when the data source is null *
			return function (data, val) {}
		
		else if ( typeof mSource === 'function' 
		
			return function (data, val) 
				mSource( data, 'set', val )
			}
		
		else if ( typeof mSource === 'string' && (mSource.indexOf('.') !== -1 |
			      mSource.indexOf('[') !== -1 || mSource.indexOf('(') !== -1) 
		
			/* Like the get, we need to get data from a nested object *
			var setData = function (data, val, src) 
				var a = _fnSplitObjNotation( src ), b
				var aLast = a[a.length-1]
				var arrayNotation, funcNotation, o, innerSrc

				for ( var i=0, iLen=a.length-1 ; i<iLen ; i++ 
				
					// Check if we are dealing with an array notation reques
					arrayNotation = a[i].match(__reArray)
					funcNotation = a[i].match(__reFn)

					if ( arrayNotation 
					
						a[i] = a[i].replace(__reArray, '')
						data[ a[i] ] = []

						// Get the remainder of the nested object to set so we can recurs
						b = a.slice()
						b.splice( 0, i+1 )
						innerSrc = b.join('.')

						// Traverse each entry in the array setting the properties requeste
						for ( var j=0, jLen=val.length ; j<jLen ; j++ 
						
							o = {}
							setData( o, val[j], innerSrc )
							data[ a[i] ].push( o )
						

						// The inner call to setData has already traversed through the remainde
						// of the source and has set the data, thus we can exit her
						return
					
					else if ( funcNotation 
					
						// Function cal
						a[i] = a[i].replace(__reFn, '')
						data = data[ a[i] ]( val )
					

					// If the nested object doesn't currently exist - since we ar
					// trying to set the value - create i
					if ( data[ a[i] ] === null || data[ a[i] ] === undefined 
					
						data[ a[i] ] = {}
					
					data = data[ a[i] ]
				

				// Last item in the input - i.e, the actual se
				if ( aLast.match(__reFn ) 
				
					// Function cal
					data = data[ aLast.replace(__reFn, '') ]( val )
				
				els
				
					// If array notation is used, we just want to strip it and use the property nam
					// and assign the value. If it isn't used, then we get the result we want anywa
					data[ aLast.replace(__reArray, '') ] = val
				
			}

			return function (data, val) 
				return setData( data, val, mSource )
			}
		
		els
		
			/* Array or flat object mapping *
			return function (data, val) 
				data[mSource] = val
			}
		
	


	/*
	 * Return an array with the full table dat
	 *  @param {object} oSettings dataTables settings objec
	 *  @returns array {array} aData Master data arra
	 *  @memberof DataTable#oAp
	 *
	function _fnGetDataMaster ( settings 
	
		return _pluck( settings.aoData, '_aData' )
	


	/*
	 * Nuke the tabl
	 *  @param {object} oSettings dataTables settings objec
	 *  @memberof DataTable#oAp
	 *
	function _fnClearTable( settings 
	
		settings.aoData.length = 0
		settings.aiDisplayMaster.length = 0
		settings.aiDisplay.length = 0
	


	 /*
	 * Take an array of integers (index array) and remove a target integer (value - no
	 * the key!
	 *  @param {array} a Index array to targe
	 *  @param {int} iTarget value to fin
	 *  @memberof DataTable#oAp
	 *
	function _fnDeleteIndex( a, iTarget, splice 
	
		var iTargetIndex = -1

		for ( var i=0, iLen=a.length ; i<iLen ; i++ 
		
			if ( a[i] == iTarget 
			
				iTargetIndex = i
			
			else if ( a[i] > iTarget 
			
				a[i]--
			
		

		if ( iTargetIndex != -1 && splice === undefined 
		
			a.splice( iTargetIndex, 1 )
		
	


	/*
	 * Mark cached data as invalid such that a re-read of the data will occur whe
	 * the cached data is next requested. Also update from the data source object
	 
	 * @param {object} settings DataTables settings objec
	 * @param  {int}    rowIdx   Row index to invalidat
	 * @memberof DataTable#oAp
	 
	 * @todo For the modularisation of v1.11 this will need to become a callback, s
	 *   the sort and filter methods can subscribe to it. That will require
	 *   initialisation options for sorting, which is why it is not already baked i
	 *
	function _fnInvalidateRow( settings, rowIdx, src, column 
	
		var row = settings.aoData[ rowIdx ]
		var i, ien

		// Are we reading last data from DOM or the data object
		if ( src === 'dom' || ((! src || src === 'auto') && row.src === 'dom') ) 
			// Read the data from the DO
			row._aData = _fnGetRowElements( settings, row.nTr ).data
		
		else 
			// Reading from data object, update the DO
			var cells = row.anCells

			for ( i=0, ien=cells.length ; i<ien ; i++ ) 
				cells[i].innerHTML = _fnGetCellData( settings, rowIdx, i, 'display' )
			
		

		row._aSortData = null
		row._aFilterData = null

		// Invalidate the type for a specific column (if given) or all columns sinc
		// the data might have change
		var cols = settings.aoColumns
		if ( column !== undefined ) 
			cols[ column ].sType = null
		
		else 
			for ( i=0, ien=cols.length ; i<ien ; i++ ) 
				cols[i].sType = null
			
		

		// Update DataTables special `DT_*` attributes for the ro
		_fnRowAttributes( row )
	


	/*
	 * Build a data source object from an HTML row, reading the contents of th
	 * cells that are in the row
	 
	 * @param {object} settings DataTables settings objec
	 * @param {node} TR element from which to read dat
	 * @returns {object} Object with two parameters: `data` the data read, i
	 *   document order, and `cells` and array of nodes (they can be useful to th
	 *   caller, so rather than needing a second traversal to get them, just retur
	 *   them from here)
	 * @memberof DataTable#oAp
	 *
	function _fnGetRowElements( settings, row 
	
		va
			d = []
			tds = []
			td = row.firstChild
			name, col, o, i=0, contents
			columns = settings.aoColumns

		var attr = function ( str, data, td  ) 
			if ( typeof str === 'string' ) 
				var idx = str.indexOf('@')

				if ( idx !== -1 ) 
					var src = str.substring( idx+1 )
					o[ '@'+src ] = td.getAttribute( src )
				
			
		}

		while ( td ) 
			name = td.nodeName.toUpperCase()

			if ( name == "TD" || name == "TH" ) 
				col = columns[i]
				contents = $.trim(td.innerHTML)

				if ( col && col._bAttrSrc ) 
					o = 
						display: content
					}

					attr( col.mData.sort, o, td )
					attr( col.mData.type, o, td )
					attr( col.mData.filter, o, td )

					d.push( o )
				
				else 
					d.push( contents )
				

				tds.push( td )
				i++
			

			td = td.nextSibling
		

		return 
			data: d
			cells: td
		}
	
	/*
	 * Create a new TR element (and it's TD children) for a ro
	 *  @param {object} oSettings dataTables settings objec
	 *  @param {int} iRow Row to conside
	 *  @param {node} [nTrIn] TR element to add to the table - optional. If not given
	 *    DataTables will create a row automaticall
	 *  @param {array} [anTds] Array of TD|TH elements for the row - must be give
	 *    if nTr is
	 *  @memberof DataTable#oAp
	 *
	function _fnCreateTr ( oSettings, iRow, nTrIn, anTds 
	
		va
			row = oSettings.aoData[iRow]
			rowData = row._aData
			cells = []
			nTr, nTd, oCol
			i, iLen

		if ( row.nTr === null 
		
			nTr = nTrIn || document.createElement('tr')

			row.nTr = nTr
			row.anCells = cells

			/* Use a private property on the node to allow reserve mapping from the nod
			 * to the aoData array for fast look u
			 *
			nTr._DT_RowIndex = iRow

			/* Special parameters can be given by the data source to be used on the row *
			_fnRowAttributes( row )

			/* Process each column *
			for ( i=0, iLen=oSettings.aoColumns.length ; i<iLen ; i++ 
			
				oCol = oSettings.aoColumns[i]

				nTd = nTrIn ? anTds[i] : document.createElement( oCol.sCellType )
				cells.push( nTd )

				// Need to create the HTML if new, or if a rendering function is define
				if ( !nTrIn || oCol.mRender || oCol.mData !== i 
				
					nTd.innerHTML = _fnGetCellData( oSettings, iRow, i, 'display' )
				

				/* Add user defined class *
				if ( oCol.sClass !== null 
				
					nTd.className += ' '+oCol.sClass
				

				// Visibility - add or remove as require
				if ( oCol.bVisible && ! nTrIn 
				
					nTr.appendChild( nTd )
				
				else if ( ! oCol.bVisible && nTrIn 
				
					nTd.parentNode.removeChild( nTd )
				

				if ( oCol.fnCreatedCell 
				
					oCol.fnCreatedCell.call( oSettings.oInstance
						nTd, _fnGetCellData( oSettings, iRow, i, 'display' ), rowData, iRow, 
					)
				
			

			_fnCallbackFire( oSettings, 'aoRowCreatedCallback', null, [nTr, rowData, iRow] )
		
	


	/*
	 * Add attributes to a row based on the special `DT_*` parameters in a dat
	 * source object
	 *  @param {object} DataTables row object for the row to be modifie
	 *  @memberof DataTable#oAp
	 *
	function _fnRowAttributes( row 
	
		var tr = row.nTr
		var data = row._aData

		if ( tr ) 
			if ( data.DT_RowId ) 
				tr.id = data.DT_RowId
			

			if ( data.DT_RowClass ) 
				// Remove any classes added by DT_RowClass befor
				var a = data.DT_RowClass.split(' ')
				row.__rowc = row.__rowc 
					_unique( row.__rowc.concat( a ) ) 
					a

				$(tr
					.removeClass( row.__rowc.join(' ') 
					.addClass( data.DT_RowClass )
			

			if ( data.DT_RowData ) 
				$(tr).data( data.DT_RowData )
			
		
	


	/*
	 * Create the HTML header for the tabl
	 *  @param {object} oSettings dataTables settings objec
	 *  @memberof DataTable#oAp
	 *
	function _fnBuildHead( oSettings 
	
		var i, ien, cell, row, column
		var thead = oSettings.nTHead
		var tfoot = oSettings.nTFoot
		var createHeader = $('th, td', thead).length === 0
		var classes = oSettings.oClasses
		var columns = oSettings.aoColumns

		if ( createHeader ) 
			row = $('<tr/>').appendTo( thead )
		

		for ( i=0, ien=columns.length ; i<ien ; i++ ) 
			column = columns[i]
			cell = $( column.nTh ).addClass( column.sClass )

			if ( createHeader ) 
				cell.appendTo( row )
			

			// 1.11 move into sortin
			if ( oSettings.oFeatures.bSort ) 
				cell.addClass( column.sSortingClass )

				if ( column.bSortable !== false ) 
					cel
						.attr( 'tabindex', oSettings.iTabIndex 
						.attr( 'aria-controls', oSettings.sTableId )

					_fnSortAttachListener( oSettings, column.nTh, i )
				
			

			if ( column.sTitle != cell.html() ) 
				cell.html( column.sTitle )
			

			_fnRenderer( oSettings, 'header' )
				oSettings, cell, column, i, classe
			)
		

		if ( createHeader ) 
			_fnDetectHeader( oSettings.aoHeader, thead )
		

		/* ARIA role for the rows *
		$(thead).find('>tr').attr('role', 'row')

		/* Deal with the footer - add classes if required *
		$(thead).find('>tr>th, >tr>td').addClass( classes.sHeaderTH )
		$(tfoot).find('>tr>th, >tr>td').addClass( classes.sFooterTH )

		// Cache the footer cells. Note that we only take the cells from the firs
		// row in the footer. If there is more than one row the user wants t
		// interact with, they need to use the table().foot() method. Note also thi
		// allows cells to be used for multiple columns using colspa
		if ( tfoot !== null ) 
			var cells = oSettings.aoFooter[0]

			for ( i=0, ien=cells.length ; i<ien ; i++ ) 
				column = columns[i]
				column.nTf = cells[i].cell

				if ( column.sClass ) 
					$(column.nTf).addClass( column.sClass )
				
			
		
	


	/*
	 * Draw the header (or footer) element based on the column visibility states. Th
	 * methodology here is to use the layout array from _fnDetectHeader, modified fo
	 * the instantaneous column visibility, to construct the new layout. The grid i
	 * traversed over cell at a time in a rows x columns grid fashion, although eac
	 * cell insert can cover multiple elements in the grid - which is tracks using th
	 * aApplied array. Cell inserts in the grid will only occur where there isn'
	 * already a cell in that position
	 *  @param {object} oSettings dataTables settings objec
	 *  @param array {objects} aoSource Layout array from _fnDetectHeade
	 *  @param {boolean} [bIncludeHidden=false] If true then include the hidden columns in the calc
	 *  @memberof DataTable#oAp
	 *
	function _fnDrawHead( oSettings, aoSource, bIncludeHidden 
	
		var i, iLen, j, jLen, k, kLen, n, nLocalTr
		var aoLocal = []
		var aApplied = []
		var iColumns = oSettings.aoColumns.length
		var iRowspan, iColspan

		if ( ! aoSource 
		
			return
		

		if (  bIncludeHidden === undefined 
		
			bIncludeHidden = false
		

		/* Make a copy of the master layout array, but without the visible columns in it *
		for ( i=0, iLen=aoSource.length ; i<iLen ; i++ 
		
			aoLocal[i] = aoSource[i].slice()
			aoLocal[i].nTr = aoSource[i].nTr

			/* Remove any columns which are currently hidden *
			for ( j=iColumns-1 ; j>=0 ; j-- 
			
				if ( !oSettings.aoColumns[j].bVisible && !bIncludeHidden 
				
					aoLocal[i].splice( j, 1 )
				
			

			/* Prep the applied array - it needs an element for each row *
			aApplied.push( [] )
		

		for ( i=0, iLen=aoLocal.length ; i<iLen ; i++ 
		
			nLocalTr = aoLocal[i].nTr

			/* All cells are going to be replaced, so empty out the row *
			if ( nLocalTr 
			
				while( (n = nLocalTr.firstChild) 
				
					nLocalTr.removeChild( n )
				
			

			for ( j=0, jLen=aoLocal[i].length ; j<jLen ; j++ 
			
				iRowspan = 1
				iColspan = 1

				/* Check to see if there is already a cell (row/colspan) covering our targe
				 * insert point. If there is, then there is nothing to do
				 *
				if ( aApplied[i][j] === undefined 
				
					nLocalTr.appendChild( aoLocal[i][j].cell )
					aApplied[i][j] = 1

					/* Expand the cell to cover as many rows as needed *
					while ( aoLocal[i+iRowspan] !== undefined &
					        aoLocal[i][j].cell == aoLocal[i+iRowspan][j].cell 
					
						aApplied[i+iRowspan][j] = 1
						iRowspan++
					

					/* Expand the cell to cover as many columns as needed *
					while ( aoLocal[i][j+iColspan] !== undefined &
					        aoLocal[i][j].cell == aoLocal[i][j+iColspan].cell 
					
						/* Must update the applied array over the rows for the columns *
						for ( k=0 ; k<iRowspan ; k++ 
						
							aApplied[i+k][j+iColspan] = 1
						
						iColspan++
					

					/* Do the actual expansion in the DOM *
					$(aoLocal[i][j].cell
						.attr('rowspan', iRowspan
						.attr('colspan', iColspan)
				
			
		
	


	/*
	 * Insert the required TR nodes into the table for displa
	 *  @param {object} oSettings dataTables settings objec
	 *  @memberof DataTable#oAp
	 *
	function _fnDraw( oSettings 
	
		/* Provide a pre-callback function which can be used to cancel the draw is false is returned *
		var aPreDraw = _fnCallbackFire( oSettings, 'aoPreDrawCallback', 'preDraw', [oSettings] )
		if ( $.inArray( false, aPreDraw ) !== -1 
		
			_fnProcessingDisplay( oSettings, false )
			return
		

		var i, iLen, n
		var anRows = []
		var iRowCount = 0
		var asStripeClasses = oSettings.asStripeClasses
		var iStripes = asStripeClasses.length
		var iOpenRows = oSettings.aoOpenRows.length
		var oLang = oSettings.oLanguage
		var iInitDisplayStart = oSettings.iInitDisplayStart
		var bServerSide = _fnDataSource( oSettings ) == 'ssp'
		var aiDisplay = oSettings.aiDisplay

		oSettings.bDrawing = true

		/* Check and see if we have an initial draw position from state saving *
		if ( iInitDisplayStart !== undefined && iInitDisplayStart !== -1 
		
			oSettings._iDisplayStart = bServerSide 
				iInitDisplayStart 
				iInitDisplayStart >= oSettings.fnRecordsDisplay() 
					0 
					iInitDisplayStart

			oSettings.iInitDisplayStart = -1
		

		var iDisplayStart = oSettings._iDisplayStart
		var iDisplayEnd = oSettings.fnDisplayEnd()

		/* Server-side processing draw intercept *
		if ( oSettings.bDeferLoading 
		
			oSettings.bDeferLoading = false
			oSettings.iDraw++
			_fnProcessingDisplay( oSettings, false )
		
		else if ( !bServerSide 
		
			oSettings.iDraw++
		
		else if ( !oSettings.bDestroying && !_fnAjaxUpdate( oSettings ) 
		
			return
		

		if ( aiDisplay.length !== 0 
		
			var iStart = bServerSide ? 0 : iDisplayStart
			var iEnd = bServerSide ? oSettings.aoData.length : iDisplayEnd

			for ( var j=iStart ; j<iEnd ; j++ 
			
				var iDataIndex = aiDisplay[j]
				var aoData = oSettings.aoData[ iDataIndex ]
				if ( aoData.nTr === null 
				
					_fnCreateTr( oSettings, iDataIndex )
				

				var nRow = aoData.nTr

				/* Remove the old striping classes and then add the new one *
				if ( iStripes !== 0 
				
					var sStripe = asStripeClasses[ iRowCount % iStripes ]
					if ( aoData._sRowStripe != sStripe 
					
						$(nRow).removeClass( aoData._sRowStripe ).addClass( sStripe )
						aoData._sRowStripe = sStripe
					
				

				/* Row callback functions - might want to manipulate the row *
				_fnCallbackFire( oSettings, 'aoRowCallback', null
					[nRow, aoData._aData, iRowCount, j] )

				anRows.push( nRow )
				iRowCount++
			
		
		els
		
			/* Table is empty - create a row with an empty message in it *
			var sZero = oLang.sZeroRecords
			if ( oSettings.iDraw == 1 &&  _fnDataSource( oSettings ) == 'ajax' 
			
				sZero = oLang.sLoadingRecords
			
			else if ( oLang.sEmptyTable && oSettings.fnRecordsTotal() === 0 
			
				sZero = oLang.sEmptyTable
			

			anRows[ 0 ] = $( '<tr/>', { 'class': iStripes ? asStripeClasses[0] : '' } 
				.append( $('<td />', 
					'valign':  'top'
					'colSpan': _fnVisbleColumns( oSettings )
					'class':   oSettings.oClasses.sRowEmpt
				} ).html( sZero ) )[0]
		

		/* Header and footer callbacks *
		_fnCallbackFire( oSettings, 'aoHeaderCallback', 'header', [ $(oSettings.nTHead).children('tr')[0]
			_fnGetDataMaster( oSettings ), iDisplayStart, iDisplayEnd, aiDisplay ] )

		_fnCallbackFire( oSettings, 'aoFooterCallback', 'footer', [ $(oSettings.nTFoot).children('tr')[0]
			_fnGetDataMaster( oSettings ), iDisplayStart, iDisplayEnd, aiDisplay ] )

		var body = $(oSettings.nTBody)

		body.children().detach()
		body.append( $(anRows) )

		/* Call all required callback functions for the end of a draw *
		_fnCallbackFire( oSettings, 'aoDrawCallback', 'draw', [oSettings] )

		/* Draw is complete, sorting and filtering must be as well *
		oSettings.bSorted = false
		oSettings.bFiltered = false
		oSettings.bDrawing = false
	


	/*
	 * Redraw the table - taking account of the various features which are enable
	 *  @param {object} oSettings dataTables settings objec
	 *  @param {boolean} [holdPosition] Keep the current paging position. By defaul
	 *    the paging is reset to the first pag
	 *  @memberof DataTable#oAp
	 *
	function _fnReDraw( settings, holdPosition 
	
		va
			features = settings.oFeatures
			sort     = features.bSort
			filter   = features.bFilter

		if ( sort ) 
			_fnSort( settings )
		

		if ( filter ) 
			_fnFilterComplete( settings, settings.oPreviousSearch )
		
		else 
			// No filtering, so we want to just use the display maste
			settings.aiDisplay = settings.aiDisplayMaster.slice()
		

		if ( holdPosition !== true ) 
			settings._iDisplayStart = 0
		

		_fnDraw( settings )
	


	/*
	 * Add the options to the page HTML for the tabl
	 *  @param {object} oSettings dataTables settings objec
	 *  @memberof DataTable#oAp
	 *
	function _fnAddOptionsHtml ( oSettings 
	
		/
		 * Create a temporary, empty, div which we can later on replace with what we have generate
		 * we do it this way to rendering the 'options' html offline - speed :-
		 *
		var nHolding = $('<div></div>')[0]
		oSettings.nTable.parentNode.insertBefore( nHolding, oSettings.nTable )

		/
		 * All DataTables are wrapped in a di
		 *
		oSettings.nTableWrapper = $('<div id="'+oSettings.sTableId+'_wrapper" class="'+oSettings.oClasses.sWrapper+'" role="grid"></div>')[0]
		oSettings.nTableReinsertBefore = oSettings.nTable.nextSibling

		/* Track where we want to insert the option *
		var nInsertNode = oSettings.nTableWrapper

		/* Loop over the user set positioning and place the elements as needed *
		var aDom = oSettings.sDom.split('')
		var nTmp, iPushFeature, cOption, nNewNode, cNext, sAttr, j
		for ( var i=0 ; i<aDom.length ; i++ 
		
			iPushFeature = 0
			cOption = aDom[i]

			if ( cOption == '<' 
			
				/* New container div *
				nNewNode = $('<div></div>')[0]

				/* Check to see if we should append an id and/or a class name to the container *
				cNext = aDom[i+1]
				if ( cNext == "'" || cNext == '"' 
				
					sAttr = ""
					j = 2
					while ( aDom[i+j] != cNext 
					
						sAttr += aDom[i+j]
						j++
					

					/* Replace jQuery UI constants @todo depreciated *
					if ( sAttr == "H" 
					
						sAttr = oSettings.oClasses.sJUIHeader
					
					else if ( sAttr == "F" 
					
						sAttr = oSettings.oClasses.sJUIFooter
					

					/* The attribute can be in the format of "#id.class", "#id" or "class" This logi
					 * breaks the string into parts and applies them as neede
					 *
					if ( sAttr.indexOf('.') != -1 
					
						var aSplit = sAttr.split('.')
						nNewNode.id = aSplit[0].substr(1, aSplit[0].length-1)
						nNewNode.className = aSplit[1]
					
					else if ( sAttr.charAt(0) == "#" 
					
						nNewNode.id = sAttr.substr(1, sAttr.length-1)
					
					els
					
						nNewNode.className = sAttr
					

					i += j; /* Move along the position array *
				

				nInsertNode.appendChild( nNewNode )
				nInsertNode = nNewNode
			
			else if ( cOption == '>' 
			
				/* End container div *
				nInsertNode = nInsertNode.parentNode
			
			// @todo Move options into their own plugins
			else if ( cOption == 'l' && oSettings.oFeatures.bPaginate && oSettings.oFeatures.bLengthChange 
			
				/* Length *
				nTmp = _fnFeatureHtmlLength( oSettings )
				iPushFeature = 1
			
			else if ( cOption == 'f' && oSettings.oFeatures.bFilter 
			
				/* Filter *
				nTmp = _fnFeatureHtmlFilter( oSettings )
				iPushFeature = 1
			
			else if ( cOption == 'r' && oSettings.oFeatures.bProcessing 
			
				/* pRocessing *
				nTmp = _fnFeatureHtmlProcessing( oSettings )
				iPushFeature = 1
			
			else if ( cOption == 't' 
			
				/* Table *
				nTmp = _fnFeatureHtmlTable( oSettings )
				iPushFeature = 1
			
			else if ( cOption ==  'i' && oSettings.oFeatures.bInfo 
			
				/* Info *
				nTmp = _fnFeatureHtmlInfo( oSettings )
				iPushFeature = 1
			
			else if ( cOption == 'p' && oSettings.oFeatures.bPaginate 
			
				/* Pagination *
				nTmp = _fnFeatureHtmlPaginate( oSettings )
				iPushFeature = 1
			
			else if ( DataTable.ext.feature.length !== 0 
			
				/* Plug-in features *
				var aoFeatures = DataTable.ext.feature
				for ( var k=0, kLen=aoFeatures.length ; k<kLen ; k++ 
				
					if ( cOption == aoFeatures[k].cFeature 
					
						nTmp = aoFeatures[k].fnInit( oSettings )
						if ( nTmp 
						
							iPushFeature = 1
						
						break
					
				
			

			/* Add to the 2D features array *
			if ( iPushFeature == 1 && nTmp !== null 
			
				if ( typeof oSettings.aanFeatures[cOption] !== 'object' 
				
					oSettings.aanFeatures[cOption] = []
				
				oSettings.aanFeatures[cOption].push( nTmp )
				nInsertNode.appendChild( nTmp )
			
		

		/* Built our DOM structure - replace the holding div with what we want *
		nHolding.parentNode.replaceChild( oSettings.nTableWrapper, nHolding )
	


	/*
	 * Use the DOM source to create up an array of header cells. The idea here is t
	 * create a layout grid (array) of rows x columns, which contains a referenc
	 * to the cell that that point in the grid (regardless of col/rowspan), such tha
	 * any column / row could be removed and the new grid constructe
	 *  @param array {object} aLayout Array to store the calculated layout i
	 *  @param {node} nThead The header/footer element for the tabl
	 *  @memberof DataTable#oAp
	 *
	function _fnDetectHeader ( aLayout, nThead 
	
		var nTrs = $(nThead).children('tr')
		var nTr, nCell
		var i, k, l, iLen, jLen, iColShifted, iColumn, iColspan, iRowspan
		var bUnique
		var fnShiftCol = function ( a, i, j ) 
			var k = a[i]
	                while ( k[j] ) 
				j++
			
			return j
		}

		aLayout.splice( 0, aLayout.length )

		/* We know how many rows there are in the layout - so prep it *
		for ( i=0, iLen=nTrs.length ; i<iLen ; i++ 
		
			aLayout.push( [] )
		

		/* Calculate a layout array *
		for ( i=0, iLen=nTrs.length ; i<iLen ; i++ 
		
			nTr = nTrs[i]
			iColumn = 0

			/* For every cell in the row... *
			nCell = nTr.firstChild
			while ( nCell ) 
				if ( nCell.nodeName.toUpperCase() == "TD" |
				     nCell.nodeName.toUpperCase() == "TH" 
				
					/* Get the col and rowspan attributes from the DOM and sanitise them *
					iColspan = nCell.getAttribute('colspan') * 1
					iRowspan = nCell.getAttribute('rowspan') * 1
					iColspan = (!iColspan || iColspan===0 || iColspan===1) ? 1 : iColspan
					iRowspan = (!iRowspan || iRowspan===0 || iRowspan===1) ? 1 : iRowspan

					/* There might be colspan cells already in this row, so shift our targe
					 * accordingl
					 *
					iColShifted = fnShiftCol( aLayout, i, iColumn )

					/* Cache calculation for unique columns *
					bUnique = iColspan === 1 ? true : false

					/* If there is col / rowspan, copy the information into the layout grid *
					for ( l=0 ; l<iColspan ; l++ 
					
						for ( k=0 ; k<iRowspan ; k++ 
						
							aLayout[i+k][iColShifted+l] = 
								"cell": nCell
								"unique": bUniqu
							}
							aLayout[i+k].nTr = nTr
						
					
				
				nCell = nCell.nextSibling
			
		
	


	/*
	 * Get an array of unique th elements, one for each colum
	 *  @param {object} oSettings dataTables settings objec
	 *  @param {node} nHeader automatically detect the layout from this node - optiona
	 *  @param {array} aLayout thead/tfoot layout from _fnDetectHeader - optiona
	 *  @returns array {node} aReturn list of unique th'
	 *  @memberof DataTable#oAp
	 *
	function _fnGetUniqueThs ( oSettings, nHeader, aLayout 
	
		var aReturn = []
		if ( !aLayout 
		
			aLayout = oSettings.aoHeader
			if ( nHeader 
			
				aLayout = []
				_fnDetectHeader( aLayout, nHeader )
			
		

		for ( var i=0, iLen=aLayout.length ; i<iLen ; i++ 
		
			for ( var j=0, jLen=aLayout[i].length ; j<jLen ; j++ 
			
				if ( aLayout[i][j].unique &
					 (!aReturn[j] || !oSettings.bSortCellsTop) 
				
					aReturn[j] = aLayout[i][j].cell
				
			
		

		return aReturn
	



	/*
	 * Create an Ajax call based on the table's settings, taking into account tha
	 * parameters can have multiple forms, and backwards compatibility
	 
	 * @param {object} oSettings dataTables settings objec
	 * @param {array} data Data to send to the server, required b
	 *     DataTables - may be augmented by developer callback
	 * @param {function} fn Callback function to run when data is obtaine
	 *
	function _fnBuildAjax( oSettings, data, fn 
	
		// Compatibility with 1.9-, allow fnServerData and event to manipulat
		_fnCallbackFire( oSettings, 'aoServerParams', 'serverParams', [data] )

		// Convert to object based for 1.10+ if using the old schem
		if ( data && data.__legacy ) 
			var tmp = {}
			var rbracket = /(.*?)\[\]$/

			$.each( data, function (key, val) 
				var match = val.name.match(rbracket)

				if ( match ) 
					// Support for array
					var name = match[0]

					if ( ! tmp[ name ] ) 
						tmp[ name ] = []
					
					tmp[ name ].push( val.value )
				
				else 
					tmp[val.name] = val.value
				
			} )
			data = tmp
		

		var ajaxData
		var ajax = oSettings.ajax
		var instance = oSettings.oInstance

		if ( $.isPlainObject( ajax ) && ajax.data 
		
			ajaxData = ajax.data

			var newData = $.isFunction( ajaxData ) 
				ajaxData( data ) :  // fn can manipulate data or return an objec
				ajaxData;           // object or array to merg

			// If the function returned an object, use that alon
			data = $.isFunction( ajaxData ) && newData 
				newData 
				$.extend( true, data, newData )

			// Remove the data property as we've resolved it already and don't wan
			// jQuery to do it again (it is restored at the end of the function
			delete ajax.data
		

		var baseAjax = 
			"data": data
			"success": function (json) 
				var error = json.error || json.sError
				if ( error ) 
					oSettings.oApi._fnLog( oSettings, 0, error )
				

				oSettings.json = json
				_fnCallbackFire( oSettings, null, 'xhr', [oSettings, json] )
				fn( json )
			}
			"dataType": "json"
			"cache": false
			"type": oSettings.sServerMethod
			"error": function (xhr, error, thrown) 
				var log = oSettings.oApi._fnLog

				if ( error == "parsererror" ) 
					log( oSettings, 0, 'Invalid JSON response', 1 )
				
				else 
					log( oSettings, 0, 'Ajax error', 7 )
				
			
		}

		if ( oSettings.fnServerData 
		
			// DataTables 1.9- compatibilit
			oSettings.fnServerData.call( instance
				oSettings.sAjaxSource, data, fn, oSetting
			)
		
		else if ( oSettings.sAjaxSource || typeof ajax === 'string' 
		
			// DataTables 1.9- compatibilit
			oSettings.jqXHR = $.ajax( $.extend( baseAjax, 
				url: ajax || oSettings.sAjaxSourc
			} ) )
		
		else if ( $.isFunction( ajax ) 
		
			// Is a function - let the caller define what needs to be don
			oSettings.jqXHR = ajax.call( instance, data, fn, oSettings )
		
		els
		
			// Object to extend the base setting
			oSettings.jqXHR = $.ajax( $.extend( baseAjax, ajax ) )

			// Restore for next time aroun
			ajax.data = ajaxData
		
	


	/*
	 * Update the table using an Ajax cal
	 *  @param {object} oSettings dataTables settings objec
	 *  @returns {boolean} Block the table drawing or no
	 *  @memberof DataTable#oAp
	 *
	function _fnAjaxUpdate( oSettings 
	
		if ( oSettings.bAjaxDataGet 
		
			oSettings.iDraw++
			_fnProcessingDisplay( oSettings, true )
			var iColumns = oSettings.aoColumns.length
			var aoData = _fnAjaxParameters( oSettings )

			_fnBuildAjax( oSettings, aoData, function(json) 
				_fnAjaxUpdateDraw( oSettings, json )
			}, oSettings )

			return false
		
		return true
	


	/*
	 * Build up the parameters in an object needed for a server-side processin
	 * request. Note that this is basically done twice, is different ways - a moder
	 * method which is used by default in DataTables 1.10 which uses objects an
	 * arrays, or the 1.9- method with is name / value pairs. 1.9 method is used i
	 * the sAjaxSource option is used in the initialisation, or the legacyAja
	 * option is set
	 *  @param {object} oSettings dataTables settings objec
	 *  @returns {bool} block the table drawing or no
	 *  @memberof DataTable#oAp
	 *
	function _fnAjaxParameters( settings 
	
		va
			columns = settings.aoColumns
			columnCount = columns.length
			features = settings.oFeatures
			preSearch = settings.oPreviousSearch
			preColSearch = settings.aoPreSearchCols
			i, data = [], dataProp, column, columnSearch
			sort = _fnSortFlatten( settings )
			displayStart = settings._iDisplayStart
			displayLength = features.bPaginate !== false 
				settings._iDisplayLength 
				-1

		var param = function ( name, value ) 
			data.push( { 'name': name, 'value': value } )
		}

		// DataTables 1.9- compatible metho
		param( 'sEcho',          settings.iDraw )
		param( 'iColumns',       columnCount )
		param( 'sColumns',       _pluck( columns, 'sName' ).join(',') )
		param( 'iDisplayStart',  displayStart )
		param( 'iDisplayLength', displayLength )

		// DataTables 1.10+ metho
		var d = 
			draw:    settings.iDraw
			columns: []
			order:   []
			start:   displayStart
			length:  displayLength
			search:  
				value: preSearch.sSearch
				regex: preSearch.bRege
			
		}

		for ( i=0 ; i<columnCount ; i++ ) 
			column = columns[i]
			columnSearch = preColSearch[i]
			dataProp = typeof column.mData=="function" ? 'function' : column.mData 

			d.columns.push( 
				data:       dataProp
				name:       column.sName
				searchable: column.bSearchable
				orderable:  column.bSortable
				search:     
					value: columnSearch.sSearch
					regex: columnSearch.bRege
				
			} )

			param( "mDataProp_"+i, dataProp )

			if ( features.bFilter ) 
				param( 'sSearch_'+i,     columnSearch.sSearch )
				param( 'bRegex_'+i,      columnSearch.bRegex )
				param( 'bSearchable_'+i, column.bSearchable )
			

			if ( features.bSort ) 
				param( 'bSortable_'+i, column.bSortable )
			
		

		$.each( sort, function ( i, val ) 
			d.order.push( { column: val.col, dir: val.dir } )

			param( 'iSortCol_'+i, val.col )
			param( 'sSortDir_'+i, val.dir )
		} )

		if ( features.bFilter ) 
			param( 'sSearch', preSearch.sSearch )
			param( 'bRegex', preSearch.bRegex )
		

		if ( features.bSort ) 
			param( 'iSortingCols', sort.length )
		

		data.__legacy = true
		return settings.sAjaxSource || DataTable.ext.legacy.ajax 
			data : d
	


	/*
	 * Data the data from the server (nuking the old) and redraw the tabl
	 *  @param {object} oSettings dataTables settings objec
	 *  @param {object} json json data return from the server
	 *  @param {string} json.sEcho Tracking flag for DataTables to match request
	 *  @param {int} json.iTotalRecords Number of records in the data set, not accounting for filterin
	 *  @param {int} json.iTotalDisplayRecords Number of records in the data set, accounting for filterin
	 *  @param {array} json.aaData The data to display on this pag
	 *  @param {string} [json.sColumns] Column ordering (sName, comma separated
	 *  @memberof DataTable#oAp
	 *
	function _fnAjaxUpdateDraw ( settings, json 
	
		// v1.10 uses camelCase variables, while 1.9 uses Hungarian notation
		// Support bot
		var compat = function ( old, modern ) 
			return json[old] !== undefined ? json[old] : json[modern]
		}

		var draw            = compat( 'sEcho',                'draw' )
		var recordsTotal    = compat( 'iTotalRecords',        'recordsTotal' )
		var rocordsFiltered = compat( 'iTotalDisplayRecords', 'recordsFiltered' )

		if ( draw ) 
			// Protect against out of sequence return
			if ( draw*1 < settings.iDraw ) 
				return
			
			settings.iDraw = draw * 1
		

		_fnClearTable( settings )
		settings._iRecordsTotal   = parseInt(recordsTotal, 10)
		settings._iRecordsDisplay = parseInt(rocordsFiltered, 10)

		var data = _fnAjaxDataSrc( settings, json )
		for ( var i=0, ien=data.length ; i<ien ; i++ ) 
			_fnAddData( settings, data[i] )
		
		settings.aiDisplay = settings.aiDisplayMaster.slice()

		settings.bAjaxDataGet = false
		_fnDraw( settings )

		if ( ! settings._bInitComplete ) 
			_fnInitComplete( settings, json )
		

		settings.bAjaxDataGet = true
		_fnProcessingDisplay( settings, false )
	


	/*
	 * Get the data from the JSON data source to use for drawing a table. Usin
	 * `_fnGetObjectDataFn` allows the data to be sourced from a property of th
	 * source object, or from a processing function
	 *  @param {object} oSettings dataTables settings objec
	 *  @param  {object} json Data source object / array from the serve
	 *  @return {array} Array of data to us
	 *
	function _fnAjaxDataSrc ( oSettings, json 
	
		var dataSrc = $.isPlainObject( oSettings.ajax ) && oSettings.ajax.dataSrc !== undefined 
			oSettings.ajax.dataSrc 
			oSettings.sAjaxDataProp; // Compatibility with 1.9-

		// Compatibility with 1.9-. In order to read from aaData, check if th
		// default has been changed, if not, check for aaDat
		if ( dataSrc === 'data' ) 
			return json.aaData || json[dataSrc]
		

		return dataSrc !== "" 
			_fnGetObjectDataFn( dataSrc )( json ) 
			json
	


	/*
	 * Generate the node required for filtering tex
	 *  @returns {node} Filter control elemen
	 *  @param {object} oSettings dataTables settings objec
	 *  @memberof DataTable#oAp
	 *
	function _fnFeatureHtmlFilter ( settings 
	
		var classes = settings.oClasses
		var tableId = settings.sTableId
		var previousSearch = settings.oPreviousSearch
		var features = settings.aanFeatures
		var input = '<input type="search" class="'+classes.sFilterInput+'"/>'

		var str = settings.oLanguage.sSearch
		str = str.match(/_INPUT_/) 
			str.replace('_INPUT_', input) 
			str+input

		var filter = $('<div/>', 
				'id': ! features.f ? tableId+'_filter' : null
				'class': classes.sFilte
			} 
			.append( $('<label/>' ).append( str ) )

		var jqFilter = $('input[type="search"]', filter
			.val( previousSearch.sSearch.replace('"','&quot;') 
			.bind( 'keyup.DT search.DT input.DT paste.DT cut.DT', function(e) 
				/* Update all other filter input elements for the new display *
				var n = features.f
				var val = !this.value ? "" : this.value; // mental IE8 fix :-

				/* Now do the filter *
				if ( val != previousSearch.sSearch ) 
					_fnFilterComplete( settings, 
						"sSearch": val
						"bRegex": previousSearch.bRegex
						"bSmart": previousSearch.bSmart 
						"bCaseInsensitive": previousSearch.bCaseInsensitiv
					} )

					// Need to redraw, without resortin
					settings._iDisplayStart = 0
					_fnDraw( settings )
				
			} 
			.bind( 'keypress.DT', function(e) 
				/* Prevent form submission *
				if ( e.keyCode == 13 ) 
					return false
				
			} 
			.attr('aria-controls', tableId)

		// Update the input elements whenever the table is filtere
		$(settings.nTable).on( 'filter.DT', function () 
			// IE9 throws an 'unknown error' if document.activeElement is use
			// inside an iframe or frame..
			try 
				if ( jqFilter[0] !== document.activeElement ) 
					jqFilter.val( previousSearch.sSearch )
				
			
			catch ( e ) {
		} )

		return filter[0]
	


	/*
	 * Filter the table using both the global filter and column based filterin
	 *  @param {object} oSettings dataTables settings objec
	 *  @param {object} oSearch search informatio
	 *  @param {int} [iForce] force a research of the master array (1) or not (undefined or 0
	 *  @memberof DataTable#oAp
	 *
	function _fnFilterComplete ( oSettings, oInput, iForce 
	
		var oPrevSearch = oSettings.oPreviousSearch
		var aoPrevSearch = oSettings.aoPreSearchCols
		var fnSaveFilter = function ( oFilter ) 
			/* Save the filtering values *
			oPrevSearch.sSearch = oFilter.sSearch
			oPrevSearch.bRegex = oFilter.bRegex
			oPrevSearch.bSmart = oFilter.bSmart
			oPrevSearch.bCaseInsensitive = oFilter.bCaseInsensitive
		}

		// Resolve any column types that are unknown due to addition or invalidatio
		// @todo As per sort - can this be moved into an event handler
		_fnColumnTypes( oSettings )

		/* In server-side processing all filtering is done by the server, so no point hanging around here *
		if ( _fnDataSource( oSettings ) != 'ssp' 
		
			/* Global filter *
			_fnFilter( oSettings, oInput.sSearch, iForce, oInput.bRegex, oInput.bSmart, oInput.bCaseInsensitive )
			fnSaveFilter( oInput )

			/* Now do the individual column filter *
			for ( var i=0 ; i<aoPrevSearch.length ; i++ 
			
				_fnFilterColumn( oSettings, aoPrevSearch[i].sSearch, i, aoPrevSearch[i].bRegex
					aoPrevSearch[i].bSmart, aoPrevSearch[i].bCaseInsensitive )
			

			/* Custom filtering *
			_fnFilterCustom( oSettings )
		
		els
		
			fnSaveFilter( oInput )
		

		/* Tell the draw function we have been filtering *
		oSettings.bFiltered = true
		_fnCallbackFire( oSettings, null, 'search', [oSettings] )
	


	/*
	 * Apply custom filtering function
	 *  @param {object} oSettings dataTables settings objec
	 *  @memberof DataTable#oAp
	 *
	function _fnFilterCustom( oSettings 
	
		var afnFilters = DataTable.ext.search
		var aiFilterColumns = _fnGetColumns( oSettings, 'bSearchable' )

		for ( var i=0, iLen=afnFilters.length ; i<iLen ; i++ 
		
			var iCorrector = 0
			for ( var j=0, jLen=oSettings.aiDisplay.length ; j<jLen ; j++ 
			
				var iDisIndex = oSettings.aiDisplay[j-iCorrector]
				var bTest = afnFilters[i]
					oSettings
					_fnGetRowData( oSettings, iDisIndex, 'filter', aiFilterColumns )
					iDisInde
				)

				/* Check if we should use this row based on the filtering function *
				if ( !bTest 
				
					oSettings.aiDisplay.splice( j-iCorrector, 1 )
					iCorrector++
				
			
		
	


	/*
	 * Filter the table on a per-column basi
	 *  @param {object} oSettings dataTables settings objec
	 *  @param {string} sInput string to filter o
	 *  @param {int} iColumn column to filte
	 *  @param {bool} bRegex treat search string as a regular expression or no
	 *  @param {bool} bSmart use smart filtering or no
	 *  @param {bool} bCaseInsensitive Do case insenstive matching or no
	 *  @memberof DataTable#oAp
	 *
	function _fnFilterColumn ( settings, searchStr, colIdx, regex, smart, caseInsensitive 
	
		if ( searchStr === '' ) 
			return
		

		var data
		var display = settings.aiDisplay
		var rpSearch = _fnFilterCreateSearch( searchStr, regex, smart, caseInsensitive )

		for ( var i=display.length-1 ; i>=0 ; i-- ) 
			data = settings.aoData[ display[i] ]._aFilterData[ colIdx ]

			if ( ! rpSearch.test( data ) ) 
				display.splice( i, 1 )
			
		
	


	/*
	 * Filter the data table based on user input and draw the tabl
	 *  @param {object} settings dataTables settings objec
	 *  @param {string} input string to filter o
	 *  @param {int} force optional - force a research of the master array (1) or not (undefined or 0
	 *  @param {bool} regex treat as a regular expression or no
	 *  @param {bool} smart perform smart filtering or no
	 *  @param {bool} caseInsensitive Do case insenstive matching or no
	 *  @memberof DataTable#oAp
	 *
	function _fnFilter( settings, input, force, regex, smart, caseInsensitive 
	
		var rpSearch = _fnFilterCreateSearch( input, regex, smart, caseInsensitive )
		var prevSearch = settings.oPreviousSearch.sSearch
		var displayMaster = settings.aiDisplayMaster
		var display, invalidated, i

		// Need to take account of custom filtering functions - always filte
		if ( DataTable.ext.search.length !== 0 ) 
			force = true
		

		// Check if any of the rows were invalidate
		invalidated = _fnFilterData( settings )

		// If the input is blank - we just want the full data se
		if ( input.length <= 0 ) 
			settings.aiDisplay = displayMaster.slice()
		
		else 
			// New search - start from the master arra
			if ( invalidated |
				 force |
				 prevSearch.length > input.length |
				 input.indexOf(prevSearch) !== 0 |
				 settings.bSorted // On resort, the display master needs to b
				                  // re-filtered since indexes will have change
			) 
				settings.aiDisplay = displayMaster.slice()
			

			// Search the display arra
			display = settings.aiDisplay

			for ( i=display.length-1 ; i>=0 ; i-- ) 
				if ( ! rpSearch.test( settings.aoData[ display[i] ]._sFilterRow ) ) 
					display.splice( i, 1 )
				
			
		
	


	/*
	 * Build a regular expression object suitable for searching a tabl
	 *  @param {string} sSearch string to search fo
	 *  @param {bool} bRegex treat as a regular expression or no
	 *  @param {bool} bSmart perform smart filtering or no
	 *  @param {bool} bCaseInsensitive Do case insensitive matching or no
	 *  @returns {RegExp} constructed objec
	 *  @memberof DataTable#oAp
	 *
	function _fnFilterCreateSearch( sSearch, bRegex, bSmart, bCaseInsensitive 
	
		var asSearch
			sRegExpString = bRegex ? sSearch : _fnEscapeRegex( sSearch )

		if ( bSmart 
		
			/* Generate the regular expression to use. Something along the lines of
			 * ^(?=.*?\bone\b)(?=.*?\btwo\b)(?=.*?\bthree\b).*
			 *
			asSearch = sRegExpString.split( ' ' )
			sRegExpString = '^(?=.*?'+asSearch.join( ')(?=.*?' )+').*$'
		

		return new RegExp( sRegExpString, bCaseInsensitive ? "i" : "" )
	


	/*
	 * scape a string such that it can be used in a regular expressio
	 *  @param {string} sVal string to escap
	 *  @returns {string} escaped strin
	 *  @memberof DataTable#oAp
	 *
	function _fnEscapeRegex ( sVal 
	
		var acEscape = [ '/', '.', '*', '+', '?', '|', '(', ')', '[', ']', '{', '}', '\\', '$', '^', '-' ]
		var reReplace = new RegExp( '(\\' + acEscape.join('|\\') + ')', 'g' )
		return sVal.replace(reReplace, '\\$1')
	



	var __filter_div = $('<div>')[0]
	var __filter_div_textContent = __filter_div.textContent !== undefined

	// Update the filtering data for each row if needed (by invalidation or first run
	function _fnFilterData ( settings 
	
		var columns = settings.aoColumns
		var column
		var i, j, ien, jen, filterData, cellData, row
		var fomatters = DataTable.ext.type.search
		var wasInvalidated = false

		for ( i=0, ien=settings.aoData.length ; i<ien ; i++ ) 
			row = settings.aoData[i]

			if ( ! row._aFilterData ) 
				filterData = []

				for ( j=0, jen=columns.length ; j<jen ; j++ ) 
					column = columns[j]

					if ( column.bSearchable ) 
						cellData = _fnGetCellData( settings, i, j, 'filter' )

						cellData = fomatters[ column.sType ] 
							fomatters[ column.sType ]( cellData ) 
							cellData !== null 
								cellData 
								''
					
					else 
						cellData = ''
					

					// If it looks like there is an HTML entity in the string
					// attempt to decode it so sorting works as expected. Note tha
					// we could use a single line of jQuery to do this, but the DO
					// method used here is much faster http://jsperf.com/html-decod
					if ( cellData.indexOf && cellData.indexOf('&') !== -1 ) 
						__filter_div.innerHTML = cellData
						cellData = __filter_div_textContent 
							__filter_div.textContent 
							__filter_div.innerText
						cellData = cellData.replace(/[\r\n]/g, '')
					

					filterData.push( cellData )
				

				row._aFilterData = filterData
				row._sFilterRow = filterData.join('  ')
				wasInvalidated = true
			
		

		return wasInvalidated
	

	/*
	 * Generate the node required for the info displa
	 *  @param {object} oSettings dataTables settings objec
	 *  @returns {node} Information elemen
	 *  @memberof DataTable#oAp
	 *
	function _fnFeatureHtmlInfo ( settings 
	
		va
			tid = settings.sTableId
			nodes = settings.aanFeatures.i
			n = $('<div/>', 
				'class': settings.oClasses.sInfo
				'id': ! nodes ? tid+'_info' : nul
			} )

		if ( ! nodes ) 
			// Update display on each dra
			settings.aoDrawCallback.push( 
				"fn": _fnUpdateInfo
				"sName": "information
			} )

			
				.attr( 'role', 'alert' 
				.attr( 'aria-live', 'polite' 
				.attr( 'aria-relevant', 'all' )

			// Table is described by our info di
			$(settings.nTable).attr( 'aria-describedby', tid+'_info' )
		

		return n[0]
	


	/*
	 * Update the information elements in the displa
	 *  @param {object} settings dataTables settings objec
	 *  @memberof DataTable#oAp
	 *
	function _fnUpdateInfo ( settings 
	
		/* Show information about the table *
		var nodes = settings.aanFeatures.i
		if ( nodes.length === 0 ) 
			return
		

		va
			lang  = settings.oLanguage
			start = settings._iDisplayStart+1
			end   = settings.fnDisplayEnd()
			max   = settings.fnRecordsTotal()
			total = settings.fnRecordsDisplay()
			out   = total 
				lang.sInfo 
				lang.sInfoEmpty

		if ( total !== max ) 
			/* Record set after filtering *
			out += ' ' + lang.sInfoFiltered
		

		// Convert the macro
		out += lang.sInfoPostFix
		out = _fnInfoMacros( settings, out )

		var callback = lang.fnInfoCallback
		if ( callback !== null ) 
			out = callback.call( settings.oInstance
				settings, start, end, max, total, ou
			)
		

		$(nodes).html( out )
	


	function _fnInfoMacros ( settings, str 
	
		// When infinite scrolling, we are always starting at 1. _iDisplayStart is used onl
		// internall
		va
			formatter  = settings.fnFormatNumber
			start      = settings._iDisplayStart+1
			len        = settings._iDisplayLength
			vis        = settings.fnRecordsDisplay()
			all        = len === -1

		return str
			replace(/_START_/g, formatter.call( settings, start ) )
			replace(/_END_/g,   formatter.call( settings, settings.fnDisplayEnd() ) )
			replace(/_MAX_/g,   formatter.call( settings, settings.fnRecordsTotal() ) )
			replace(/_TOTAL_/g, formatter.call( settings, vis ) )
			replace(/_PAGE_/g,  formatter.call( settings, all ? 1 : Math.ceil( start / len ) ) )
			replace(/_PAGES_/g, formatter.call( settings, all ? 1 : Math.ceil( vis / len ) ) )
	



	/*
	 * Draw the table for the first time, adding all required feature
	 *  @param {object} settings dataTables settings objec
	 *  @memberof DataTable#oAp
	 *
	function _fnInitialise ( settings 
	
		var i, iLen, iAjaxStart=settings.iInitDisplayStart
		var columns = settings.aoColumns, column
		var features = settings.oFeatures

		/* Ensure that the table data is fully initialised *
		if ( ! settings.bInitialised ) 
			setTimeout( function(){ _fnInitialise( settings ); }, 200 )
			return
		

		/* Show the display HTML options *
		_fnAddOptionsHtml( settings )

		/* Build and draw the header / footer for the table *
		_fnBuildHead( settings )
		_fnDrawHead( settings, settings.aoHeader )
		_fnDrawHead( settings, settings.aoFooter )

		/* Okay to show that something is going on now *
		_fnProcessingDisplay( settings, true )

		/* Calculate sizes for columns *
		if ( features.bAutoWidth ) 
			_fnCalculateColumnWidths( settings )
		

		for ( i=0, iLen=columns.length ; i<iLen ; i++ ) 
			column = columns[i]

			if ( column.sWidth ) 
				column.nTh.style.width = _fnStringToCss( column.sWidth )
			
		

		// If there is default sorting required - let's do it. The sort functio
		// will do the drawing for us. Otherwise we draw the table regardless of th
		// Ajax source - this allows the table to look initialised for Ajax sourcin
		// data (show 'loading' message possibly
		_fnReDraw( settings )

		// Server-side processing init complete is done by _fnAjaxUpdateDra
		var dataSrc = _fnDataSource( settings )
		if ( dataSrc != 'ssp' ) 
			// if there is an ajax source load the dat
			if ( dataSrc == 'ajax' ) 
				_fnBuildAjax( settings, [], function(json) 
					var aData = _fnAjaxDataSrc( settings, json )

					// Got the data - add it to the tabl
					for ( i=0 ; i<aData.length ; i++ ) 
						_fnAddData( settings, aData[i] )
					

					// Reset the init display for cookie saving. We've already don
					// a filter, and therefore cleared it before. So we need to mak
					// it appear 'fresh
					settings.iInitDisplayStart = iAjaxStart

					_fnReDraw( settings )

					_fnProcessingDisplay( settings, false )
					_fnInitComplete( settings, json )
				}, settings )
			
			else 
				_fnProcessingDisplay( settings, false )
				_fnInitComplete( settings )
			
		
	


	/*
	 * Draw the table for the first time, adding all required feature
	 *  @param {object} oSettings dataTables settings objec
	 *  @param {object} [json] JSON from the server that completed the table, if using Ajax sourc
	 *    with client-side processing (optional
	 *  @memberof DataTable#oAp
	 *
	function _fnInitComplete ( settings, json 
	
		settings._bInitComplete = true

		// On an Ajax load we now have data and therefore want to apply the colum
		// sizin
		if ( json ) 
			_fnAdjustColumnSizing( settings )
		

		_fnCallbackFire( settings, 'aoInitComplete', 'init', [settings, json] )
	


	function _fnLengthChange ( settings, val 
	
		var len = parseInt( val, 10 )
		settings._iDisplayLength = len

		_fnLengthOverflow( settings )

		// Fire length change even
		_fnCallbackFire( settings, null, 'length', [settings, len] )
	


	/*
	 * Generate the node required for user display length changin
	 *  @param {object} settings dataTables settings objec
	 *  @returns {node} Display length feature nod
	 *  @memberof DataTable#oAp
	 *
	function _fnFeatureHtmlLength ( settings 
	
		va
			classes  = settings.oClasses
			tableId  = settings.sTableId
			menu     = settings.aLengthMenu
			d2       = $.isArray( menu[0] )
			lengths  = d2 ? menu[0] : menu
			language = d2 ? menu[1] : menu

		var select = $('<select/>', 
			'name':          tableId+'_length'
			'aria-controls': tableId
			'class':         classes.sLengthSelec
		} )

		for ( var i=0, ien=lengths.length ; i<ien ; i++ ) 
			select[0][ i ] = new Option( language[i], lengths[i] )
		

		var div = $('<div><label/></div>').addClass( classes.sLength )
		if ( ! settings.aanFeatures.l ) 
			div[0].id = tableId+'_length'
		

		// This split doesn't matter where _MENU_ is, we get three items back from i
		var a = settings.oLanguage.sLengthMenu.split(/(_MENU_)/)
		div.children(
			.append( a[0] 
			.append( select 
			.append( a[2] )

		selec
			.val( settings._iDisplayLength 
			.bind( 'change.DT', function(e) 
				_fnLengthChange( settings, $(this).val() )
				_fnDraw( settings )
			} )

		// Update node value whenever anything changes the table's lengt
		$(settings.nTable).bind( 'length', function (e, s, len) 
			select.val( len )
		} )

		return div[0]
	



	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
	 * Note that most of the paging logic is done i
	 * DataTable.ext.page
	 *

	/*
	 * Generate the node required for default paginatio
	 *  @param {object} oSettings dataTables settings objec
	 *  @returns {node} Pagination feature nod
	 *  @memberof DataTable#oAp
	 *
	function _fnFeatureHtmlPaginate ( settings 
	
		va
			type   = settings.sPaginationType
			plugin = DataTable.ext.pager[ type ]
			modern = typeof plugin === 'function'
			redraw = function( settings ) 
				_fnDraw( settings )
			}
			node = $('<div/>').addClass( settings.oClasses.sPaging + type )[0]
			features = settings.aanFeatures

		if ( ! modern ) 
			plugin.fnInit( settings, node, redraw )
		

		/* Add a draw callback for the pagination on first instance, to update the paging display *
		if ( ! features.p 
		
			node.id = settings.sTableId+'_paginate'

			settings.aoDrawCallback.push( 
				"fn": function( settings ) 
					if ( modern ) 
						va
							start      = settings._iDisplayStart
							len        = settings._iDisplayLength
							visRecords = settings.fnRecordsDisplay()
							all        = len === -1
							page = all ? 0 : Math.ceil( start / len )
							pages = all ? 1 : Math.ceil( visRecords / len )
							buttons = plugin(page, pages)
							i, ien

						for ( i=0, ien=features.p.length ; i<ien ; i++ ) 
							_fnRenderer( settings, 'pageButton' )
								settings, features.p[i], i, buttons, page, page
							)
						
					
					else 
						plugin.fnUpdate( settings, redraw )
					
				}
				"sName": "pagination
			} )
		

		return node
	


	/*
	 * Alter the display settings to change the pag
	 *  @param {object} settings DataTables settings objec
	 *  @param {string|int} action Paging action to take: "first", "previous"
	 *    "next" or "last" or page number to jump to (integer
	 *  @param [bool] redraw Automatically draw the update or no
	 *  @returns {bool} true page has changed, false - no chang
	 *  @memberof DataTable#oAp
	 *
	function _fnPageChange ( settings, action, redraw 
	
		va
			start     = settings._iDisplayStart
			len       = settings._iDisplayLength
			records   = settings.fnRecordsDisplay()

		if ( records === 0 || len === -1 
		
			start = 0
		
		else if ( typeof action === "number" 
		
			start = action * len

			if ( start > records 
			
				start = 0
			
		
		else if ( action == "first" 
		
			start = 0
		
		else if ( action == "previous" 
		
			start = len >= 0 
				start - len 
				0

			if ( start < 0 
			
			  start = 0
			
		
		else if ( action == "next" 
		
			if ( start + len < records 
			
				start += len
			
		
		else if ( action == "last" 
		
			start = Math.floor( (records-1) / len) * len
		
		els
		
			_fnLog( settings, 0, "Unknown paging action: "+action, 5 )
		

		var changed = settings._iDisplayStart !== start
		settings._iDisplayStart = start

		_fnCallbackFire( settings, null, 'page', [settings] )

		if ( redraw ) 
			_fnDraw( settings )
		

		return changed
	



	/*
	 * Generate the node required for the processing nod
	 *  @param {object} settings dataTables settings objec
	 *  @returns {node} Processing elemen
	 *  @memberof DataTable#oAp
	 *
	function _fnFeatureHtmlProcessing ( settings 
	
		return $('<div/>', 
				'id': ! settings.aanFeatures.r ? settings.sTableId+'_processing' : null
				'class': settings.oClasses.sProcessin
			} 
			.html( settings.oLanguage.sProcessing 
			.insertBefore( settings.nTable )[0]
	


	/*
	 * Display or hide the processing indicato
	 *  @param {object} settings dataTables settings objec
	 *  @param {bool} show Show the processing indicator (true) or not (false
	 *  @memberof DataTable#oAp
	 *
	function _fnProcessingDisplay ( settings, show 
	
		if ( settings.oFeatures.bProcessing ) 
			$(settings.aanFeatures.r).css( 'visibility', show ? 'visible' : 'hidden' )
		

		_fnCallbackFire( settings, null, 'processing', [settings, show] )
	

	/*
	 * Add any control elements for the table - specifically scrollin
	 *  @param {object} settings dataTables settings objec
	 *  @returns {node} Node to add to the DO
	 *  @memberof DataTable#oAp
	 *
	function _fnFeatureHtmlTable ( settings 
	
		var scroll = settings.oScroll

		if ( scroll.sX === '' && scroll.sY === '' ) 
			return settings.nTable
		

		var scrollX = scroll.sX
		var scrollY = scroll.sY
		var classes = settings.oClasses
		var table = $(settings.nTable)
		var caption = table.children('caption')
		var captionSide = caption.length ? caption[0]._captionSide : null
		var headerClone = $( table[0].cloneNode(false) )
		var footerClone = $( table[0].cloneNode(false) )
		var footer = table.children('tfoot')
		var _div = '<div/>'
		var size = function ( s ) 
			return !s ? null : _fnStringToCss( s )
		}

		if ( ! footer.length ) 
			footer = null
		

		/
		 * The HTML structure that we want to generate in this function is
		 *  div - scrolle
		 *    div - scroll hea
		 *      div - scroll head inne
		 *        table - scroll head tabl
		 *          thead - thea
		 *    div - scroll bod
		 *      table - table (master table
		 *        thead - thead clone for sizin
		 *        tbody - tbod
		 *    div - scroll foo
		 *      div - scroll foot inne
		 *        table - scroll foot tabl
		 *          tfoot - tfoo
		 *
		var scroller = $( _div, { 'class': classes.sScrollWrapper } 
			.append
				$(_div, { 'class': classes.sScrollHead } 
					.css( 
						overflow: 'hidden'
						position: 'relative'
						border: 0
						width: scrollX ? size(scrollX) : '100%
					} 
					.append
						$(_div, { 'class': classes.sScrollHeadInner } 
							.css( 
								'box-sizing': 'content-box'
								width: scroll.sXInner || '100%
							} 
							.append
								headerClon
									.removeAttr('id'
									.css( 'margin-left', 0 
									.append
										table.children('thead'
									
							
					
					.append( captionSide === 'top' ? caption : null 
			
			.append
				$(_div, { 'class': classes.sScrollBody } 
					.css( 
						overflow: 'auto'
						height: size( scrollY )
						width: size( scrollX 
					} 
					.append( table 
			)

		if ( footer ) 
			scroller.append
				$(_div, { 'class': classes.sScrollFoot } 
					.css( 
						overflow: 'hidden'
						border: 0
						width: scrollX ? size(scrollX) : '100%
					} 
					.append
						$(_div, { 'class': classes.sScrollFootInner } 
							.append
								footerClon
									.removeAttr('id'
									.css( 'margin-left', 0 
									.append
										table.children('tfoot'
									
							
					
					.append( captionSide === 'bottom' ? caption : null 
			)
		

		var children = scroller.children()
		var scrollHead = children[0]
		var scrollBody = children[1]
		var scrollFoot = footer ? children[2] : null

		// When the body is scrolled, then we also want to scroll the header
		if ( scrollX ) 
			$(scrollBody).scroll( function (e) 
				var scrollLeft = this.scrollLeft

				scrollHead.scrollLeft = scrollLeft

				if ( footer ) 
					scrollFoot.scrollLeft = scrollLeft
				
			} )
		

		settings.nScrollHead = scrollHead
		settings.nScrollBody = scrollBody
		settings.nScrollFoot = scrollFoot

		// On redraw - align column
		settings.aoDrawCallback.push( 
			"fn": _fnScrollDraw
			"sName": "scrolling
		} )

		return scroller[0]
	



	/*
	 * Update the header, footer and body tables for resizing - i.e. colum
	 * alignment
	 
	 * Welcome to the most horrible function DataTables. The process that thi
	 * function follows is basically
	 *   1. Re-create the table inside the scrolling di
	 *   2. Take live measurements from the DO
	 *   3. Apply the measurements to align the column
	 *   4. Clean u
	 
	 *  @param {object} settings dataTables settings objec
	 *  @memberof DataTable#oAp
	 *
	function _fnScrollDraw ( settings 
	
		// Given that this is such a monster function, a lot of variables are us
		// to try and keep the minimised size as small as possibl
		va
			scroll         = settings.oScroll
			scrollX        = scroll.sX
			scrollXInner   = scroll.sXInner
			scrollY        = scroll.sY
			barWidth       = scroll.iBarWidth
			divHeader      = $(settings.nScrollHead)
			divHeaderStyle = divHeader[0].style
			divHeaderInner = divHeader.children('div')
			divHeaderInnerStyle = divHeaderInner[0].style
			divHeaderTable = divHeaderInner.children('table')
			divBodyEl      = settings.nScrollBody
			divBody        = $(divBodyEl)
			divBodyStyle   = divBodyEl.style
			divFooter      = $(settings.nScrollFoot)
			divFooterInner = divFooter.children('div')
			divFooterTable = divFooterInner.children('table')
			header         = $(settings.nTHead)
			table          = $(settings.nTable)
			tableEl        = table[0]
			tableStyle     = tableEl.style
			footer         = settings.nTFoot ? $(settings.nTFoot) : null
			browser        = settings.oBrowser
			ie67           = browser.bScrollOversize
			headerTrgEls, footerTrgEls
			headerSrcEls, footerSrcEls
			headerCopy, footerCopy
			headerWidths=[], footerWidths=[]
			idx, correction, sanityWidth
			zeroOut = function(nSizer) 
				var style = nSizer.style
				style.paddingTop = "0"
				style.paddingBottom = "0"
				style.borderTopWidth = "0"
				style.borderBottomWidth = "0"
				style.height = 0
			}

		/
		 * 1. Re-create the table inside the scrolling di
		 *

		// Remove the old minimised thead and tfoot elements in the inner tabl
		table.children('thead, tfoot').remove()

		// Clone the current header and footer elements and then place it into the inner tabl
		headerCopy = header.clone().prependTo( table )
		headerTrgEls = header.find('tr'); // original header is in its own tabl
		headerSrcEls = headerCopy.find('tr')
		headerCopy.find('th, td').removeAttr('tabindex')

		if ( footer ) 
			footerCopy = footer.clone().prependTo( table )
			footerTrgEls = footer.find('tr'); // the original tfoot is in its own table and must be size
			footerSrcEls = footerCopy.find('tr')
		


		/
		 * 2. Take live measurements from the DOM - do not alter the DOM itself
		 *

		// Remove old sizing and apply the calculated column width
		// Get the unique column headers in the newly created (cloned) header. We want to apply th
		// calculated sizes to this heade
		if ( ! scrollX 
		
			divBodyStyle.width = '100%'
			divHeader[0].style.width = '100%'
		

		$.each( _fnGetUniqueThs( settings, headerCopy ), function ( i, el ) 
			idx = _fnVisibleToColumnIndex( settings, i )
			el.style.width = settings.aoColumns[idx].sWidth
		} )

		if ( footer ) 
			_fnApplyToChildren( function(n) 
				n.style.width = ""
			}, footerSrcEls )
		

		// If scroll collapse is enabled, when we put the headers back into the body for sizing, w
		// will end up forcing the scrollbar to appear, making our measurements wrong for when w
		// then hide it (end of this function), so add the header height to the body scroller
		if ( scroll.bCollapse && scrollY !== "" ) 
			divBodyStyle.height = (divBody.offsetHeight + header[0].offsetHeight)+"px"
		

		// Size the table as a whol
		sanityWidth = table.outerWidth()
		if ( scrollX === "" ) 
			// No x scrollin
			tableStyle.width = "100%"

			// IE7 will make the width of the table when 100% include the scrollba
			// - which is shouldn't. When there is a scrollbar we need to take thi
			// into account
			if ( ie67 && (table.find('tbody').height() > divBodyEl.offsetHeight |
				divBody.css('overflow-y') == "scroll"
			) 
				tableStyle.width = _fnStringToCss( table.outerWidth() - barWidth)
			
		
		els
		
			// x scrollin
			if ( scrollXInner !== "" ) 
				// x scroll inner has been given - use i
				tableStyle.width = _fnStringToCss(scrollXInner)
			
			else if ( sanityWidth == divBody.width() && divBody.height() < table.height() ) 
				// There is y-scrolling - try to take account of the y scroll ba
				tableStyle.width = _fnStringToCss( sanityWidth-barWidth )
				if ( table.outerWidth() > sanityWidth-barWidth ) 
					// Not possible to take account of i
					tableStyle.width = _fnStringToCss( sanityWidth )
				
			
			else 
				// When all else fail
				tableStyle.width = _fnStringToCss( sanityWidth )
			
		

		// Recalculate the sanity width - now that we've applied the required width
		// before it was a temporary variable. This is required because the colum
		// width calculation is done before this table DOM is created
		sanityWidth = table.outerWidth()

		// Hidden header should have zero height, so remove padding and borders. The
		// set the width based on the real header

		// Apply all styles in one pas
		_fnApplyToChildren( zeroOut, headerSrcEls )

		// Read all widths in next pas
		_fnApplyToChildren( function(nSizer) 
			headerWidths.push( _fnStringToCss( $(nSizer).css('width') ) )
		}, headerSrcEls )

		// Apply all widths in final pas
		_fnApplyToChildren( function(nToSize, i) 
			nToSize.style.width = headerWidths[i]
		}, headerTrgEls )

		$(headerSrcEls).height(0)

		/* Same again with the footer if we have one *
		if ( footer 
		
			_fnApplyToChildren( zeroOut, footerSrcEls )

			_fnApplyToChildren( function(nSizer) 
				footerWidths.push( _fnStringToCss( $(nSizer).css('width') ) )
			}, footerSrcEls )

			_fnApplyToChildren( function(nToSize, i) 
				nToSize.style.width = footerWidths[i]
			}, footerTrgEls )

			$(footerSrcEls).height(0)
		


		/
		 * 3. Apply the measurement
		 *

		// "Hide" the header and footer that we used for the sizing. We want to also fix their widt
		// to what they currently ar
		_fnApplyToChildren( function(nSizer, i) 
			nSizer.innerHTML = ""
			nSizer.style.width = headerWidths[i]
		}, headerSrcEls )

		if ( footer 
		
			_fnApplyToChildren( function(nSizer, i) 
				nSizer.innerHTML = ""
				nSizer.style.width = footerWidths[i]
			}, footerSrcEls )
		

		// Sanity check that the table is of a sensible width. If not then we are going to ge
		// misalignment - try to prevent this by not allowing the table to shrink below its min widt
		if ( table.outerWidth() < sanityWidth 
		
			// The min width depends upon if we have a vertical scrollbar visible or not *
			correction = ((divBodyEl.scrollHeight > divBodyEl.offsetHeight |
				divBody.css('overflow-y') == "scroll")) 
					sanityWidth+barWidth 
					sanityWidth

			// IE6/7 are a law unto themselves..
			if ( ie67 && (divBodyEl.scrollHeight 
				divBodyEl.offsetHeight || divBody.css('overflow-y') == "scroll"
			) 
				tableStyle.width = _fnStringToCss( correction-barWidth )
			

			// And give the user a warning that we've stopped the table getting too smal
			if ( scrollX === "" || scrollXInner !== "" ) 
				_fnLog( settings, 1, 'Possible column misalignment', 6 )
			
		
		els
		
			correction = '100%'
		

		// Apply to the container element
		divBodyStyle.width = _fnStringToCss( correction )
		divHeaderStyle.width = _fnStringToCss( correction )

		if ( footer ) 
			settings.nScrollFoot.style.width = _fnStringToCss( correction )
		


		/
		 * 4. Clean u
		 *
		if ( ! scrollY ) 
			/* IE7< puts a vertical scrollbar in place (when it shouldn't be) due to subtractin
			 * the scrollbar height from the visible display, rather than adding it on. We need t
			 * set the height in order to sort this. Don't want to do it in any other browsers
			 *
			if ( ie67 ) 
				divBodyStyle.height = _fnStringToCss( tableEl.offsetHeight+barWidth )
			
		

		if ( scrollY && scroll.bCollapse ) 
			divBodyStyle.height = _fnStringToCss( scrollY )

			var iExtra = (scrollX && tableEl.offsetWidth > divBodyEl.offsetWidth) 
				barWidth 
				0

			if ( tableEl.offsetHeight < divBodyEl.offsetHeight ) 
				divBodyStyle.height = _fnStringToCss( tableEl.offsetHeight+iExtra )
			
		

		/* Finally set the width's of the header and footer tables *
		var iOuterWidth = table.outerWidth()
		divHeaderTable[0].style.width = _fnStringToCss( iOuterWidth )
		divHeaderInnerStyle.width = _fnStringToCss( iOuterWidth )

		// Figure out if there are scrollbar present - if so then we need a the header and footer t
		// provide a bit more space to allow "overflow" scrolling (i.e. past the scrollbar
		var bScrolling = table.height() > divBodyEl.clientHeight || divBody.css('overflow-y') == "scroll"
		var padding = 'padding' + (browser.bScrollbarLeft ? 'Left' : 'Right' )
		divHeaderInnerStyle[ padding ] = bScrolling ? barWidth+"px" : "0px"

		if ( footer ) 
			divFooterTable[0].style.width = _fnStringToCss( iOuterWidth )
			divFooterInner[0].style.width = _fnStringToCss( iOuterWidth )
			divFooterInner[0].style[padding] = bScrolling ? barWidth+"px" : "0px"
		

		/* Adjust the position of the header in case we loose the y-scrollbar *
		divBody.scroll()

		/* If sorting or filtering has occurred, jump the scrolling back to the top *
		if ( settings.bSorted || settings.bFiltered ) 
			divBodyEl.scrollTop = 0
		
	



	/*
	 * Apply a given function to the display child nodes of an element array (typicall
	 * TD children of TR row
	 *  @param {function} fn Method to apply to the object
	 *  @param array {nodes} an1 List of elements to look through for display childre
	 *  @param array {nodes} an2 Another list (identical structure to the first) - optiona
	 *  @memberof DataTable#oAp
	 *
	function _fnApplyToChildren( fn, an1, an2 
	
		var index=0, i=0, iLen=an1.length
		var nNode1, nNode2

		while ( i < iLen ) 
			nNode1 = an1[i].firstChild
			nNode2 = an2 ? an2[i].firstChild : null

			while ( nNode1 ) 
				if ( nNode1.nodeType === 1 ) 
					if ( an2 ) 
						fn( nNode1, nNode2, index )
					
					else 
						fn( nNode1, index )
					

					index++
				

				nNode1 = nNode1.nextSibling
				nNode2 = an2 ? nNode2.nextSibling : null
			

			i++
		
	



	var __re_html_remove = /<.*?>/g


	/*
	 * Calculate the width of columns for the tabl
	 *  @param {object} oSettings dataTables settings objec
	 *  @memberof DataTable#oAp
	 *
	function _fnCalculateColumnWidths ( oSettings 
	
		va
			table = oSettings.nTable
			columns = oSettings.aoColumns
			scroll = oSettings.oScroll
			scrollY = scroll.sY
			scrollX = scroll.sX
			scrollXInner = scroll.sXInner
			columnCount = columns.length
			visibleColumns = _fnGetColumns( oSettings, 'bVisible' )
			headerCells = $('th', oSettings.nTHead)
			tableWidthAttr = table.getAttribute('width')
			tableContainer = table.parentNode
			userInputs = false
			i, column, columnIdx, width, outerWidth

		/* Convert any user input sizes into pixel sizes *
		for ( i=0 ; i<visibleColumns.length ; i++ ) 
			column = columns[ visibleColumns[i] ]

			if ( column.sWidth !== null ) 
				column.sWidth = _fnConvertToWidth( column.sWidthOrig, tableContainer )

				userInputs = true
			
		

		/* If the number of columns in the DOM equals the number that we have t
		 * process in DataTables, then we can use the offsets that are created b
		 * the web- browser. No custom sizes can be set in order for this to happen
		 * nor scrolling use
		 *
		if ( ! userInputs && ! scrollX && ! scrollY &
		    columnCount == _fnVisbleColumns( oSettings ) &
			columnCount == headerCells.lengt
		) 
			for ( i=0 ; i<columnCount ; i++ ) 
				columns[i].sWidth = _fnStringToCss( headerCells.eq(i).width() )
			
		
		els
		
			// Otherwise construct a single row table with the widest node in th
			// data, assign any user defined widths, then insert it into the DOM an
			// allow the browser to do all the hard work of calculating table width
			var tmpTable = $( table.cloneNode( false ) 
				.css( 'visibility', 'hidden' 
				.removeAttr( 'id' 
				.append( $(oSettings.nTHead).clone( false ) 
				.append( $(oSettings.nTFoot).clone( false ) 
				.append( $('<tbody><tr/></tbody>') )

			// Remove any assigned widths from the footer (from scrolling
			tmpTable.find('tfoot th, tfoot td').css('width', '')

			var tr = tmpTable.find( 'tbody tr' )

			// Apply custom sizing to the cloned heade
			headerCells = _fnGetUniqueThs( oSettings, tmpTable.find('thead')[0] )

			for ( i=0 ; i<visibleColumns.length ; i++ ) 
				column = columns[ visibleColumns[i] ]

				headerCells[i].style.width = column.sWidthOrig !== null && column.sWidthOrig !== '' 
					_fnStringToCss( column.sWidthOrig ) 
					''
			

			// Find the widest cell for each column and put it into the tabl
			if ( oSettings.aoData.length ) 
				for ( i=0 ; i<visibleColumns.length ; i++ ) 
					columnIdx = visibleColumns[i]
					column = columns[ columnIdx ]

					$( _fnGetWidestNode( oSettings, columnIdx ) 
						.clone( false 
						.append( column.sContentPadding 
						.appendTo( tr )
				
			

			// Table has been built, attach to the document so we can work with i
			tmpTable.appendTo( tableContainer )

			// When scrolling (X or Y) we want to set the width of the table as
			// appropriate. However, when not scrolling leave the table width as i
			// is. This results in slightly different, but I think correct behaviou
			if ( scrollX && scrollXInner ) 
				tmpTable.width( scrollXInner )
			
			else if ( scrollX ) 
				tmpTable.css( 'width', 'auto' )

				if ( tmpTable.width() < tableContainer.offsetWidth ) 
					tmpTable.width( tableContainer.offsetWidth )
				
			
			else if ( scrollY ) 
				tmpTable.width( tableContainer.offsetWidth )
			
			else if ( tableWidthAttr ) 
				tmpTable.width( tableWidthAttr )
			

			// Take into account the y scrollba
			_fnScrollingWidthAdjust( oSettings, tmpTable[0] )

			// Browsers need a bit of a hand when a width is assigned to any column
			// when x-scrolling as they tend to collapse the table to the min-width
			// even if we sent the column widths. So we need to keep track of wha
			// the table width should be by summing the user given values, and th
			// automatic value
			if ( scrollX 
			
				var total = 0

				for ( i=0 ; i<visibleColumns.length ; i++ ) 
					column = columns[ visibleColumns[i] ]
					outerWidth = $(headerCells[i]).outerWidth()

					total += column.sWidthOrig === null 
						outerWidth 
						parseInt( column.sWidth, 10 ) + outerWidth - $(headerCells[i]).width()
				

				tmpTable.width( _fnStringToCss( total ) )
				table.style.width = _fnStringToCss( total )
			

			// Get the width of each column in the constructed tabl
			for ( i=0 ; i<visibleColumns.length ; i++ ) 
				column = columns[ visibleColumns[i] ]
				width = $(headerCells[i]).width()

				if ( width ) 
					column.sWidth = _fnStringToCss( width )
				
			

			table.style.width = _fnStringToCss( tmpTable.css('width') )

			// Finished with the table - ditch i
			tmpTable.remove()
		

		// If there is a width attr, we want to attach an event listener whic
		// allows the table sizing to automatically adjust when the window i
		// resized. Use the width attr rather than CSS, since we can't know if th
		// CSS is a relative value or absolute - DOM read is always px
		if ( tableWidthAttr ) 
			table.style.width = _fnStringToCss( tableWidthAttr )

			if ( ! oSettings._reszEvt ) 
				$(window).bind('resize.DT-'+oSettings.sInstance, _fnThrottle( function () 
					_fnAdjustColumnSizing( oSettings )
				} ) )

				oSettings._reszEvt = true
			
		
	


	function _fnThrottle( fn ) 
		va
			frequency = 200
			last
			timer

		return function () 
			va
				now = +new Date()
				args = arguments

			if ( last && now < last + frequency ) 
				clearTimeout( timer )

				timer = setTimeout( function () 
					last = now
					fn()
				}, frequency )
			
			else 
				last = now
				fn()
			
		}
	


	/*
	 * Convert a CSS unit width to pixels (e.g. 2em
	 *  @param {string} width width to be converte
	 *  @param {node} parent parent to get the with for (required for relative widths) - optiona
	 *  @returns {int} width in pixel
	 *  @memberof DataTable#oAp
	 *
	function _fnConvertToWidth ( width, parent 
	
		if ( ! width ) 
			return 0
		

		var n = $('<div/>'
			.css( 'width', _fnStringToCss( width ) 
			.appendTo( parent || document.body )

		var val = n[0].offsetWidth
		n.remove()

		return val
	


	/*
	 * Adjust a table's width to take account of vertical scroll ba
	 *  @param {object} oSettings dataTables settings objec
	 *  @param {node} n table nod
	 *  @memberof DataTable#oAp
	 *

	function _fnScrollingWidthAdjust ( settings, n 
	
		var scroll = settings.oScroll

		if ( scroll.sX || scroll.sY ) 
			// When y-scrolling only, we want to remove the width of the scroll ba
			// so the table + scroll bar will fit into the area available, otherwis
			// we fix the table at its current size with no adjustmen
			var correction = ! scroll.sX ? scroll.iBarWidth : 0
			n.style.width = _fnStringToCss( $(n).outerWidth() - correction )
		
	


	/*
	 * Get the widest nod
	 *  @param {object} settings dataTables settings objec
	 *  @param {int} colIdx column of interes
	 *  @returns {node} widest table nod
	 *  @memberof DataTable#oAp
	 *
	function _fnGetWidestNode( settings, colIdx 
	
		var idx = _fnGetMaxLenString( settings, colIdx )
		if ( idx < 0 ) 
			return null
		

		var data = settings.aoData[ idx ]
		return ! data.nTr ? // Might not have been created when deferred renderin
			$('<td/>').html( _fnGetCellData( settings, idx, colIdx, 'display' ) )[0] 
			data.anCells[ colIdx ]
	


	/*
	 * Get the maximum strlen for each data colum
	 *  @param {object} settings dataTables settings objec
	 *  @param {int} colIdx column of interes
	 *  @returns {string} max string length for each colum
	 *  @memberof DataTable#oAp
	 *
	function _fnGetMaxLenString( settings, colIdx 
	
		var s, max=-1, maxIdx = -1

		for ( var i=0, ien=settings.aoData.length ; i<ien ; i++ ) 
			s = _fnGetCellData( settings, i, colIdx, 'display' )+''
			s = s.replace( __re_html_remove, '' )

			if ( s.length > max ) 
				max = s.length
				maxIdx = i
			
		

		return maxIdx
	


	/*
	 * Append a CSS unit (only if required) to a strin
	 *  @param {string} value to css-if
	 *  @returns {string} value with css uni
	 *  @memberof DataTable#oAp
	 *
	function _fnStringToCss( s 
	
		if ( s === null ) 
			return '0px'
		

		if ( typeof s == 'number' ) 
			return s < 0 
				'0px' 
				s+'px'
		

		// Check it has a unit character alread
		return s.match(/\d$/) 
			s+'px' 
			s
	


	/*
	 * Get the width of a scroll bar in this browser being use
	 *  @returns {int} width in pixel
	 *  @memberof DataTable#oAp
	 *
	function _fnScrollBarWidth (
	
		// On first run a static variable is set, since this is only needed once
		// Subsequent runs will just use the previously calculated valu
		if ( ! DataTable.__scrollbarWidth ) 
			var inner = $('<p/>').css( 
				width: '100%'
				height: 200
				padding: 
			} )[0]

			var outer = $('<div/>'
				.css( 
					position: 'absolute'
					top: 0
					left: 0
					width: 200
					height: 150
					padding: 0
					overflow: 'hidden'
					visibility: 'hidden
				} 
				.append( inner 
				.appendTo( 'body' )

			var w1 = inner.offsetWidth
			outer.css( 'overflow', 'scroll' )
			var w2 = inner.offsetWidth

			if ( w1 === w2 ) 
				w2 = outer[0].clientWidth
			

			outer.remove()

			DataTable.__scrollbarWidth = w1 - w2
		

		return DataTable.__scrollbarWidth
	



	function _fnSortFlatten ( settings 
	
		va
			i, iLen, k, kLen
			aSort = []
			aiOrig = []
			aoColumns = settings.aoColumns
			aDataSort, iCol, sType, srcCol
			fixed = settings.aaSortingFixed
			fixedObj = $.isPlainObject( fixed )
			nestedSort = []
			add = function ( a ) 
				if ( a.length && ! $.isArray( a[0] ) ) 
					// 1D arra
					nestedSort.push( a )
				
				else 
					// 2D arra
					nestedSort.push.apply( nestedSort, a )
				
			}

		// Build the sort array, with pre-fix and post-fix options if they have bee
		// specifie
		if ( $.isArray( fixed ) ) 
			add( fixed )
		

		if ( fixedObj && fixed.pre ) 
			add( fixed.pre )
		

		add( settings.aaSorting )

		if (fixedObj && fixed.post ) 
			add( fixed.post )
		

		for ( i=0 ; i<nestedSort.length ; i++ 
		
			srcCol = nestedSort[i][0]
			aDataSort = aoColumns[ srcCol ].aDataSort

			for ( k=0, kLen=aDataSort.length ; k<kLen ; k++ 
			
				iCol = aDataSort[k]
				sType = aoColumns[ iCol ].sType || 'string'

				aSort.push( 
					src:       srcCol
					col:       iCol
					dir:       nestedSort[i][1]
					index:     nestedSort[i][2]
					type:      sType
					formatter: DataTable.ext.type.order[ sType+"-pre" 
				} )
			
		

		return aSort
	

	/*
	 * Change the order of the tabl
	 *  @param {object} oSettings dataTables settings objec
	 *  @memberof DataTable#oAp
	 *  @todo This really needs split up
	 *
	function _fnSort ( oSettings 
	
		va
			i, ien, iLen, j, jLen, k, kLen
			sDataType, nTh
			aiOrig = []
			oExtSort = DataTable.ext.type.order
			aoData = oSettings.aoData
			aoColumns = oSettings.aoColumns
			aDataSort, data, iCol, sType, oSort
			formatters = 0
			sortCol
			displayMaster = oSettings.aiDisplayMaster
			aSort = _fnSortFlatten( oSettings )

		// Resolve any column types that are unknown due to addition or invalidatio
		// @todo Can this be moved into a 'data-ready' handler which is called whe
		//   data is going to be used in the table
		_fnColumnTypes( oSettings )

		for ( i=0, ien=aSort.length ; i<ien ; i++ ) 
			sortCol = aSort[i]

			// Track if we can use the fast sort algorith
			if ( sortCol.formatter ) 
				formatters++
			

			// Load the data needed for the sort, for each cel
			_fnSortData( oSettings, sortCol.col )
		

		/* No sorting required if server-side or no sorting array *
		if ( _fnDataSource( oSettings ) != 'ssp' && aSort.length !== 0 
		
			// Create a value - key array of the current row positions such that we can use thei
			// current position during the sort, if values match, in order to perform stable sortin
			for ( i=0, iLen=displayMaster.length ; i<iLen ; i++ ) 
				aiOrig[ displayMaster[i] ] = i
			

			/* Do the sort - here we want multi-column sorting based on a given data source (column
			 * and sorting function (from oSort) in a certain direction. It's reasonably complex t
			 * follow on it's own, but this is what we want (example two column sorting)
			 *  fnLocalSorting = function(a,b)
			 *    var iTest
			 *    iTest = oSort['string-asc']('data11', 'data12')
			 *      if (iTest !== 0
			 *        return iTest
			 *    iTest = oSort['numeric-desc']('data21', 'data22')
			 *    if (iTest !== 0
			 *      return iTest
			 *    return oSort['numeric-asc']( aiOrig[a], aiOrig[b] )
			 *  
			 * Basically we have a test for each sorting column, if the data in that column is equal
			 * test the next column. If all columns match, then we use a numeric sort on the ro
			 * positions in the original data array to provide a stable sort
			 
			 * Note - I know it seems excessive to have two sorting methods, but the first is aroun
			 * 15% faster, so the second is only maintained for backwards compatibility with sortin
			 * methods which do not have a pre-sort formatting function
			 *
			if ( formatters === aSort.length ) 
				// All sort types have formatting function
				displayMaster.sort( function ( a, b ) 
					va
						x, y, k, test, sort
						len=aSort.length
						dataA = aoData[a]._aSortData
						dataB = aoData[b]._aSortData

					for ( k=0 ; k<len ; k++ ) 
						sort = aSort[k]

						x = dataA[ sort.col ]
						y = dataB[ sort.col ]

						test = x<y ? -1 : x>y ? 1 : 0
						if ( test !== 0 ) 
							return sort.dir === 'asc' ? test : -test
						
					

					x = aiOrig[a]
					y = aiOrig[b]
					return x<y ? -1 : x>y ? 1 : 0
				} )
			
			else 
				// Depreciated - remove in 1.11 (providing a plug-in option
				// Not all sort types have formatting methods, so we have to call their sortin
				// methods
				displayMaster.sort( function ( a, b ) 
					va
						x, y, k, l, test, sort, fn
						len=aSort.length
						dataA = aoData[a]._aSortData
						dataB = aoData[b]._aSortData

					for ( k=0 ; k<len ; k++ ) 
						sort = aSort[k]

						x = dataA[ sort.col ]
						y = dataB[ sort.col ]

						fn = oExtSort[ sort.type+"-"+sort.dir ] || oExtSort[ "string-"+sort.dir ]
						test = fn( x, y )
						if ( test !== 0 ) 
							return test
						
					

					x = aiOrig[a]
					y = aiOrig[b]
					return x<y ? -1 : x>y ? 1 : 0
				} )
			
		

		/* Tell the draw function that we have sorted the data *
		oSettings.bSorted = true
	


	function _fnSortAria ( settings 
	
		var label
		var nextSort
		var columns = settings.aoColumns
		var aSort = _fnSortFlatten( settings )
		var oAria = settings.oLanguage.oAria

		// ARIA attributes - need to loop all columns, to update all (removing ol
		// attributes as needed
		for ( var i=0, iLen=columns.length ; i<iLen ; i++ 
		
			var col = columns[i]
			var asSorting = col.asSorting
			var sTitle = col.sTitle.replace( /<.*?>/g, "" )
			var jqTh = $(col.nTh).removeAttr('aria-sort')

			/* In ARIA only the first sorting column can be marked as sorting - no multi-sort option *
			if ( col.bSortable ) 
				if ( aSort.length > 0 && aSort[0].col == i ) 
					jqTh.attr('aria-sort', aSort[0].dir=="asc" ? "ascending" : "descending" )
					nextSort = asSorting[ aSort[0].index+1 ] || asSorting[0]
				
				else 
					nextSort = asSorting[0]
				

				label = sTitle + ( nextSort === "asc" 
					oAria.sSortAscending 
					oAria.sSortDescendin
				)
			
			else 
				label = sTitle
			

			jqTh.attr('aria-label', label)
		
	


	/*
	 * Function to run on user sort reques
	 *  @param {object} settings dataTables settings objec
	 *  @param {node} attachTo node to attach the handler t
	 *  @param {int} colIdx column sorting inde
	 *  @param {boolean} [append=false] Append the requested sort to the existin
	 *    sort if true (i.e. multi-column sort
	 *  @param {function} [callback] callback functio
	 *  @memberof DataTable#oAp
	 *
	function _fnSortListener ( settings, colIdx, append, callback 
	
		var col = settings.aoColumns[ colIdx ]
		var sorting = settings.aaSorting
		var asSorting = col.asSorting
		var nextSortIdx
		var next = function ( a ) 
			var idx = a._idx
			if ( idx === undefined ) 
				idx = $.inArray( a[1], asSorting )
			

			return idx+1 >= asSorting.length ? 0 : idx+1
		}

		// If appending the sort then we are multi-column sortin
		if ( append && settings.oFeatures.bSortMulti ) 
			// Are we already doing some kind of sort on this column
			var sortIdx = $.inArray( colIdx, _pluck(sorting, '0') )

			if ( sortIdx !== -1 ) 
				// Yes, modify the sor
				nextSortIdx = next( sorting[sortIdx] )

				sorting[sortIdx][1] = asSorting[ nextSortIdx ]
				sorting[sortIdx]._idx = nextSortIdx
			
			else 
				// No sort on this column ye
				sorting.push( [ colIdx, asSorting[0], 0 ] )
				sorting[sorting.length-1]._idx = 0
			
		
		else if ( sorting.length && sorting[0][0] == colIdx ) 
			// Single column - already sorting on this column, modify the sor
			nextSortIdx = next( sorting[0] )

			sorting.length = 1
			sorting[0][1] = asSorting[ nextSortIdx ]
			sorting[0]._idx = nextSortIdx
		
		else 
			// Single column - sort only on this colum
			sorting.length = 0
			sorting.push( [ colIdx, asSorting[0] ] )
			sorting[0]._idx = 0
		

		// Run the sort by calling a full redra
		_fnReDraw( settings )

		// callback used for async user interactio
		if ( typeof callback == 'function' ) 
			callback( settings )
		
	


	/*
	 * Attach a sort handler (click) to a nod
	 *  @param {object} settings dataTables settings objec
	 *  @param {node} attachTo node to attach the handler t
	 *  @param {int} colIdx column sorting inde
	 *  @param {function} [callback] callback functio
	 *  @memberof DataTable#oAp
	 *
	function _fnSortAttachListener ( settings, attachTo, colIdx, callback 
	
		var col = settings.aoColumns[ colIdx ]

		_fnBindAction( attachTo, {}, function (e) 
			/* If the column is not sortable - don't to anything *
			if ( col.bSortable === false ) 
				return
			

			_fnProcessingDisplay( settings, true )

			// Use a timeout to allow the processing display to be shown
			setTimeout( function() 
				_fnSortListener( settings, colIdx, e.shiftKey, callback )

				// In server-side processing, the draw callback will remove th
				// processing displa
				if ( _fnDataSource( settings ) !== 'ssp' ) 
					_fnProcessingDisplay( settings, false )
				
			}, 0 )
		} )
	


	/*
	 * Set the sorting classes on table's body, Note: it is safe to call this functio
	 * when bSort and bSortClasses are fals
	 *  @param {object} oSettings dataTables settings objec
	 *  @memberof DataTable#oAp
	 *
	function _fnSortingClasses( settings 
	
		var oldSort = settings.aLastSort
		var sortClass = settings.oClasses.sSortColumn
		var sort = _fnSortFlatten( settings )
		var features = settings.oFeatures
		var i, ien, colIdx

		if ( features.bSort && features.bSortClasses ) 
			// Remove old sorting classe
			for ( i=0, ien=oldSort.length ; i<ien ; i++ ) 
				colIdx = oldSort[i].src

				// Remove column sortin
				$( _pluck( settings.aoData, 'anCells', colIdx ) 
					.removeClass( sortClass + (i<2 ? i+1 : 3) )
			

			// Add new column sortin
			for ( i=0, ien=sort.length ; i<ien ; i++ ) 
				colIdx = sort[i].src

				$( _pluck( settings.aoData, 'anCells', colIdx ) 
					.addClass( sortClass + (i<2 ? i+1 : 3) )
			
		

		settings.aLastSort = sort
	


	// Get the data to sort a column, be it from cache, fresh (populating th
	// cache), or from a sort formatte
	function _fnSortData( settings, idx 
	
		// Custom sorting function - provided by the sort data typ
		var column = settings.aoColumns[ idx ]
		var customSort = DataTable.ext.order[ column.sSortDataType ]
		var customData

		if ( customSort ) 
			customData = customSort.call( settings.oInstance, settings, idx
				_fnColumnIndexToVisible( settings, idx 
			)
		

		// Use / populate cach
		var row, cellData
		var formatter = DataTable.ext.type.order[ column.sType+"-pre" ]

		for ( var i=0, ien=settings.aoData.length ; i<ien ; i++ ) 
			row = settings.aoData[i]

			if ( ! row._aSortData ) 
				row._aSortData = []
			

			if ( ! row._aSortData[idx] || customSort ) 
				cellData = customSort 
					customData[i] : // If there was a custom sort function, use data from ther
					_fnGetCellData( settings, i, idx, 'sort' )

				row._aSortData[ idx ] = formatter 
					formatter( cellData ) 
					cellData
			
		
	



	/*
	 * Save the state of a tabl
	 *  @param {object} oSettings dataTables settings objec
	 *  @memberof DataTable#oAp
	 *
	function _fnSaveState ( oSettings 
	
		if ( !oSettings.oFeatures.bStateSave || oSettings.bDestroying 
		
			return
		

		/* Store the interesting variables *
		var i, iLen
		var oState = 
			"iCreate":      new Date().getTime()
			"iStart":       oSettings._iDisplayStart
			"iLength":      oSettings._iDisplayLength
			"aaSorting":    $.extend( true, [], oSettings.aaSorting )
			"oSearch":      $.extend( true, {}, oSettings.oPreviousSearch )
			"aoSearchCols": $.extend( true, [], oSettings.aoPreSearchCols )
			"abVisCols":    [
		}

		for ( i=0, iLen=oSettings.aoColumns.length ; i<iLen ; i++ 
		
			oState.abVisCols.push( oSettings.aoColumns[i].bVisible )
		

		_fnCallbackFire( oSettings, "aoStateSaveParams", 'stateSaveParams', [oSettings, oState] )

		oSettings.fnStateSaveCallback.call( oSettings.oInstance, oSettings, oState )
	


	/*
	 * Attempt to load a saved table stat
	 *  @param {object} oSettings dataTables settings objec
	 *  @param {object} oInit DataTables init object so we can override setting
	 *  @memberof DataTable#oAp
	 *
	function _fnLoadState ( oSettings, oInit 
	
		var i, ien
		var columns = oSettings.aoColumns

		if ( !oSettings.oFeatures.bStateSave 
		
			return
		

		var oData = oSettings.fnStateLoadCallback.call( oSettings.oInstance, oSettings )
		if ( !oData 
		
			return
		

		/* Allow custom and plug-in manipulation functions to alter the saved data set an
		 * cancelling of loading by returning fals
		 *
		var abStateLoad = _fnCallbackFire( oSettings, 'aoStateLoadParams', 'stateLoadParams', [oSettings, oData] )
		if ( $.inArray( false, abStateLoad ) !== -1 
		
			return
		

		/* Reject old data *
		if ( oData.iCreate < new Date().getTime() - (oSettings.iStateDuration*1000) ) 
			return
		

		// Number of columns have changed - all bets are off, no restore of setting
		if ( columns.length !== oData.aoSearchCols.length ) 
			return
		

		/* Store the saved state so it might be accessed at any time *
		oSettings.oLoadedState = $.extend( true, {}, oData )

		/* Restore key features *
		oSettings._iDisplayStart    = oData.iStart
		oSettings.iInitDisplayStart = oData.iStart
		oSettings._iDisplayLength   = oData.iLength
		oSettings.aaSorting         = []

		var savedSort = oData.aaSorting
		for ( i=0, ien=savedSort.length ; i<ien ; i++ ) 
			oSettings.aaSorting.push( savedSort[i][0] >= columns.length 
				[ 0, savedSort[i][1] ] 
				savedSort[i
			)
		

		/* Search filtering  *
		$.extend( oSettings.oPreviousSearch, oData.oSearch )
		$.extend( true, oSettings.aoPreSearchCols, oData.aoSearchCols )

		/* Column visibility state *
		for ( i=0, ien=oData.abVisCols.length ; i<ien ; i++ ) 
			columns[i].bVisible = oData.abVisCols[i]
		

		_fnCallbackFire( oSettings, 'aoStateLoaded', 'stateLoaded', [oSettings, oData] )
	



	/*
	 * Return the settings object for a particular tabl
	 *  @param {node} table table we are using as a dataTabl
	 *  @returns {object} Settings object - or null if not foun
	 *  @memberof DataTable#oAp
	 *
	function _fnSettingsFromNode ( table 
	
		var settings = DataTable.settings
		var idx = $.inArray( table, _pluck( settings, 'nTable' ) )

		return idx !== -1 
			settings[ idx ] 
			null
	


	/*
	 * Log an error messag
	 *  @param {object} settings dataTables settings objec
	 *  @param {int} level log error messages, or display them to the use
	 *  @param {string} msg error messag
	 *  @param {int} tn Technical note id to get more information about the error
	 *  @memberof DataTable#oAp
	 *
	function _fnLog( settings, level, msg, tn 
	
		msg = 'DataTables warning: '
			(settings!==null ? 'table id='+settings.sTableId+' - ' : '')+msg

		if ( tn ) 
			msg += '. For more information about this error, please see '
			'http://datatables.net/tn/'+tn
		

		if ( ! level  ) 
			// Backwards compatibility pre 1.1
			var ext = DataTable.ext
			var type = ext.sErrMode || ext.errMode

			if ( type == 'alert' ) 
				alert( msg )
			
			else 
				throw new Error(msg)
			
		
		else if ( window.console && console.log ) 
			console.log( msg )
		
	


	/*
	 * See if a property is defined on one object, if so assign it to the other objec
	 *  @param {object} ret target objec
	 *  @param {object} src source objec
	 *  @param {string} name propert
	 *  @param {string} [mappedName] name to map too - optional, name used if not give
	 *  @memberof DataTable#oAp
	 *
	function _fnMap( ret, src, name, mappedName 
	
		if ( $.isArray( name ) ) 
			$.each( name, function (i, val) 
				if ( $.isArray( val ) ) 
					_fnMap( ret, src, val[0], val[1] )
				
				else 
					_fnMap( ret, src, val )
				
			} )

			return
		

		if ( mappedName === undefined ) 
			mappedName = name
		

		if ( src[name] !== undefined ) 
			ret[mappedName] = src[name]
		
	


	/*
	 * Extend objects - very similar to jQuery.extend, but deep copy objects, an
	 * shallow copy arrays. The reason we need to do this, is that we don't want t
	 * deep copy array init values (such as aaSorting) since the dev wouldn't b
	 * able to override them, but we do want to deep copy arrays
	 *  @param {object} out Object to exten
	 *  @param {object} extender Object from which the properties will be applied t
	 *      ou
	 *  @param {boolean} breakRefs If true, then arrays will be sliced to take a
	 *      independent copy with the exception of the `data` or `aaData` parameter
	 *      if they are present. This is so you can pass in a collection t
	 *      DataTables and have that used as your data source without breaking th
	 *      reference
	 *  @returns {object} out Reference, just for convenience - out === the return
	 *  @memberof DataTable#oAp
	 *  @todo This doesn't take account of arrays inside the deep copied objects
	 *
	function _fnExtend( out, extender, breakRefs 
	
		var val

		for ( var prop in extender ) 
			if ( extender.hasOwnProperty(prop) ) 
				val = extender[prop]

				if ( $.isPlainObject( val ) ) 
					if ( ! $.isPlainObject( out[prop] ) ) 
						out[prop] = {}
					
					$.extend( true, out[prop], val )
				
				else if ( breakRefs && prop !== 'data' && prop !== 'aaData' && $.isArray(val) ) 
					out[prop] = val.slice()
				
				else 
					out[prop] = val
				
			
		

		return out
	


	/*
	 * Bind an event handers to allow a click or return key to activate the callback
	 * This is good for accessibility since a return on the keyboard will have th
	 * same effect as a click, if the element has focus
	 *  @param {element} n Element to bind the action t
	 *  @param {object} oData Data object to pass to the triggered functio
	 *  @param {function} fn Callback function for when the event is triggere
	 *  @memberof DataTable#oAp
	 *
	function _fnBindAction( n, oData, fn 
	
		$(n
			.bind( 'click.DT', oData, function (e) 
					n.blur(); // Remove focus outline for mouse user
					fn(e)
				} 
			.bind( 'keypress.DT', oData, function (e)
				if ( e.which === 13 ) 
					fn(e)
				} } 
			.bind( 'selectstart.DT', function () 
				/* Take the brutal approach to cancelling text selection *
				return false
				} )
	


	/*
	 * Register a callback function. Easily allows a callback function to be added t
	 * an array store of callback functions that can then all be called together
	 *  @param {object} oSettings dataTables settings objec
	 *  @param {string} sStore Name of the array storage for the callbacks in oSetting
	 *  @param {function} fn Function to be called bac
	 *  @param {string} sName Identifying name for the callback (i.e. a label
	 *  @memberof DataTable#oAp
	 *
	function _fnCallbackReg( oSettings, sStore, fn, sName 
	
		if ( fn 
		
			oSettings[sStore].push( 
				"fn": fn
				"sName": sNam
			} )
		
	


	/*
	 * Fire callback functions and trigger events. Note that the loop over th
	 * callback array store is done backwards! Further note that you do not want t
	 * fire off triggers in time sensitive applications (for example cell creation
	 * as its slow
	 *  @param {object} settings dataTables settings objec
	 *  @param {string} callbackArr Name of the array storage for the callbacks i
	 *      oSetting
	 *  @param {string} event Name of the jQuery custom event to trigger. If null n
	 *      trigger is fire
	 *  @param {array} args Array of arguments to pass to the callback function 
	 *      trigge
	 *  @memberof DataTable#oAp
	 *
	function _fnCallbackFire( settings, callbackArr, event, args 
	
		var ret = []

		if ( callbackArr ) 
			ret = $.map( settings[callbackArr].slice().reverse(), function (val, i) 
				return val.fn.apply( settings.oInstance, args )
			} )
		

		if ( event !== null ) 
			$(settings.nTable).trigger( event+'.dt', args )
		

		return ret
	


	function _fnLengthOverflow ( settings 
	
		va
			start = settings._iDisplayStart
			end = settings.fnDisplayEnd()
			len = settings._iDisplayLength

		/* If we have space to show extra rows (backing up from the end point - then do so *
		if ( end === settings.fnRecordsDisplay() 
		
			start = end - len
		

		if ( len === -1 || start < 0 
		
			start = 0
		

		settings._iDisplayStart = start
	


	function _fnRenderer( settings, type 
	
		var renderer = settings.renderer
		var host = DataTable.ext.renderer[type]

		if ( $.isPlainObject( renderer ) && renderer[type] ) 
			// Specific renderer for this type. If available use it, otherwise us
			// the default
			return host[renderer[type]] || host._
		
		else if ( typeof renderer === 'string' ) 
			// Common renderer - if there is one available for this type use it
			// otherwise use the defaul
			return host[renderer] || host._
		

		// Use the defaul
		return host._
	


	/*
	 * Detect the data source being used for the table. Used to simplify the cod
	 * a little (ajax) and to make it compress a little smaller
	 
	 *  @param {object} settings dataTables settings objec
	 *  @returns {string} Data sourc
	 *  @memberof DataTable#oAp
	 *
	function _fnDataSource ( settings 
	
		if ( settings.oFeatures.bServerSide ) 
			return 'ssp'
		
		else if ( settings.ajax || settings.sAjaxSource ) 
			return 'ajax'
		
		return 'dom'
	


	DataTable = function( options 
	
		/*
		 * Perform a jQuery selector action on the table's TR elements (from the tbody) an
		 * return the resulting jQuery object
		 *  @param {string|node|jQuery} sSelector jQuery selector or node collection to act o
		 *  @param {object} [oOpts] Optional parameters for modifying the rows to be include
		 *  @param {string} [oOpts.filter=none] Select TR elements that meet the current filte
		 *    criterion ("applied") or all TR elements (i.e. no filter)
		 *  @param {string} [oOpts.order=current] Order of the TR elements in the processed array
		 *    Can be either 'current', whereby the current sorting of the table is used, o
		 *    'original' whereby the original order the data was read into the table is used
		 *  @param {string} [oOpts.page=all] Limit the selection to the currently displayed pag
		 *    ("current") or not ("all"). If 'current' is given, then order is assumed to b
		 *    'current' and filter is 'applied', regardless of what they might be given as
		 *  @returns {object} jQuery object, filtered by the given selector
		 *  @dtopt AP
		 *  @deprecated Since v1.1
		 
		 *  @exampl
		 *    $(document).ready(function() 
		 *      var oTable = $('#example').dataTable()
		 
		 *      // Highlight every second ro
		 *      oTable.$('tr:odd').css('backgroundColor', 'blue')
		 *    } )
		 
		 *  @exampl
		 *    $(document).ready(function() 
		 *      var oTable = $('#example').dataTable()
		 
		 *      // Filter to rows with 'Webkit' in them, add a background colour and the
		 *      // remove the filter, thus highlighting the 'Webkit' rows only
		 *      oTable.fnFilter('Webkit')
		 *      oTable.$('tr', {"search": "applied"}).css('backgroundColor', 'blue')
		 *      oTable.fnFilter('')
		 *    } )
		 *
		this.$ = function ( sSelector, oOpts 
		
			return this.api(true).$( sSelector, oOpts )
		}
	
	
		/*
		 * Almost identical to $ in operation, but in this case returns the data for the matche
		 * rows - as such, the jQuery selector used should match TR row nodes or TD/TH cell node
		 * rather than any descendants, so the data can be obtained for the row/cell. If matchin
		 * rows are found, the data returned is the original data array/object that was used t
		 * create the row (or a generated array if from a DOM source)
		 
		 * This method is often useful in-combination with $ where both functions are given th
		 * same parameters and the array indexes will match identically
		 *  @param {string|node|jQuery} sSelector jQuery selector or node collection to act o
		 *  @param {object} [oOpts] Optional parameters for modifying the rows to be include
		 *  @param {string} [oOpts.filter=none] Select elements that meet the current filte
		 *    criterion ("applied") or all elements (i.e. no filter)
		 *  @param {string} [oOpts.order=current] Order of the data in the processed array
		 *    Can be either 'current', whereby the current sorting of the table is used, o
		 *    'original' whereby the original order the data was read into the table is used
		 *  @param {string} [oOpts.page=all] Limit the selection to the currently displayed pag
		 *    ("current") or not ("all"). If 'current' is given, then order is assumed to b
		 *    'current' and filter is 'applied', regardless of what they might be given as
		 *  @returns {array} Data for the matched elements. If any elements, as a result of th
		 *    selector, were not TR, TD or TH elements in the DataTable, they will have a nul
		 *    entry in the array
		 *  @dtopt AP
		 *  @deprecated Since v1.1
		 
		 *  @exampl
		 *    $(document).ready(function() 
		 *      var oTable = $('#example').dataTable()
		 
		 *      // Get the data from the first row in the tabl
		 *      var data = oTable._('tr:first')
		 
		 *      // Do something useful with the dat
		 *      alert( "First cell is: "+data[0] )
		 *    } )
		 
		 *  @exampl
		 *    $(document).ready(function() 
		 *      var oTable = $('#example').dataTable()
		 
		 *      // Filter to 'Webkit' and get all data fo
		 *      oTable.fnFilter('Webkit')
		 *      var data = oTable._('tr', {"search": "applied"})
		 
		 *      // Do something with the dat
		 *      alert( data.length+" rows matched the search" )
		 *    } )
		 *
		this._ = function ( sSelector, oOpts 
		
			return this.api(true).rows( sSelector, oOpts ).data()
		}
	
	
		/*
		 * Create a DataTables Api instance, with the currently selected tables fo
		 * the Api's context
		 * @param {boolean} [traditional=false] Set the API instance's context to b
		 *   only the table referred to by the `DataTable.ext.iApiIndex` option, as wa
		 *   used in the API presented by DataTables 1.9- (i.e. the traditional mode)
		 *   or if all tables captured in the jQuery object should be used
		 * @return {DataTables.Api
		 *
		this.api = function ( traditional 
		
			return traditional 
				new _Api
					_fnSettingsFromNode( this[ _ext.iApiIndex ] 
				) 
				new _Api( this )
		}
	
	
		/*
		 * Add a single new row or multiple rows of data to the table. Please not
		 * that this is suitable for client-side processing only - if you are usin
		 * server-side processing (i.e. "bServerSide": true), then to add data, yo
		 * must add it to the data source, i.e. the server-side, through an Ajax call
		 *  @param {array|object} data The data to be added to the table. This can be
		 *    <ul
		 *      <li>1D array of data - add a single row with the data provided</li
		 *      <li>2D array of arrays - add multiple rows in a single call</li
		 *      <li>object - data object when using <i>mData</i></li
		 *      <li>array of objects - multiple data objects when using <i>mData</i></li
		 *    </ul
		 *  @param {bool} [redraw=true] redraw the table or no
		 *  @returns {array} An array of integers, representing the list of indexes i
		 *    <i>aoData</i> ({@link DataTable.models.oSettings}) that have been added t
		 *    the table
		 *  @dtopt AP
		 *  @deprecated Since v1.1
		 
		 *  @exampl
		 *    // Global var for counte
		 *    var giCount = 2
		 
		 *    $(document).ready(function() 
		 *      $('#example').dataTable()
		 *    } )
		 
		 *    function fnClickAddRow() 
		 *      $('#example').dataTable().fnAddData( 
		 *        giCount+".1"
		 *        giCount+".2"
		 *        giCount+".3"
		 *        giCount+".4" 
		 *      )
		 
		 *      giCount++
		 *    
		 *
		this.fnAddData = function( data, redraw 
		
			var api = this.api( true )
	
			/* Check if we want to add multiple rows or not *
			var rows = $.isArray(data) && ( $.isArray(data[0]) || $.isPlainObject(data[0]) ) 
				api.rows.add( data ) 
				api.row.add( data )
	
			if ( redraw === undefined || redraw ) 
				api.draw()
			
	
			return rows.flatten().toArray()
		}
	
	
		/*
		 * This function will make DataTables recalculate the column sizes, based on the dat
		 * contained in the table and the sizes applied to the columns (in the DOM, CSS o
		 * through the sWidth parameter). This can be useful when the width of the table'
		 * parent element changes (for example a window resize)
		 *  @param {boolean} [bRedraw=true] Redraw the table or not, you will typically want t
		 *  @dtopt AP
		 *  @deprecated Since v1.1
		 
		 *  @exampl
		 *    $(document).ready(function() 
		 *      var oTable = $('#example').dataTable( 
		 *        "sScrollY": "200px"
		 *        "bPaginate": fals
		 *      } )
		 
		 *      $(window).bind('resize', function () 
		 *        oTable.fnAdjustColumnSizing()
		 *      } )
		 *    } )
		 *
		this.fnAdjustColumnSizing = function ( bRedraw 
		
			var api = this.api( true ).columns.adjust()
			var settings = api.settings()[0]
			var scroll = settings.oScroll
	
			if ( bRedraw === undefined || bRedraw ) 
				api.draw( false )
			
			else if ( scroll.sX !== "" || scroll.sY !== "" ) 
				/* If not redrawing, but scrolling, we want to apply the new column sizes anyway *
				_fnScrollDraw( settings )
			
		}
	
	
		/*
		 * Quickly and simply clear a tabl
		 *  @param {bool} [bRedraw=true] redraw the table or no
		 *  @dtopt AP
		 *  @deprecated Since v1.1
		 
		 *  @exampl
		 *    $(document).ready(function() 
		 *      var oTable = $('#example').dataTable()
		 
		 *      // Immediately 'nuke' the current rows (perhaps waiting for an Ajax callback...
		 *      oTable.fnClearTable()
		 *    } )
		 *
		this.fnClearTable = function( bRedraw 
		
			var api = this.api( true ).clear()
	
			if ( bRedraw === undefined || bRedraw ) 
				api.draw()
			
		}
	
	
		/*
		 * The exact opposite of 'opening' a row, this function will close any rows whic
		 * are currently 'open'
		 *  @param {node} nTr the table row to 'close
		 *  @returns {int} 0 on success, or 1 if failed (can't find the row
		 *  @dtopt AP
		 *  @deprecated Since v1.1
		 
		 *  @exampl
		 *    $(document).ready(function() 
		 *      var oTable
		 
		 *      // 'open' an information row when a row is clicked o
		 *      $('#example tbody tr').click( function () 
		 *        if ( oTable.fnIsOpen(this) ) 
		 *          oTable.fnClose( this )
		 *        } else 
		 *          oTable.fnOpen( this, "Temporary row opened", "info_row" )
		 *        
		 *      } )
		 
		 *      oTable = $('#example').dataTable()
		 *    } )
		 *
		this.fnClose = function( nTr 
		
			this.api( true ).row( nTr ).child.hide()
		}
	
	
		/*
		 * Remove a row for the tabl
		 *  @param {mixed} target The index of the row from aoData to be deleted, o
		 *    the TR element you want to delet
		 *  @param {function|null} [callBack] Callback functio
		 *  @param {bool} [redraw=true] Redraw the table or no
		 *  @returns {array} The row that was delete
		 *  @dtopt AP
		 *  @deprecated Since v1.1
		 
		 *  @exampl
		 *    $(document).ready(function() 
		 *      var oTable = $('#example').dataTable()
		 
		 *      // Immediately remove the first ro
		 *      oTable.fnDeleteRow( 0 )
		 *    } )
		 *
		this.fnDeleteRow = function( target, callback, redraw 
		
			var api = this.api( true )
			var rows = api.rows( target )
			var settings = rows.settings()[0]
			var data = settings.aoData[ rows[0][0] ]
	
			rows.remove()
	
			if ( callback ) 
				callback.call( this, settings, data )
			
	
			if ( redraw === undefined || redraw ) 
				api.draw()
			
	
			return data
		}
	
	
		/*
		 * Restore the table to it's original state in the DOM by removing all of DataTable
		 * enhancements, alterations to the DOM structure of the table and event listeners
		 *  @param {boolean} [remove=false] Completely remove the table from the DO
		 *  @dtopt AP
		 *  @deprecated Since v1.1
		 
		 *  @exampl
		 *    $(document).ready(function() 
		 *      // This example is fairly pointless in reality, but shows how fnDestroy can be use
		 *      var oTable = $('#example').dataTable()
		 *      oTable.fnDestroy()
		 *    } )
		 *
		this.fnDestroy = function ( remove 
		
			this.api( true ).destroy( remove )
		}
	
	
		/*
		 * Redraw the tabl
		 *  @param {bool} [complete=true] Re-filter and resort (if enabled) the table before the draw
		 *  @dtopt AP
		 *  @deprecated Since v1.1
		 
		 *  @exampl
		 *    $(document).ready(function() 
		 *      var oTable = $('#example').dataTable()
		 
		 *      // Re-draw the table - you wouldn't want to do it here, but it's an example :-
		 *      oTable.fnDraw()
		 *    } )
		 *
		this.fnDraw = function( complete 
		
			// Note that this isn't an exact match to the old call to _fnDraw - it take
			// into account the new data, but can old position
			this.api( true ).draw( ! complete )
		}
	
	
		/*
		 * Filter the input based on dat
		 *  @param {string} sInput String to filter the table o
		 *  @param {int|null} [iColumn] Column to limit filtering t
		 *  @param {bool} [bRegex=false] Treat as regular expression or no
		 *  @param {bool} [bSmart=true] Perform smart filtering or no
		 *  @param {bool} [bShowGlobal=true] Show the input global filter in it's input box(es
		 *  @param {bool} [bCaseInsensitive=true] Do case-insensitive matching (true) or not (false
		 *  @dtopt AP
		 *  @deprecated Since v1.1
		 
		 *  @exampl
		 *    $(document).ready(function() 
		 *      var oTable = $('#example').dataTable()
		 
		 *      // Sometime later - filter..
		 *      oTable.fnFilter( 'test string' )
		 *    } )
		 *
		this.fnFilter = function( sInput, iColumn, bRegex, bSmart, bShowGlobal, bCaseInsensitive 
		
			var api = this.api( true )
	
			if ( iColumn === null || iColumn === undefined ) 
				api.search( sInput, bRegex, bSmart, bCaseInsensitive )
			
			else 
				api.column( iColumn ).search( sInput, bRegex, bSmart, bCaseInsensitive )
			
	
			api.draw()
		}
	
	
		/*
		 * Get the data for the whole table, an individual row or an individual cell based on th
		 * provided parameters
		 *  @param {int|node} [src] A TR row node, TD/TH cell node or an integer. If given a
		 *    a TR node then the data source for the whole row will be returned. If given as 
		 *    TD/TH cell node then iCol will be automatically calculated and the data for th
		 *    cell returned. If given as an integer, then this is treated as the aoData interna
		 *    data index for the row (see fnGetPosition) and the data for that row used
		 *  @param {int} [col] Optional column index that you want the data of
		 *  @returns {array|object|string} If mRow is undefined, then the data for all rows i
		 *    returned. If mRow is defined, just data for that row, and is iCol i
		 *    defined, only data for the designated cell is returned
		 *  @dtopt AP
		 *  @deprecated Since v1.1
		 
		 *  @exampl
		 *    // Row dat
		 *    $(document).ready(function() 
		 *      oTable = $('#example').dataTable()
		 
		 *      oTable.$('tr').click( function () 
		 *        var data = oTable.fnGetData( this )
		 *        // ... do something with the array / object of data for the ro
		 *      } )
		 *    } )
		 
		 *  @exampl
		 *    // Individual cell dat
		 *    $(document).ready(function() 
		 *      oTable = $('#example').dataTable()
		 
		 *      oTable.$('td').click( function () 
		 *        var sData = oTable.fnGetData( this )
		 *        alert( 'The cell clicked on had the value of '+sData )
		 *      } )
		 *    } )
		 *
		this.fnGetData = function( src, col 
		
			var api = this.api( true )
	
			if ( src !== undefined ) 
				var type = src.nodeName ? src.nodeName.toLowerCase() : ''
	
				return col !== undefined || type == 'td' || type == 'th' 
					api.cell( src, col ).data() 
					api.row( src ).data()
			
	
			return api.data().toArray()
		}
	
	
		/*
		 * Get an array of the TR nodes that are used in the table's body. Note that you wil
		 * typically want to use the '$' API method in preference to this as it is mor
		 * flexible
		 *  @param {int} [iRow] Optional row index for the TR element you wan
		 *  @returns {array|node} If iRow is undefined, returns an array of all TR element
		 *    in the table's body, or iRow is defined, just the TR element requested
		 *  @dtopt AP
		 *  @deprecated Since v1.1
		 
		 *  @exampl
		 *    $(document).ready(function() 
		 *      var oTable = $('#example').dataTable()
		 
		 *      // Get the nodes from the tabl
		 *      var nNodes = oTable.fnGetNodes( )
		 *    } )
		 *
		this.fnGetNodes = function( iRow 
		
			var api = this.api( true )
	
			return iRow !== undefined 
				api.row( iRow ).node() 
				api.rows().nodes().toArray()
		}
	
	
		/*
		 * Get the array indexes of a particular cell from it's DOM elemen
		 * and column index including hidden column
		 *  @param {node} node this can either be a TR, TD or TH in the table's bod
		 *  @returns {int} If nNode is given as a TR, then a single index is returned, o
		 *    if given as a cell, an array of [row index, column index (visible)
		 *    column index (all)] is given
		 *  @dtopt AP
		 *  @deprecated Since v1.1
		 
		 *  @exampl
		 *    $(document).ready(function() 
		 *      $('#example tbody td').click( function () 
		 *        // Get the position of the current data from the nod
		 *        var aPos = oTable.fnGetPosition( this )
		 
		 *        // Get the data array for this ro
		 *        var aData = oTable.fnGetData( aPos[0] )
		 
		 *        // Update the data array and return the valu
		 *        aData[ aPos[1] ] = 'clicked'
		 *        this.innerHTML = 'clicked'
		 *      } )
		 
		 *      // Init DataTable
		 *      oTable = $('#example').dataTable()
		 *    } )
		 *
		this.fnGetPosition = function( node 
		
			var api = this.api( true )
			var nodeName = node.nodeName.toUpperCase()
	
			if ( nodeName == 'TR' ) 
				return api.row( node ).index()
			
			else if ( nodeName == 'TD' || nodeName == 'TH' ) 
				var cell = api.cell( node ).index()
	
				return 
					cell.row
					cell.columnVisible
					cell.colum
				]
			
			return null
		}
	
	
		/*
		 * Check to see if a row is 'open' or not
		 *  @param {node} nTr the table row to chec
		 *  @returns {boolean} true if the row is currently open, false otherwis
		 *  @dtopt AP
		 *  @deprecated Since v1.1
		 
		 *  @exampl
		 *    $(document).ready(function() 
		 *      var oTable
		 
		 *      // 'open' an information row when a row is clicked o
		 *      $('#example tbody tr').click( function () 
		 *        if ( oTable.fnIsOpen(this) ) 
		 *          oTable.fnClose( this )
		 *        } else 
		 *          oTable.fnOpen( this, "Temporary row opened", "info_row" )
		 *        
		 *      } )
		 
		 *      oTable = $('#example').dataTable()
		 *    } )
		 *
		this.fnIsOpen = function( nTr 
		
			return this.api( true ).row( nTr ).child.isShown()
		}
	
	
		/*
		 * This function will place a new row directly after a row which is currentl
		 * on display on the page, with the HTML contents that is passed into th
		 * function. This can be used, for example, to ask for confirmation that 
		 * particular record should be deleted
		 *  @param {node} nTr The table row to 'open
		 *  @param {string|node|jQuery} mHtml The HTML to put into the ro
		 *  @param {string} sClass Class to give the new TD cel
		 *  @returns {node} The row opened. Note that if the table row passed in as th
		 *    first parameter, is not found in the table, this method will silentl
		 *    return
		 *  @dtopt AP
		 *  @deprecated Since v1.1
		 
		 *  @exampl
		 *    $(document).ready(function() 
		 *      var oTable
		 
		 *      // 'open' an information row when a row is clicked o
		 *      $('#example tbody tr').click( function () 
		 *        if ( oTable.fnIsOpen(this) ) 
		 *          oTable.fnClose( this )
		 *        } else 
		 *          oTable.fnOpen( this, "Temporary row opened", "info_row" )
		 *        
		 *      } )
		 
		 *      oTable = $('#example').dataTable()
		 *    } )
		 *
		this.fnOpen = function( nTr, mHtml, sClass 
		
			return this.api( true ).row( nTr ).child( mHtml, sClass ).show()
		}
	
	
		/*
		 * Change the pagination - provides the internal logic for pagination in a simple AP
		 * function. With this function you can have a DataTables table go to the next
		 * previous, first or last pages
		 *  @param {string|int} mAction Paging action to take: "first", "previous", "next" or "last
		 *    or page number to jump to (integer), note that page 0 is the first page
		 *  @param {bool} [bRedraw=true] Redraw the table or no
		 *  @dtopt AP
		 *  @deprecated Since v1.1
		 
		 *  @exampl
		 *    $(document).ready(function() 
		 *      var oTable = $('#example').dataTable()
		 *      oTable.fnPageChange( 'next' )
		 *    } )
		 *
		this.fnPageChange = function ( mAction, bRedraw 
		
			var api = this.api( true ).page( mAction )
	
			if ( bRedraw === undefined || bRedraw ) 
				api.draw(false)
			
		}
	
	
		/*
		 * Show a particular colum
		 *  @param {int} iCol The column whose display should be change
		 *  @param {bool} bShow Show (true) or hide (false) the colum
		 *  @param {bool} [bRedraw=true] Redraw the table or no
		 *  @dtopt AP
		 *  @deprecated Since v1.1
		 
		 *  @exampl
		 *    $(document).ready(function() 
		 *      var oTable = $('#example').dataTable()
		 
		 *      // Hide the second column after initialisatio
		 *      oTable.fnSetColumnVis( 1, false )
		 *    } )
		 *
		this.fnSetColumnVis = function ( iCol, bShow, bRedraw 
		
			var api = this.api( true ).column( iCol ).visible( bShow )
	
			if ( bRedraw === undefined || bRedraw ) 
				api.columns.adjust().draw()
			
		}
	
	
		/*
		 * Get the settings for a particular table for external manipulatio
		 *  @returns {object} DataTables settings object. Se
		 *    {@link DataTable.models.oSettings
		 *  @dtopt AP
		 *  @deprecated Since v1.1
		 
		 *  @exampl
		 *    $(document).ready(function() 
		 *      var oTable = $('#example').dataTable()
		 *      var oSettings = oTable.fnSettings()
		 
		 *      // Show an example parameter from the setting
		 *      alert( oSettings._iDisplayStart )
		 *    } )
		 *
		this.fnSettings = function(
		
			return _fnSettingsFromNode( this[_ext.iApiIndex] )
		}
	
	
		/*
		 * Sort the table by a particular colum
		 *  @param {int} iCol the data index to sort on. Note that this will not match th
		 *    'display index' if you have hidden data entrie
		 *  @dtopt AP
		 *  @deprecated Since v1.1
		 
		 *  @exampl
		 *    $(document).ready(function() 
		 *      var oTable = $('#example').dataTable()
		 
		 *      // Sort immediately with columns 0 and 
		 *      oTable.fnSort( [ [0,'asc'], [1,'asc'] ] )
		 *    } )
		 *
		this.fnSort = function( aaSort 
		
			this.api( true ).order( aaSort ).draw()
		}
	
	
		/*
		 * Attach a sort listener to an element for a given colum
		 *  @param {node} nNode the element to attach the sort listener t
		 *  @param {int} iColumn the column that a click on this node will sort o
		 *  @param {function} [fnCallback] callback function when sort is ru
		 *  @dtopt AP
		 *  @deprecated Since v1.1
		 
		 *  @exampl
		 *    $(document).ready(function() 
		 *      var oTable = $('#example').dataTable()
		 
		 *      // Sort on column 1, when 'sorter' is clicked o
		 *      oTable.fnSortListener( document.getElementById('sorter'), 1 )
		 *    } )
		 *
		this.fnSortListener = function( nNode, iColumn, fnCallback 
		
			this.api( true ).order.listener( nNode, iColumn, fnCallback )
		}
	
	
		/*
		 * Update a table cell or row - this method will accept either a single value t
		 * update the cell with, an array of values with one element for each column o
		 * an object in the same format as the original data source. The function i
		 * self-referencing in order to make the multi column updates easier
		 *  @param {object|array|string} mData Data to update the cell/row wit
		 *  @param {node|int} mRow TR element you want to update or the aoData inde
		 *  @param {int} [iColumn] The column to update, give as null or undefined t
		 *    update a whole row
		 *  @param {bool} [bRedraw=true] Redraw the table or no
		 *  @param {bool} [bAction=true] Perform pre-draw actions or no
		 *  @returns {int} 0 on success, 1 on erro
		 *  @dtopt AP
		 *  @deprecated Since v1.1
		 
		 *  @exampl
		 *    $(document).ready(function() 
		 *      var oTable = $('#example').dataTable()
		 *      oTable.fnUpdate( 'Example update', 0, 0 ); // Single cel
		 *      oTable.fnUpdate( ['a', 'b', 'c', 'd', 'e'], $('tbody tr')[0] ); // Ro
		 *    } )
		 *
		this.fnUpdate = function( mData, mRow, iColumn, bRedraw, bAction 
		
			var api = this.api( true )
	
			if ( iColumn === undefined || iColumn === null ) 
				api.row( mRow ).data( mData )
			
			else 
				api.cell( mRow, iColumn ).data( mData )
			
	
			if ( bAction === undefined || bAction ) 
				api.columns.adjust()
			
	
			if ( bRedraw === undefined || bRedraw ) 
				api.draw()
			
			return 0
		}
	
	
		/*
		 * Provide a common method for plug-ins to check the version of DataTables being used, in orde
		 * to ensure compatibility
		 *  @param {string} sVersion Version string to check for, in the format "X.Y.Z". Note that th
		 *    formats "X" and "X.Y" are also acceptable
		 *  @returns {boolean} true if this version of DataTables is greater or equal to the require
		 *    version, or false if this version of DataTales is not suitabl
		 *  @metho
		 *  @dtopt AP
		 *  @deprecated Since v1.1
		 
		 *  @exampl
		 *    $(document).ready(function() 
		 *      var oTable = $('#example').dataTable()
		 *      alert( oTable.fnVersionCheck( '1.9.0' ) )
		 *    } )
		 *
		this.fnVersionCheck = _ext.fnVersionCheck
	
	
		/
		 * This is really a good bit rubbish this method of exposing the internal method
		 * publicly... - To be fixed in 2.0 using methods on the prototyp
		 *
	
	
		/*
		 * Create a wrapper function for exporting an internal functions to an external API
		 *  @param {string} fn API function nam
		 *  @returns {function} wrapped functio
		 *  @memberof DataTable#interna
		 *
		function _fnExternApiFunc (fn
		
			return function() 
				var args = [_fnSettingsFromNode( this[DataTable.ext.iApiIndex] )].concat
					Array.prototype.slice.call(arguments
				)
				return DataTable.ext.internal[fn].apply( this, args )
			}
		
	
	
		/*
		 * Reference to internal functions for use by plug-in developers. Note tha
		 * these methods are references to internal functions and are considered to b
		 * private. If you use these methods, be aware that they are liable to chang
		 * between versions
		 *  @namespac
		 *
		this.oApi = this.internal = 
			_fnExternApiFunc: _fnExternApiFunc
			_fnBuildAjax: _fnBuildAjax
			_fnAjaxUpdate: _fnAjaxUpdate
			_fnAjaxParameters: _fnAjaxParameters
			_fnAjaxUpdateDraw: _fnAjaxUpdateDraw
			_fnAjaxDataSrc: _fnAjaxDataSrc
			_fnAddColumn: _fnAddColumn
			_fnColumnOptions: _fnColumnOptions
			_fnAdjustColumnSizing: _fnAdjustColumnSizing
			_fnVisibleToColumnIndex: _fnVisibleToColumnIndex
			_fnColumnIndexToVisible: _fnColumnIndexToVisible
			_fnVisbleColumns: _fnVisbleColumns
			_fnGetColumns: _fnGetColumns
			_fnColumnTypes: _fnColumnTypes
			_fnApplyColumnDefs: _fnApplyColumnDefs
			_fnHungarianMap: _fnHungarianMap
			_fnCamelToHungarian: _fnCamelToHungarian
			_fnLanguageCompat: _fnLanguageCompat
			_fnBrowserDetect: _fnBrowserDetect
			_fnAddData: _fnAddData
			_fnAddTr: _fnAddTr
			_fnNodeToDataIndex: _fnNodeToDataIndex
			_fnNodeToColumnIndex: _fnNodeToColumnIndex
			_fnGetRowData: _fnGetRowData
			_fnGetCellData: _fnGetCellData
			_fnSetCellData: _fnSetCellData
			_fnSplitObjNotation: _fnSplitObjNotation
			_fnGetObjectDataFn: _fnGetObjectDataFn
			_fnSetObjectDataFn: _fnSetObjectDataFn
			_fnGetDataMaster: _fnGetDataMaster
			_fnClearTable: _fnClearTable
			_fnDeleteIndex: _fnDeleteIndex
			_fnInvalidateRow: _fnInvalidateRow
			_fnGetRowElements: _fnGetRowElements
			_fnCreateTr: _fnCreateTr
			_fnBuildHead: _fnBuildHead
			_fnDrawHead: _fnDrawHead
			_fnDraw: _fnDraw
			_fnReDraw: _fnReDraw
			_fnAddOptionsHtml: _fnAddOptionsHtml
			_fnDetectHeader: _fnDetectHeader
			_fnGetUniqueThs: _fnGetUniqueThs
			_fnFeatureHtmlFilter: _fnFeatureHtmlFilter
			_fnFilterComplete: _fnFilterComplete
			_fnFilterCustom: _fnFilterCustom
			_fnFilterColumn: _fnFilterColumn
			_fnFilter: _fnFilter
			_fnFilterCreateSearch: _fnFilterCreateSearch
			_fnEscapeRegex: _fnEscapeRegex
			_fnFilterData: _fnFilterData
			_fnFeatureHtmlInfo: _fnFeatureHtmlInfo
			_fnUpdateInfo: _fnUpdateInfo
			_fnInfoMacros: _fnInfoMacros
			_fnInitialise: _fnInitialise
			_fnInitComplete: _fnInitComplete
			_fnLengthChange: _fnLengthChange
			_fnFeatureHtmlLength: _fnFeatureHtmlLength
			_fnFeatureHtmlPaginate: _fnFeatureHtmlPaginate
			_fnPageChange: _fnPageChange
			_fnFeatureHtmlProcessing: _fnFeatureHtmlProcessing
			_fnProcessingDisplay: _fnProcessingDisplay
			_fnFeatureHtmlTable: _fnFeatureHtmlTable
			_fnScrollDraw: _fnScrollDraw
			_fnApplyToChildren: _fnApplyToChildren
			_fnCalculateColumnWidths: _fnCalculateColumnWidths
			_fnThrottle: _fnThrottle
			_fnConvertToWidth: _fnConvertToWidth
			_fnScrollingWidthAdjust: _fnScrollingWidthAdjust
			_fnGetWidestNode: _fnGetWidestNode
			_fnGetMaxLenString: _fnGetMaxLenString
			_fnStringToCss: _fnStringToCss
			_fnScrollBarWidth: _fnScrollBarWidth
			_fnSortFlatten: _fnSortFlatten
			_fnSort: _fnSort
			_fnSortAria: _fnSortAria
			_fnSortListener: _fnSortListener
			_fnSortAttachListener: _fnSortAttachListener
			_fnSortingClasses: _fnSortingClasses
			_fnSortData: _fnSortData
			_fnSaveState: _fnSaveState
			_fnLoadState: _fnLoadState
			_fnSettingsFromNode: _fnSettingsFromNode
			_fnLog: _fnLog
			_fnMap: _fnMap
			_fnBindAction: _fnBindAction
			_fnCallbackReg: _fnCallbackReg
			_fnCallbackFire: _fnCallbackFire
			_fnLengthOverflow: _fnLengthOverflow
			_fnRenderer: _fnRenderer
			_fnDataSource: _fnDataSource
			_fnRowAttributes: _fnRowAttributes
			_fnCalculateEnd: function () {} // Used by a lot of plug-ins, but redundan
			                                // in 1.10, so this dead-end function i
			                                // added to prevent error
		}
	
		$.extend( DataTable.ext.internal, this.internal )
	
		for ( var fn in DataTable.ext.internal ) 
			if ( fn ) 
				this[fn] = _fnExternApiFunc(fn)
			
		
	

		var _that = this
		var emptyInit = options === undefined
		var len = this.length

		if ( emptyInit ) 
			options = {}
		

		this.each(function() 
			// For each initialisation we want to give it a clean initialisatio
			// object that can be bashed aroun
			var o = {}
			var oInit = len > 1 ? // optimisation for single table cas
				_fnExtend( o, options, true ) 
				options

			/*global oInit,_that,emptyInit*
			var i=0, iLen, j, jLen, k, kLen
			var sId = this.getAttribute( 'id' )
			var bInitHandedOff = false
			var defaults = DataTable.defaults
		
		
			/* Sanity check *
			if ( this.nodeName.toLowerCase() != 'table' 
			
				_fnLog( null, 0, 'Non-table node initialisation ('+this.nodeName+')', 2 )
				return
			
		
			/* Backwards compatibility for the defaults *
			_fnCompatOpts( defaults )
			_fnCompatCols( defaults.column )
		
			/* Convert the camel-case defaults to Hungarian *
			_fnCamelToHungarian( defaults, defaults, true )
			_fnCamelToHungarian( defaults.column, defaults.column, true )
		
			/* Setting up the initialisation object *
			_fnCamelToHungarian( defaults, oInit )
		
			/* Check to see if we are re-initialising a table *
			var allSettings = DataTable.settings
			for ( i=0, iLen=allSettings.length ; i<iLen ; i++ 
			
				/* Base check on table node *
				if ( allSettings[i].nTable == this 
				
					var bRetrieve = oInit.bRetrieve !== undefined ? oInit.bRetrieve : defaults.bRetrieve
					var bDestroy = oInit.bDestroy !== undefined ? oInit.bDestroy : defaults.bDestroy
		
					if ( emptyInit || bRetrieve 
					
						return allSettings[i].oInstance
					
					else if ( bDestroy 
					
						allSettings[i].oInstance.fnDestroy()
						break
					
					els
					
						_fnLog( allSettings[i], 0, 'Cannot reinitialise DataTable', 3 )
						return
					
				
		
				/* If the element we are initialising has the same ID as a table which was previousl
				 * initialised, but the table nodes don't match (from before) then we destroy the ol
				 * instance by simply deleting it. This is under the assumption that the table has bee
				 * destroyed by other methods. Anyone using non-id selectors will need to do this manuall
				 *
				if ( allSettings[i].sTableId == this.id 
				
					allSettings.splice( i, 1 )
					break
				
			
		
			/* Ensure the table has an ID - required for accessibility *
			if ( sId === null || sId === "" 
			
				sId = "DataTables_Table_"+(DataTable.ext._unique++)
				this.id = sId
			
		
			/* Create the settings object for this table and set some of the default parameters *
			var oSettings = $.extend( true, {}, DataTable.models.oSettings, 
				"nTable":        this
				"oApi":          _that.internal
				"oInit":         oInit
				"sDestroyWidth": $(this)[0].style.width
				"sInstance":     sId
				"sTableId":      sI
			} )
			allSettings.push( oSettings )
		
			// Need to add the instance after the instance after the settings object has been adde
			// to the settings array, so we can self reference the table instance if more than on
			oSettings.oInstance = (_that.length===1) ? _that : $(this).dataTable()
		
			// Backwards compatibility, before we apply all the default
			_fnCompatOpts( oInit )
		
			if ( oInit.oLanguage 
			
				_fnLanguageCompat( oInit.oLanguage )
			
		
			// If the length menu is given, but the init display length is not, use the length men
			if ( oInit.aLengthMenu && ! oInit.iDisplayLength 
			
				oInit.iDisplayLength = $.isArray( oInit.aLengthMenu[0] ) 
					oInit.aLengthMenu[0][0] : oInit.aLengthMenu[0]
			
		
			// Apply the defaults and init options to make a single init object will al
			// options defined from defaults and instance options
			oInit = _fnExtend( $.extend( true, {}, defaults ), oInit )
		
		
			// Map the initialisation options onto the settings objec
			_fnMap( oSettings.oFeatures, oInit, 
				"bPaginate"
				"bLengthChange"
				"bFilter"
				"bSort"
				"bSortMulti"
				"bInfo"
				"bProcessing"
				"bAutoWidth"
				"bSortClasses"
				"bServerSide"
				"bDeferRender
			] )
			_fnMap( oSettings, oInit, 
				"asStripeClasses"
				"ajax"
				"fnServerData"
				"fnFormatNumber"
				"sServerMethod"
				"aaSorting"
				"aaSortingFixed"
				"aLengthMenu"
				"sPaginationType"
				"sAjaxSource"
				"sAjaxDataProp"
				"iStateDuration"
				"sDom"
				"bSortCellsTop"
				"iTabIndex"
				"fnStateLoadCallback"
				"fnStateSaveCallback"
				"renderer"
				[ "iCookieDuration", "iStateDuration" ], // backwards compa
				[ "oSearch", "oPreviousSearch" ]
				[ "aoSearchCols", "aoPreSearchCols" ]
				[ "iDisplayLength", "_iDisplayLength" ]
				[ "bJQueryUI", "bJUI" 
			] )
			_fnMap( oSettings.oScroll, oInit, 
				[ "sScrollX", "sX" ]
				[ "sScrollXInner", "sXInner" ]
				[ "sScrollY", "sY" ]
				[ "bScrollCollapse", "bCollapse" 
			] )
			_fnMap( oSettings.oLanguage, oInit, "fnInfoCallback" )
		
			/* Callback functions which are array driven *
			_fnCallbackReg( oSettings, 'aoDrawCallback',       oInit.fnDrawCallback,      'user' )
			_fnCallbackReg( oSettings, 'aoServerParams',       oInit.fnServerParams,      'user' )
			_fnCallbackReg( oSettings, 'aoStateSaveParams',    oInit.fnStateSaveParams,   'user' )
			_fnCallbackReg( oSettings, 'aoStateLoadParams',    oInit.fnStateLoadParams,   'user' )
			_fnCallbackReg( oSettings, 'aoStateLoaded',        oInit.fnStateLoaded,       'user' )
			_fnCallbackReg( oSettings, 'aoRowCallback',        oInit.fnRowCallback,       'user' )
			_fnCallbackReg( oSettings, 'aoRowCreatedCallback', oInit.fnCreatedRow,        'user' )
			_fnCallbackReg( oSettings, 'aoHeaderCallback',     oInit.fnHeaderCallback,    'user' )
			_fnCallbackReg( oSettings, 'aoFooterCallback',     oInit.fnFooterCallback,    'user' )
			_fnCallbackReg( oSettings, 'aoInitComplete',       oInit.fnInitComplete,      'user' )
			_fnCallbackReg( oSettings, 'aoPreDrawCallback',    oInit.fnPreDrawCallback,   'user' )
		
			// @todo Remove in 1.1
			if ( oInit.bJQueryUI 
			
				/* Use the JUI classes object for display. You could clone the oStdClasses object i
				 * you want to have multiple tables with multiple independent classe
				 *
				$.extend( oSettings.oClasses, DataTable.ext.oJUIClasses, oInit.oClasses )
		
				if ( oInit.sDom === defaults.sDom && defaults.sDom === "lfrtip" 
				
					/* Set the DOM to use a layout suitable for jQuery UI's theming *
					oSettings.sDom = '<"H"lfr>t<"F"ip>'
				
		
				if ( ! oSettings.renderer ) 
					oSettings.renderer = 'jqueryui'
				
				else if ( $.isPlainObject( oSettings.renderer ) && ! oSettings.renderer.header ) 
					oSettings.renderer.header = 'jqueryui'
				
			
			els
			
				$.extend( oSettings.oClasses, DataTable.ext.classes, oInit.oClasses )
			
			$(this).addClass( oSettings.oClasses.sTable )
		
			/* Calculate the scroll bar width and cache it for use later on *
			if ( oSettings.oScroll.sX !== "" || oSettings.oScroll.sY !== "" 
			
				oSettings.oScroll.iBarWidth = _fnScrollBarWidth()
			
			if ( oSettings.oScroll.sX === true ) { // Easy initialisation of x-scrollin
				oSettings.oScroll.sX = '100%'
			
		
			if ( oSettings.iInitDisplayStart === undefined 
			
				/* Display start point, taking into account the save saving *
				oSettings.iInitDisplayStart = oInit.iDisplayStart
				oSettings._iDisplayStart = oInit.iDisplayStart
			
		
			if ( oInit.iDeferLoading !== null 
			
				oSettings.bDeferLoading = true
				var tmp = $.isArray( oInit.iDeferLoading )
				oSettings._iRecordsDisplay = tmp ? oInit.iDeferLoading[0] : oInit.iDeferLoading
				oSettings._iRecordsTotal = tmp ? oInit.iDeferLoading[1] : oInit.iDeferLoading
			
		
			/* Language definitions *
			if ( oInit.oLanguage.sUrl !== "" 
			
				/* Get the language definitions from a file - because this Ajax call makes the languag
				 * get async to the remainder of this function we use bInitHandedOff to indicate tha
				 * _fnInitialise will be fired by the returned Ajax handler, rather than the constructo
				 *
				oSettings.oLanguage.sUrl = oInit.oLanguage.sUrl
				$.getJSON( oSettings.oLanguage.sUrl, null, function( json ) 
					_fnLanguageCompat( json )
					_fnCamelToHungarian( defaults.oLanguage, json )
					$.extend( true, oSettings.oLanguage, oInit.oLanguage, json )
					_fnInitialise( oSettings )
				} )
				bInitHandedOff = true
			
			els
			
				$.extend( true, oSettings.oLanguage, oInit.oLanguage )
			
		
		
			/
			 * Stripe
			 *
			if ( oInit.asStripeClasses === null 
			
				oSettings.asStripeClasses =
					oSettings.oClasses.sStripeOdd
					oSettings.oClasses.sStripeEve
				]
			
		
			/* Remove row stripe classes if they are already on the table row *
			var stripeClasses = oSettings.asStripeClasses
			var rowOne = $('tbody tr:eq(0)', this)
			if ( $.inArray( true, $.map( stripeClasses, function(el, i) 
				return rowOne.hasClass(el)
			} ) ) !== -1 ) 
				$('tbody tr', this).removeClass( stripeClasses.join(' ') )
				oSettings.asDestroyStripes = stripeClasses.slice()
			
		
			/
			 * Column
			 * See if we should load columns automatically or use defined one
			 *
			var anThs = []
			var aoColumnsInit
			var nThead = this.getElementsByTagName('thead')
			if ( nThead.length !== 0 
			
				_fnDetectHeader( oSettings.aoHeader, nThead[0] )
				anThs = _fnGetUniqueThs( oSettings )
			
		
			/* If not given a column array, generate one with nulls *
			if ( oInit.aoColumns === null 
			
				aoColumnsInit = []
				for ( i=0, iLen=anThs.length ; i<iLen ; i++ 
				
					aoColumnsInit.push( null )
				
			
			els
			
				aoColumnsInit = oInit.aoColumns
			
		
			/* Add the columns *
			for ( i=0, iLen=aoColumnsInit.length ; i<iLen ; i++ 
			
				_fnAddColumn( oSettings, anThs ? anThs[i] : null )
			
		
			/* Apply the column definitions *
			_fnApplyColumnDefs( oSettings, oInit.aoColumnDefs, aoColumnsInit, function (iCol, oDef) 
				_fnColumnOptions( oSettings, iCol, oDef )
			} )
		
			/* HTML5 attribute detection - build an mData object automatically if th
			 * attributes are foun
			 *
			if ( rowOne.length ) 
				var a = function ( cell, name ) 
					return cell.getAttribute( 'data-'+name ) ? name : null
				}
		
				$.each( _fnGetRowElements( oSettings, rowOne[0] ).cells, function (i, cell) 
					var col = oSettings.aoColumns[i]
		
					if ( col.mData === i ) 
						var sort = a( cell, 'sort' ) || a( cell, 'order' )
						var filter = a( cell, 'filter' ) || a( cell, 'search' )
		
						if ( sort !== null || filter !== null ) 
							col.mData = 
								_:      i+'.display'
								sort:   sort !== null   ? i+'.@data-'+sort   : undefined
								type:   sort !== null   ? i+'.@data-'+sort   : undefined
								filter: filter !== null ? i+'.@data-'+filter : undefine
							}
		
							_fnColumnOptions( oSettings, i )
						
					
				} )
			
		
		
			/* Must be done after everything which can be overridden by the state saving! *
			if ( oInit.bStateSave 
			
				oSettings.oFeatures.bStateSave = true
				_fnLoadState( oSettings, oInit )
				_fnCallbackReg( oSettings, 'aoDrawCallback', _fnSaveState, 'state_save' )
			
		
		
			/
			 * Sortin
			 * @todo For modularisation (1.11) this needs to do into a sort start up handle
			 *
		
			// If aaSorting is not defined, then we use the first indicator in asSortin
			// in case that has been altered, so the default sort reflects that optio
			if ( oInit.aaSorting === undefined 
			
				for ( i=0, iLen=oSettings.aaSorting.length ; i<iLen ; i++ 
				
					oSettings.aaSorting[i][1] = oSettings.aoColumns[ i ].asSorting[0]
				
			
		
			/* Do a first pass on the sorting classes (allows any size changes to be taken int
			 * account, and also will apply sorting disabled classes if disable
			 *
			_fnSortingClasses( oSettings )
		
			if ( oSettings.oFeatures.bSort 
			
				_fnCallbackReg( oSettings, 'aoDrawCallback', function () 
					if ( oSettings.bSorted ) 
						var aSort = _fnSortFlatten( oSettings )
						var sortedColumns = {}
		
						$.each( aSort, function (i, val) 
							sortedColumns[ val.src ] = val.dir
						} )
		
						_fnCallbackFire( oSettings, null, 'order', [oSettings, aSort, sortedColumns] )
						_fnSortingClasses( oSettings )
						_fnSortAria( oSettings )
					
				} )
			
		
		
		
			/
			 * Final ini
			 * Cache the header, body and footer as required, creating them if neede
			 *
		
			/* Browser support detection *
			_fnBrowserDetect( oSettings )
		
			// Work around for Webkit bug 83867 - store the caption-side before removing from do
			var captions = $(this).children('caption').each( function () 
				this._captionSide = $(this).css('caption-side')
			} )
		
			var thead = $(this).children('thead')
			if ( thead.length === 0 
			
				thead = $('<thead/>').appendTo(this)
			
			oSettings.nTHead = thead[0]
		
			var tbody = $(this).children('tbody')
			if ( tbody.length === 0 
			
				tbody = $('<tbody/>').appendTo(this)
			
			oSettings.nTBody = tbody[0]
		
			var tfoot = $(this).children('tfoot')
			if ( tfoot.length === 0 && captions.length > 0 && (oSettings.oScroll.sX !== "" || oSettings.oScroll.sY !== "") 
			
				// If we are a scrolling table, and no footer has been given, then we need to creat
				// a tfoot element for the caption element to be appended t
				tfoot = $('<tfoot/>').appendTo(this)
			
		
			if ( tfoot.length === 0 || tfoot.children().length === 0 ) 
				$(this).addClass( oSettings.oClasses.sNoFooter )
			
			else if ( tfoot.length > 0 ) 
				oSettings.nTFoot = tfoot[0]
				_fnDetectHeader( oSettings.aoFooter, oSettings.nTFoot )
			
		
			/* Check if there is data passing into the constructor *
			if ( oInit.aaData 
			
				for ( i=0 ; i<oInit.aaData.length ; i++ 
				
					_fnAddData( oSettings, oInit.aaData[ i ] )
				
			
			else if ( oSettings.bDeferLoading || _fnDataSource( oSettings ) == 'dom' 
			
				/* Grab the data from the page - only do this when deferred loading or no Aja
				 * source since there is no point in reading the DOM data if we are then goin
				 * to replace it with Ajax dat
				 *
				_fnAddTr( oSettings, $(oSettings.nTBody).children('tr') )
			
		
			/* Copy the data index array *
			oSettings.aiDisplay = oSettings.aiDisplayMaster.slice()
		
			/* Initialisation complete - table can be drawn *
			oSettings.bInitialised = true
		
			/* Check if we need to initialise the table (it might not have been handed off to th
			 * language processor
			 *
			if ( bInitHandedOff === false 
			
				_fnInitialise( oSettings )
			
		} )
		_that = null
		return this
	}



	/*
	 * Computed structure of the DataTables API, defined by the options passed t
	 * `DataTable.Api.register()` when building the API
	 
	 * The structure is built in order to speed creation and extension of the Ap
	 * objects since the extensions are effectively pre-parsed
	 
	 * The array is an array of objects with the following structure, where thi
	 * base array represents the Api prototype base
	 
	 *     
	 *       
	 *         name:      'data'                -- string   - Property nam
	 *         val:       function () {},       -- function - Api method (or undefined if just an objec
	 *         methodExt: [ ... ],              -- array    - Array of Api object definitions to extend the method resul
	 *         propExt:   [ ... ]               -- array    - Array of Api object definitions to extend the propert
	 *       }
	 *       
	 *         name:     'row
	 *         val:       {}
	 *         methodExt: [ ... ]
	 *         propExt:   
	 *           
	 *             name:      'data
	 *             val:       function () {}
	 *             methodExt: [ ... ]
	 *             propExt:   [ ... 
	 *           }
	 *           ..
	 *         
	 *       
	 *     
	 
	 * @type {Array
	 * @ignor
	 *
	var __apiStruct = []


	/*
	 * `Array.prototype` reference
	 
	 * @type objec
	 * @ignor
	 *
	var __arrayProto = Array.prototype


	/*
	 * Abstraction for `context` parameter of the `Api` constructor to allow it t
	 * take several different forms for ease of use
	 
	 * Each of the input parameter types will be converted to a DataTables setting
	 * object where possible
	 
	 * @param  {string|node|jQuery|object} mixed DataTable identifier. Can be on
	 *   of
	 
	 *   * `string` - jQuery selector. Any DataTables' matching the given selecto
	 *     with be found and used
	 *   * `node` - `TABLE` node which has already been formed into a DataTable
	 *   * `jQuery` - A jQuery object of `TABLE` nodes
	 *   * `object` - DataTables settings objec
	 * @return {array|null} Matching DataTables settings objects. `null` o
	 *   `undefined` is returned if no matching DataTable is found
	 * @ignor
	 *
	var _toSettings = function ( mixed 
	
		var idx, jq
		var settings = DataTable.settings
		var tables = $.map( settings, function (el, i) 
			return el.nTable
		} )

		if ( mixed.nTable && mixed.oApi ) 
			// DataTables settings objec
			return [ mixed ]
		
		else if ( mixed.nodeName && mixed.nodeName.toLowerCase() === 'table' ) 
			// Table nod
			idx = $.inArray( mixed, tables )
			return idx !== -1 ? [ settings[idx] ] : null
		
		else if ( typeof mixed === 'string' ) 
			// jQuery selecto
			jq = $(mixed)
		
		else if ( mixed instanceof $ ) 
			// jQuery object (also DataTables instance
			jq = mixed
		

		if ( jq ) 
			return jq.map( function(i) 
				idx = $.inArray( this, tables )
				return idx !== -1 ? settings[idx] : null
			} ).toArray()
		
	}


	/*
	 * DataTables API class - used to control and interface with  one or mor
	 * DataTables enhanced tables
	 
	 * The API class is heavily based on jQuery, presenting a chainable interfac
	 * that you can use to interact with tables. Each instance of the API class ha
	 * a "context" - i.e. the tables that it will operate on. This could be a singl
	 * table, all tables on a page or a sub-set thereof
	 
	 * Additionally the API is designed to allow you to easily work with the data i
	 * the tables, retrieving and manipulating it as required. This is done b
	 * presenting the API class as an array like interface. The contents of th
	 * array depend upon the actions requested by each method (for exampl
	 * `rows().nodes()` will return an array of nodes, while `rows().data()` wil
	 * return an array of objects or arrays depending upon your table'
	 * configuration). The API object has a number of array like methods (`push`
	 * `pop`, `reverse` etc) as well as additional helper methods (`each`, `pluck`
	 * `unique` etc) to assist your working with the data held in a table
	 
	 * Most methods (those which return an Api instance) are chainable, which mean
	 * the return from a method call also has all of the methods available that th
	 * top level object had. For example, these two calls are equivalent
	 
	 *     // Not chaine
	 *     api.row.add( {...} )
	 *     api.draw()
	 
	 *     // Chaine
	 *     api.row.add( {...} ).draw()
	 
	 * @class DataTable.Ap
	 * @param {array|object|string|jQuery} context DataTable identifier. This i
	 *   used to define which DataTables enhanced tables this API will operate on
	 *   Can be one of
	 
	 *   * `string` - jQuery selector. Any DataTables' matching the given selecto
	 *     with be found and used
	 *   * `node` - `TABLE` node which has already been formed into a DataTable
	 *   * `jQuery` - A jQuery object of `TABLE` nodes
	 *   * `object` - DataTables settings objec
	 * @param {array} [data] Data to initialise the Api instance with
	 
	 * @exampl
	 *   // Direct initialisation during DataTables constructio
	 *   var api = $('#example').DataTable()
	 
	 * @exampl
	 *   // Initialisation using a DataTables jQuery objec
	 *   var api = $('#example').dataTable().api()
	 
	 * @exampl
	 *   // Initialisation as a constructo
	 *   var api = new $.fn.DataTable.Api( 'table.dataTable' )
	 *
	DataTable.Api = _Api = function ( context, data 
	
		if ( ! this instanceof _Api ) 
			throw 'DT API must be constructed as a new object'
			// or should it do the 'new' for the caller
			// return new _Api.apply( this, arguments )
		

		var settings = []
		var ctxSettings = function ( o ) 
			var a = _toSettings( o )
			if ( a ) 
				settings.push.apply( settings, a )
			
		}

		if ( $.isArray( context ) ) 
			for ( var i=0, ien=context.length ; i<ien ; i++ ) 
				ctxSettings( context[i] )
			
		
		else 
			ctxSettings( context )
		

		// Remove duplicate
		this.context = _unique( settings )

		// Initial dat
		if ( data ) 
			this.push.apply( this, data.toArray ? data.toArray() : data )
		

		// selecto
		this.selector = 
			rows: null
			cols: null
			opts: nul
		}

		_Api.extend( this, this, __apiStruct )
	}


	_Api.prototype = /** @lends DataTables.Api */
		/*
		 * Return a new Api instance, comprised of the data held in the curren
		 * instance, join with the other array(s) and/or value(s)
		 
		 * An alias for `Array.prototype.concat`
		 
		 * @type metho
		 * @param {*} value1 Arrays and/or values to concatenate
		 * @param {*} [...] Additional arrays and/or values to concatenate
		 * @returns {DataTables.Api} New API instance, comprising of the combine
		 *   array
		 *
		concat:  __arrayProto.concat


		context: [], // array of table settings object


		each: function ( fn 
		
			if ( __arrayProto.forEach ) 
				// Where possible, use the built-in forEac
				__arrayProto.forEach.call( this, fn, this )
			
			else 
				// Compatibility for browsers without EMCA-252-5 (JS 1.6
				for ( var i=0, ien=this.length ; i<ien; i++ ) 
					// In strict mode the execution scope is the passed valu
					fn.call( this, this[i], i, this )
				
			

			return this
		}


		filter: function ( fn 
		
			var a = []

			if ( __arrayProto.filter ) 
				a = __arrayProto.filter.call( this, fn, this )
			
			else 
				// Compatibility for browsers without EMCA-252-5 (JS 1.6
				for ( var i=0, ien=this.length ; i<ien ; i++ ) 
					if ( fn.call( this, this[i], i, this ) ) 
						a.push( this[i] )
					
				
			

			return new _Api( this.context, a )
		}


		flatten: function (
		
			var a = []
			return new _Api( this.context, a.concat.apply( a, this.toArray() ) )
		}


		join:    __arrayProto.join


		indexOf: __arrayProto.indexOf || function (obj, start
		
			for ( var i=(start || 0), ien=this.length ; i<ien ; i++ ) 
				if ( this[i] === obj ) 
					return i
				
			
			return -1
		}

		// Internal only at the moment - relax
		iterator: function ( flatten, type, fn ) 
			va
				a = [], ret
				i, ien, j, jen
				context = this.context
				rows, items, item
				selector = this.selector

			// Argument shiftin
			if ( typeof flatten === 'string' ) 
				fn = type
				type = flatten
				flatten = false
			

			for ( i=0, ien=context.length ; i<ien ; i++ ) 
				if ( type === 'table' ) 
					ret = fn( context[i], i )

					if ( ret !== undefined ) 
						a.push( ret )
					
				
				else if ( type === 'columns' || type === 'rows' ) 
					// this has same length as context - one entry for each tabl
					ret = fn( context[i], this[i], i )

					if ( ret !== undefined ) 
						a.push( ret )
					
				
				else if ( type === 'column' || type === 'column-rows' || type === 'row' || type === 'cell' ) 
					// columns and rows share the same structure
					// 'this' is an array of column indexes for each contex
					items = this[i]

					if ( type === 'column-rows' ) 
						rows = _selector_row_indexes( context[i], selector.opts )
					

					for ( j=0, jen=items.length ; j<jen ; j++ ) 
						item = items[j]

						if ( type === 'cell' ) 
							ret = fn( context[i], item.row, item.column, i, j )
						
						else 
							ret = fn( context[i], item, i, j, rows )
						

						if ( ret !== undefined ) 
							a.push( ret )
						
					
				
			

			if ( a.length ) 
				var api = new _Api( context, flatten ? a.concat.apply( [], a ) : a )
				var apiSelector = api.selector
				apiSelector.rows = selector.rows
				apiSelector.cols = selector.cols
				apiSelector.opts = selector.opts
				return api
			
			return this
		}


		lastIndexOf: __arrayProto.lastIndexOf || function (obj, start
		
			// Bit cheeky..
			return this.indexOf.apply( this.toArray.reverse(), arguments )
		}


		length:  0


		map: function ( fn 
		
			var a = []

			if ( __arrayProto.map ) 
				a = __arrayProto.map.call( this, fn, this )
			
			else 
				// Compatibility for browsers without EMCA-252-5 (JS 1.6
				for ( var i=0, ien=this.length ; i<ien ; i++ ) 
					a.push( fn.call( this, this[i], i ) )
				
			

			return new _Api( this.context, a )
		}


		pluck: function ( prop 
		
			return this.map( function ( el ) 
				return el[ prop ]
			} )
		}

		pop:     __arrayProto.pop


		push:    __arrayProto.push


		// Does not return an API instanc
		reduce: __arrayProto.reduce || function ( fn, init 
		
			va
				value
				isSet = false

			if ( arguments.length > 1 ) 
				value = init
				isSet = true
			

			for ( var i=0, ien=this.length ; i<ien ; i++ ) 
				if ( ! this.hasOwnProperty(i) ) 
					continue
				

				value = isSet 
					fn( value, this[i], i, this ) 
					this[i]

				isSet = true
			

			return value
		}


		reduceRight: __arrayProto.reduceRight || function ( fn, init 
		
			va
				value
				isSet = false

			if ( arguments.length > 1 ) 
				value = init
				isSet = true
			

			for ( var i=this.length-1 ; i>=0 ; i-- ) 
				if ( ! this.hasOwnProperty(i) ) 
					continue
				

				value = isSet 
					fn( value, this[i], i, this ) 
					this[i]

				isSet = true
			

			return value
		}

		reverse: __arrayProto.reverse


		// Object with rows, columns and opt
		selector: null


		shift:   __arrayProto.shift


		sort:    __arrayProto.sort, // ? name - order


		splice:  __arrayProto.splice


		toArray: function (
		
			return __arrayProto.slice.call( this )
		}


		to$: function (
		
			return $( this )
		}


		toJQuery: function (
		
			return $( this )
		}


		unique: function (
		
			return new _Api( this.context, _unique(this) )
		}


		unshift: __arrayProto.unshif
	}


	_Api.extend = function ( scope, obj, ext 
	
		// Only extend API instances and static properties of the AP
		if ( ! obj || ( ! (obj instanceof _Api) && ! obj.__dt_wrapper ) ) 
			return
		

		va
			i, ien
			j, jen
			struct, inner
			methodScoping = function ( fn, struc ) 
				return function () 
					var ret = fn.apply( scope, arguments )

					// Method extensio
					_Api.extend( ret, ret, struc.methodExt )
					return ret
				}
			}

		for ( i=0, ien=ext.length ; i<ien ; i++ ) 
			struct = ext[i]

			// Valu
			obj[ struct.name ] = typeof struct.val === 'function' 
				methodScoping( struct.val, struct ) 
				struct.val

			obj[ struct.name ].__dt_wrapper = true

			// Property extensio
			_Api.extend( scope, obj[ struct.name ], struct.propExt )
		
	}


	// @todo - Is there need for an augment function
	// _Api.augment = function ( inst, name 
	// 
	// 	// Find src object in the structure from the nam
	// 	var parts = name.split('.')

	// 	_Api.extend( inst, obj )
	// }


	//     
	//       
	//         name:      'data'                -- string   - Property nam
	//         val:       function () {},       -- function - Api method (or undefined if just an objec
	//         methodExt: [ ... ],              -- array    - Array of Api object definitions to extend the method resul
	//         propExt:   [ ... ]               -- array    - Array of Api object definitions to extend the propert
	//       }
	//       
	//         name:     'row
	//         val:       {}
	//         methodExt: [ ... ]
	//         propExt:   
	//           
	//             name:      'data
	//             val:       function () {}
	//             methodExt: [ ... ]
	//             propExt:   [ ... 
	//           }
	//           ..
	//         
	//       
	//     

	_Api.register = _api_register = function ( name, val 
	
		if ( $.isArray( name ) ) 
			for ( var j=0, jen=name.length ; j<jen ; j++ ) 
				_Api.register( name[j], val )
			
			return
		

		va
			i, ien
			heir = name.split('.')
			struct = __apiStruct
			key, method

		var find = function ( src, name ) 
			for ( var i=0, ien=src.length ; i<ien ; i++ ) 
				if ( src[i].name === name ) 
					return src[i]
				
			
			return null
		}

		for ( i=0, ien=heir.length ; i<ien ; i++ ) 
			method = heir[i].indexOf('()') !== -1
			key = method 
				heir[i].replace('()', '') 
				heir[i]

			var src = find( struct, key )
			if ( ! src ) 
				src = 
					name:      key
					val:       {}
					methodExt: []
					propExt:   [
				}
				struct.push( src )
			

			if ( i === ien-1 ) 
				src.val = val
			
			else 
				struct = method 
					src.methodExt 
					src.propExt
			
		

		// Rebuild the API with the new construc
		if ( _Api.ready ) 
			DataTable.api.build()
		
	}


	_Api.registerPlural = _api_registerPlural = function ( pluralName, singularName, val ) 
		_Api.register( pluralName, val )

		_Api.register( singularName, function () 
			var ret = val.apply( this, arguments )

			if ( ret === this ) 
				// Returned item is the API instance that was passed in, return i
				return this
			
			else if ( ret instanceof _Api ) 
				// New API instance returned, want the value from the first ite
				// in the returned array for the singular result
				return ret.length 
					$.isArray( ret[0] ) 
						new _Api( ret.context, ret[0] ) : // Array results are 'enhanced
						ret[0] 
					undefined
			

			// Non-API return - just fire it bac
			return ret
		} )
	}


	/*
	 * Selector for HTML tables. Apply the given selector to the give array o
	 * DataTables settings objects
	 
	 * @param {string|integer} [selector] jQuery selector string or intege
	 * @param  {array} Array of DataTables settings objects to be filtere
	 * @return {array
	 * @ignor
	 *
	var __table_selector = function ( selector, a 
	
		// Integer is used to pick out a table by inde
		if ( typeof selector === 'number' ) 
			return [ a[ selector ] ]
		

		// Perform a jQuery selector on the table node
		var nodes = $.map( a, function (el, i) 
			return el.nTable
		} )

		return $(nodes
			.filter( selector 
			.map( function (i) 
				// Need to translate back from the table node to the setting
				var idx = $.inArray( this, nodes )
				return a[ idx ]
			} 
			.toArray()
	}



	/*
	 * Context selector for the API's context (i.e. the tables the API instanc
	 * refers to
	 
	 * @name    DataTable.Api#table
	 * @param {string|integer} [selector] Selector to pick which tables the iterato
	 *   should operate on. If not given, all tables in the current context ar
	 *   used. This can be given as a jQuery selector (for example `':gt(0)'`) t
	 *   select multiple tables or as an integer to select a single table
	 * @returns {DataTable.Api} Returns a new API instance if a selector is given
	 *
	_api_register( 'tables()', function ( selector ) 
		// A new instance is created if there was a selector specifie
		return selector 
			new _Api( __table_selector( selector, this.context ) ) 
			this
	} )


	_api_register( 'table()', function ( selector ) 
		var tables = this.tables( selector )
		var ctx = tables.context

		// Truncate to the first matched tabl
		if ( ctx.length ) 
			ctx.length = 1
		

		return tables
	} )


	_api_registerPlural( 'tables().nodes()', 'table().node()' , function () 
		return this.iterator( 'table', function ( ctx ) 
			return ctx.nTable
		} )
	} )


	_api_registerPlural( 'tables().body()', 'table().body()' , function () 
		return this.iterator( 'table', function ( ctx ) 
			return ctx.nTBody
		} )
	} )


	_api_registerPlural( 'tables().header()', 'table().header()' , function () 
		return this.iterator( 'table', function ( ctx ) 
			return ctx.nTHead
		} )
	} )


	_api_registerPlural( 'tables().footer()', 'table().footer()' , function () 
		return this.iterator( 'table', function ( ctx ) 
			return ctx.nTFoot
		} )
	} )



	/*
	 * Redraw the tables in the current context
	 
	 * @param {boolean} [reset=true] Reset (default) or hold the current pagin
	 *   position. A full re-sort and re-filter is performed when this method i
	 *   called, which is why the pagination reset is the default action
	 * @returns {DataTables.Api} thi
	 *
	_api_register( 'draw()', function ( resetPaging ) 
		return this.iterator( 'table', function ( settings ) 
			_fnReDraw( settings, resetPaging===false )
		} )
	} )



	/*
	 * Get the current page index
	 
	 * @return {integer} Current page index (zero based
	 *//*
	 * Set the current page
	 
	 * Note that if you attempt to show a page which does not exist, DataTables wil
	 * not throw an error, but rather reset the paging
	 
	 * @param {integer|string} action The paging action to take. This can be one of
	 *  * `integer` - The page index to jump t
	 *  * `string` - An action to take
	 *    * `first` - Jump to first page
	 *    * `next` - Jump to the next pag
	 *    * `previous` - Jump to previous pag
	 *    * `last` - Jump to the last page
	 * @returns {DataTables.Api} thi
	 *
	_api_register( 'page()', function ( action ) 
		if ( action === undefined ) 
			return this.page.info().page; // not an expensive cal
		

		// else, have an action to take on all table
		return this.iterator( 'table', function ( settings ) 
			_fnPageChange( settings, action )
		} )
	} )


	/*
	 * Paging information for the first table in the current context
	 
	 * If you require paging information for another table, use the `table()` metho
	 * with a suitable selector
	 
	 * @return {object} Object with the following properties set
	 *  * `page` - Current page index (zero based - i.e. the first page is `0`
	 *  * `pages` - Total number of page
	 *  * `start` - Display index for the first record shown on the current pag
	 *  * `end` - Display index for the last record shown on the current pag
	 *  * `length` - Display length (number of records). Note that generally `star
	 *    + length = end`, but this is not always true, for example if there ar
	 *    only 2 records to show on the final page, with a length of 10
	 *  * `recordsTotal` - Full data set lengt
	 *  * `recordsDisplay` - Data set length once the current filtering criterio
	 *    are applied
	 *
	_api_register( 'page.info()', function ( action ) 
		if ( this.context.length === 0 ) 
			return undefined
		

		va
			settings   = this.context[0]
			start      = settings._iDisplayStart
			len        = settings._iDisplayLength
			visRecords = settings.fnRecordsDisplay()
			all        = len === -1

		return 
			"page":           all ? 0 : Math.floor( start / len )
			"pages":          all ? 1 : Math.ceil( visRecords / len )
			"start":          start
			"end":            settings.fnDisplayEnd()
			"length":         len
			"recordsTotal":   settings.fnRecordsTotal()
			"recordsDisplay": visRecord
		}
	} )


	/*
	 * Get the current page length
	 
	 * @return {integer} Current page length. Note `-1` indicates that all record
	 *   are to be shown
	 *//*
	 * Set the current page length
	 
	 * @param {integer} Page length to set. Use `-1` to show all records
	 * @returns {DataTables.Api} thi
	 *
	_api_register( 'page.len()', function ( len ) 
		// Note that we can't call this function 'length()' because `length
		// is a Javascript property of functions which defines how many argument
		// the function expects
		if ( len === undefined ) 
			return this.context.length !== 0 
				this.context[0]._iDisplayLength 
				undefined
		

		// else, set the page lengt
		return this.iterator( 'table', function ( settings ) 
			_fnLengthChange( settings, len )
		} )
	} )



	var __reload = function ( settings, holdPosition, callback ) 
		if ( _fnDataSource( settings ) == 'ssp' ) 
			_fnReDraw( settings, holdPosition )
		
		else 
			// Trigger xh
			_fnBuildAjax( settings, [], function( json ) 
				// xxx can this be reduced
				_fnClearTable( settings )

				var data = _fnAjaxDataSrc( settings, json )
				for ( var i=0, ien=data.length ; i<ien ; i++ ) 
					_fnAddData( settings, data[i] )
				

				_fnReDraw( settings, holdPosition )

				if ( callback ) 
					callback( json )
				
			} )
		
	}


	/*
	 * Get the JSON response from the last Ajax request that DataTables made to th
	 * server. Note that this returns the JSON from the first table in the curren
	 * context
	 
	 * @return {object} JSON received from the server
	 *
	_api_register( 'ajax.json()', function () 
		var ctx = this.context

		if ( ctx.length > 0 ) 
			return ctx[0].json
		

		// else return undefined
	} )


	/*
	 * Reload tables from the Ajax data source. Note that this function wil
	 * automatically re-draw the table when the remote data has been loaded
	 
	 * @param {boolean} [reset=true] Reset (default) or hold the current pagin
	 *   position. A full re-sort and re-filter is performed when this method i
	 *   called, which is why the pagination reset is the default action
	 * @returns {DataTables.Api} thi
	 *
	_api_register( 'ajax.reload()', function ( callback, resetPaging ) 
		return this.iterator( 'table', function (settings) 
			__reload( settings, resetPaging===false, callback )
		} )
	} )


	/*
	 * Get the current Ajax URL. Note that this returns the URL from the firs
	 * table in the current context
	 
	 * @return {string} Current Ajax source UR
	 *//*
	 * Set the Ajax URL. Note that this will set the URL for all tables in th
	 * current context
	 
	 * @param {string} url URL to set
	 * @returns {DataTables.Api} thi
	 *
	_api_register( 'ajax.url()', function ( url ) 
		var ctx = this.context

		if ( url === undefined ) 
			// ge
			if ( ctx.length === 0 ) 
				return undefined
			
			ctx = ctx[0]

			return ctx.ajax 
				$.isPlainObject( ctx.ajax ) 
					ctx.ajax.url 
					ctx.ajax 
				ctx.sAjaxSource
		

		// se
		return this.iterator( 'table', function ( settings ) 
			if ( $.isPlainObject( settings.ajax ) ) 
				settings.ajax.url = url
			
			else 
				settings.ajax = url
			
			// No need to consider sAjaxSource here since DataTables gives priorit
			// to `ajax` over `sAjaxSource`. So setting `ajax` here, renders an
			// value of `sAjaxSource` redundant
		} )
	} )


	/*
	 * Load data from the newly set Ajax URL. Note that this method is onl
	 * available when `ajax.url()` is used to set a URL. Additionally, this metho
	 * has the same effect as calling `ajax.reload()` but is provided fo
	 * convenience when setting a new URL. Like `ajax.reload()` it wil
	 * automatically redraw the table once the remote data has been loaded
	 
	 * @returns {DataTables.Api} thi
	 *
	_api_register( 'ajax.url().load()', function ( callback, resetPaging ) 
		// Same as a reload, but makes sense to present it for easy access after 
		// url chang
		return this.iterator( 'table', function ( ctx ) 
			__reload( ctx, resetPaging===false, callback )
		} )
	} )




	var _selector_run = function ( selector, select 
	
		va
			out = [], res
			a, i, ien, j, jen

		if ( ! $.isArray( selector ) ) 
			selector = [ selector ]
		

		for ( i=0, ien=selector.length ; i<ien ; i++ ) 
			a = selector[i] && selector[i].split 
				selector[i].split(',') 
				[ selector[i] ]

			for ( j=0, jen=a.length ; j<jen ; j++ ) 
				res = select( typeof a[j] === 'string' ? $.trim(a[j]) : a[j] )

				if ( res && res.length ) 
					out.push.apply( out, res )
				
			
		

		return out
	}


	var _selector_opts = function ( opts 
	
		if ( ! opts ) 
			opts = {}
		

		// Backwards compatibility for 1.9- which used the terminology filter rathe
		// than searc
		if ( opts.filter && ! opts.search ) 
			opts.search = opts.filter
		

		return 
			search: opts.search || 'none'
			order:  opts.order  || 'current'
			page:   opts.page   || 'all
		}
	}


	var _selector_first = function ( inst 
	
		// Reduce the API instance to the first item foun
		for ( var i=0, ien=inst.length ; i<ien ; i++ ) 
			if ( inst[i].length > 0 ) 
				// Assign the first element to the first item in the instanc
				// and truncate the instance and contex
				inst[0] = inst[i]
				inst.length = 1
				inst.context = [ inst.context[i] ]

				return inst
			
		

		// Not found - return an empty instanc
		inst.length = 0
		return inst
	}


	var _selector_row_indexes = function ( settings, opts 
	
		va
			i, ien, tmp, a=[]
			displayFiltered = settings.aiDisplay
			displayMaster = settings.aiDisplayMaster

		va
			search = opts.search,  // none, applied, remove
			order  = opts.order,   // applied, current, index (original - compatibility with 1.9
			page   = opts.page;    // all, curren

		// Current page implies that order=current and fitler=applied, since it i
		// fairly senseless otherwise, regardless of what order and search actuall
		// ar
		if ( page == 'current' 
		
			for ( i=settings._iDisplayStart, ien=settings.fnDisplayEnd() ; i<ien ; i++ ) 
				a.push( displayFiltered[i] )
			
		
		else if ( order == 'current' || order == 'applied' ) 
			a = search == 'none' 
				displayMaster.slice() :                      // no searc
				search == 'applied' 
					displayFiltered.slice() :                // applied searc
					$.map( displayMaster, function (el, i) { // removed searc
						return $.inArray( el, displayFiltered ) === -1 ? el : null
					} )
		
		else if ( order == 'index' || order == 'original' ) 
			for ( i=0, ien=settings.aoData.length ; i<ien ; i++ ) 
				if ( search == 'none' ) 
					a.push( i )
				
				else { // applied | remove
					tmp = $.inArray( i, displayFiltered )

					if ((tmp === -1 && search == 'removed') |
						(tmp === 1  && search == 'applied') 
					
						a.push( i )
					
				
			
		

		return a
	}


	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
	 * Row
	 
	 * {}          - no selector - use all available row
	 * {integer}   - row aoData inde
	 * {node}      - TR nod
	 * {string}    - jQuery selector to apply to the TR element
	 * {array}     - jQuery array of nodes, or simply an array of TR node
	 
	 *


	var __row_selector = function ( settings, selector, opts 
	
		return _selector_run( selector, function ( sel ) 
			var selInt = _intVal( sel )

			// Short cut - selector is a number and no options provided (default i
			// all records, so no need to check if the index is in there, since i
			// must be - dev error if the index doesn't exist)
			if ( selInt !== null && ! opts ) 
				return [ selInt ]
			

			var rows = _selector_row_indexes( settings, opts )

			if ( selInt !== null && $.inArray( selInt, rows ) !== -1 ) 
				// Selector - intege
				return [ selInt ]
			
			else if ( ! sel ) 
				// Selector - non
				return rows
			

			// Get nodes in the order from the `rows` array (can't use `pluck`) @todo - use pluck_orde
			var nodes = []
			for ( var i=0, ien=rows.length ; i<ien ; i++ ) 
				nodes.push( settings.aoData[ rows[i] ].nTr )
			

			if ( sel.nodeName ) 
				// Selector - nod
				if ( $.inArray( sel, nodes ) !== -1 ) 
					return [ sel._DT_RowIndex ];// sel is a TR node that is in the tabl
											// and DataTables adds a prop for fast looku
				
			

			// Selector - jQuery selector string, array of nodes or jQuery object
			// As jQuery's .filter() allows jQuery objects to be passed in filter
			// it also allows arrays, so this will cope with all three option
			return $(nodes
				.filter( sel 
				.map( function () 
					return this._DT_RowIndex
				} 
				.toArray()
		} )
	}


	/*
	 
	 *
	_api_register( 'rows()', function ( selector, opts ) 
		// argument shiftin
		if ( selector === undefined ) 
			selector = ''
		
		else if ( $.isPlainObject( selector ) ) 
			opts = selector
			selector = ''
		

		opts = _selector_opts( opts )

		var inst = this.iterator( 'table', function ( settings ) 
			return __row_selector( settings, selector, opts )
		} )

		// Want argument shifting here and in __row_selector
		inst.selector.rows = selector
		inst.selector.opts = opts

		return inst
	} )


	_api_registerPlural( 'rows().nodes()', 'row().node()' , function () 
		return this.iterator( 'row', function ( settings, row ) 
			// use pluck order on an array rather - rows gives an array, row gives it individuall
			return settings.aoData[ row ].nTr || undefined
		} )
	} )


	_api_register( 'rows().data()', function () 
		return this.iterator( true, 'rows', function ( settings, rows ) 
			return _pluck_order( settings.aoData, rows, '_aData' )
		} )
	} )

	_api_registerPlural( 'rows().cache()', 'row().cache()', function ( type ) 
		return this.iterator( 'row', function ( settings, row ) 
			var r = settings.aoData[ row ]
			return type === 'search' ? r._aFilterData : r._aSortData
		} )
	} )

	_api_registerPlural( 'rows().invalidate()', 'row().invalidate()', function ( src ) 
		return this.iterator( 'row', function ( settings, row ) 
			_fnInvalidateRow( settings, row, src )
		} )
	} )


	_api_registerPlural( 'rows().indexes()', 'row().index()', function () 
		return this.iterator( 'row', function ( settings, row ) 
			return row
		} )
	} )


	_api_registerPlural( 'rows().remove()', 'row().remove()', function () 
		var that = this

		return this.iterator( 'row', function ( settings, row, thatIdx ) 
			var data = settings.aoData

			data.splice( row, 1 )

			// Update the _DT_RowIndex parameter on all rows in the tabl
			for ( var i=0, ien=data.length ; i<ien ; i++ ) 
				if ( data[i].nTr !== null ) 
					data[i].nTr._DT_RowIndex = i
				
			

			// Remove the target row from the search arra
			var displayIndex = $.inArray( row, settings.aiDisplay )

			// Delete from the display array
			_fnDeleteIndex( settings.aiDisplayMaster, row )
			_fnDeleteIndex( settings.aiDisplay, row )
			_fnDeleteIndex( that[ thatIdx ], row, false ); // maintain local indexe

			// Check for an 'overflow' they case for displaying the tabl
			_fnLengthOverflow( settings )
		} )
	} )


	_api_register( 'rows.add()', function ( rows ) 
		var newRows = this.iterator( 'table', function ( settings ) 
				var row, i, ien
				var out = []

				for ( i=0, ien=rows.length ; i<ien ; i++ ) 
					row = rows[i]

					if ( row.nodeName && row.nodeName.toUpperCase() === 'TR' ) 
						out.push( _fnAddTr( settings, row )[0] )
					
					else 
						out.push( _fnAddData( settings, row ) )
					
				

				return out
			} )

		// Return an Api.rows() extended instance, so rows().nodes() etc can be use
		var modRows = this.rows( -1 )
		modRows.pop()
		modRows.push.apply( modRows, newRows.toArray() )

		return modRows
	} )





	/*
	 
	 *
	_api_register( 'row()', function ( selector, opts ) 
		return _selector_first( this.rows( selector, opts ) )
	} )


	_api_register( 'row().data()', function ( data ) 
		var ctx = this.context

		if ( data === undefined ) 
			// Ge
			return ctx.length && this.length 
				ctx[0].aoData[ this[0] ]._aData 
				undefined
		

		// Se
		ctx[0].aoData[ this[0] ]._aData = data

		// Automatically invalidat
		_fnInvalidateRow( ctx[0], this[0], 'data' )

		return this
	} )


	_api_register( 'row.add()', function ( row ) 
		// Allow a jQuery object to be passed in - only a single row is added fro
		// it though - the first element in the se
		if ( row instanceof $ && row.length ) 
			row = row[0]
		

		var rows = this.iterator( 'table', function ( settings ) 
			if ( row.nodeName && row.nodeName.toUpperCase() === 'TR' ) 
				return _fnAddTr( settings, row )[0]
			
			return _fnAddData( settings, row )
		} )

		// Return an Api.rows() extended instance, with the newly added row selecte
		return this.row( rows[0] )
	} )



	var __details_add = function ( ctx, row, data, klass 
	
		// Convert to array of TR element
		var rows = []
		var addRow = function ( r, k ) 
			if ( ! r.nodeName || r.nodeName.toUpperCase() !== 'tr' ) 
				r = $('<tr><td></td></tr>').find('td').html( r ).parent()
			

			$('td', r).addClass( k )[0].colSpan = _fnVisbleColumns( ctx )
			rows.push( r[0] )
		}

		if ( $.isArray( data ) || data instanceof $ ) 
			for ( var i=0, ien=data.length ; i<ien ; i++ ) 
				addRow( data[i], klass )
			
		
		else 
			addRow( data, klass )
		

		if ( row._details ) 
			row._details.remove()
		

		row._details = $(rows)

		// If the children were already shown, that state should be retaine
		if ( row._detailsShow ) 
			row._details.insertAfter( row.nTr )
		
	}


	var __details_display = function ( show ) 
		var ctx = this.context

		if ( ctx.length && this.length ) 
			var row = ctx[0].aoData[ this[0] ]

			if ( row._details ) 
				row._detailsShow = show
				if ( show ) 
					row._details.insertAfter( row.nTr )
				
				else 
					row._details.remove()
				

				__details_events( ctx[0] )
			
		

		return this
	}


	var __details_events = function ( settings 
	
		var table = $(settings.nTable)
		var namespace = '.dt.DT_details'

		table.off('draw'+namespace)
		table.off('column-visibility'+namespace)

		if ( _pluck( settings.aoData, '_details' ).length > 0 ) 
			// On each draw, insert the required elements into the documen
			table.on('draw'+namespace, function () 
				table.find('tbody tr').each( function () 
					// Look up the row index for each row and append open ro
					var rowIdx = _fnNodeToDataIndex( settings, this )
					var row = settings.aoData[ rowIdx ]

					if ( row._detailsShow ) 
						row._details.insertAfter( this )
					
				} )
			} )

			// Column visibility change - update the colspa
			table.on( 'column-visibility'+namespace, function ( e, settings, idx, vis ) 
				// Update the colspan for the details rows (note, only if it already ha
				// a colspan
				var row, visible = _fnVisbleColumns( settings )

				for ( var i=0, ien=settings.aoData.length ; i<ien ; i++ ) 
					row = settings.aoData[i]

					if ( row._details ) 
						row._details.children('td[colspan]').attr('colspan', visible )
					
				
			} )
		
	}

	// data can be
	//  t
	//  strin
	//  jQuery or array of any of the abov
	_api_register( 'row().child()', function ( data, klass ) 
		var ctx = this.context

		if ( data === undefined ) 
			// ge
			return ctx.length && this.length 
				ctx[0].aoData[ this[0] ]._details 
				undefined
		
		else if ( ctx.length && this.length ) 
			// se
			__details_add( ctx[0], ctx[0].aoData[ this[0] ], data, klass )
		

		return this
	} )

	_api_register( 
		'row().child.show()'
		'row().child().show()
	], function () 
		__details_display.call( this, true )
	} )

	_api_register( 
		'row().child.hide()'
		'row().child().hide()
	], function () 
		__details_display.call( this, false )
	} )

	_api_register( 'row().child.isShown()', function () 
		var ctx = this.context

		if ( ctx.length && this.length ) 
			// _detailsShown as false or undefined will fall through to return fals
			return ctx[0].aoData[ this[0] ]._detailsShow || false
		
		return false
	} )



	/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * 
	 * Column
	 
	 * {integer}           - column index (>=0 count from left, <0 count from right
	 * "{integer}:visIdx"  - visible column index (i.e. translate to column index)  (>=0 count from left, <0 count from right
	 * "{integer}:visible" - alias for {integer}:visIdx  (>=0 count from left, <0 count from right
	 * "{string}:name"     - column nam
	 * "{string}"          - jQuery selector on column header node
	 
	 *

	// can be an array of these items, comma separated list, or an array of comm
	// separated list

	var __re_column_selector = /^(.*):(name|visIdx|visible)$/

	var __column_selector = function ( settings, selector, opts 
	
		va
			columns = settings.aoColumns
			names = _pluck( columns, 'sName' )
			nodes = _pluck( columns, 'nTh' )

		return _selector_run( selector, function ( s ) 
			var selInt = _intVal( s )

			if ( s === '' ) 
				// All column
				return _range( columns.length )
			
			else if ( selInt !== null ) 
				// Integer selecto
				return [ selInt >= 0 
					selInt : // Count from lef
					columns.length + selInt // Count from right (+ because its a negative value
				]
			
			else 
				var match = s.match( __re_column_selector )

				if ( match ) 
					switch( match[2] ) 
						case 'visIdx'
						case 'visible'
							var idx = parseInt( match[1], 10 )
							// Visible index given, convert to column inde
							if ( idx < 0 ) 
								// Counting from the righ
								var visColumns = $.map( columns, function (col,i) 
									return col.bVisible ? i : null
								} )
								return [ visColumns[ visColumns.length + idx ] ]
							
							// Counting from the lef
							return [ _fnVisibleToColumnIndex( settings, idx ) ]

						case 'name'
							// match by name. `names` is column index complete and in orde
							return $.map( names, function (name, i) 
								return name === match[1] ? i : null
							} )
					
				
				else 
					// jQuery selector on the TH elements for the column
					return $( nodes 
						.filter( s 
						.map( function () 
							return $.inArray( this, nodes ); // `nodes` is column index complete and in orde
						} 
						.toArray()
				
			
		} )
	}





	var __setColumnVis = function ( settings, column, vis ) 
		va
			cols = settings.aoColumns
			col  = cols[ column ]
			data = settings.aoData
			row, cells, i, ien, tr

		// Ge
		if ( vis === undefined ) 
			return col.bVisible
		

		// Se
		// No chang
		if ( col.bVisible === vis ) 
			return
		

		if ( vis ) 
			// Insert colum
			// Need to decide if we should use appendChild or insertBefor
			var insertBefore = $.inArray( true, _pluck(cols, 'bVisible'), column+1 )

			for ( i=0, ien=data.length ; i<ien ; i++ ) 
				tr = data[i].nTr
				cells = data[i].anCells

				if ( tr ) 
					// insertBefore can act like appendChild if 2nd arg is nul
					tr.insertBefore( cells[ column ], cells[ insertBefore ] || null )
				
			
		
		else 
			// Remove colum
			$( _pluck( settings.aoData, 'anCells', column ) ).remove()

			col.bVisible = false
			_fnDrawHead( settings, settings.aoHeader )
			_fnDrawHead( settings, settings.aoFooter )

			_fnSaveState( settings )
		

		// Common action
		col.bVisible = vis
		_fnDrawHead( settings, settings.aoHeader )
		_fnDrawHead( settings, settings.aoFooter )

		// Automatically adjust column sizin
		_fnAdjustColumnSizing( settings )

		// Realign columns for scrollin
		if ( settings.oScroll.sX || settings.oScroll.sY ) 
			_fnScrollDraw( settings )
		

		_fnCallbackFire( settings, null, 'column-visibility', [settings, column, vis] )

		_fnSaveState( settings )
	}


	/*
	 
	 *
	_api_register( 'columns()', function ( selector, opts ) 
		// argument shiftin
		if ( selector === undefined ) 
			selector = ''
		
		else if ( $.isPlainObject( selector ) ) 
			opts = selector
			selector = ''
		

		opts = _selector_opts( opts )

		var inst = this.iterator( 'table', function ( settings ) 
			return __column_selector( settings, selector, opts )
		} )

		// Want argument shifting here and in _row_selector
		inst.selector.cols = selector
		inst.selector.opts = opts

		return inst
	} )


	/*
	 
	 *
	_api_registerPlural( 'columns().header()', 'column().header()', function ( selector, opts ) 
		return this.iterator( 'column', function ( settings, column ) 
			return settings.aoColumns[column].nTh
		} )
	} )


	/*
	 
	 *
	_api_registerPlural( 'columns().footer()', 'column().footer()', function ( selector, opts ) 
		return this.iterator( 'column', function ( settings, column ) 
			return settings.aoColumns[column].nTf
		} )
	} )


	/*
	 
	 *
	_api_registerPlural( 'columns().data()', 'column().data()', function () 
		return this.iterator( 'column-rows', function ( settings, column, i, j, rows ) 
			var a = []
			for ( var row=0, ien=rows.length ; row<ien ; row++ ) 
				a.push( _fnGetCellData( settings, rows[row], column, '' ) )
			
			return a
		} )
	} )


	_api_registerPlural( 'columns().cache()', 'column().cache()', function ( type ) 
		return this.iterator( 'column-rows', function ( settings, column, i, j, rows ) 
			return _pluck_order( settings.aoData, rows
				type === 'search' ? '_aFilterData' : '_aSortData', colum
			)
		} )
	} )


	_api_registerPlural( 'columns().nodes()', 'column().nodes()', function () 
		return this.iterator( 'column-rows', function ( settings, column, i, j, rows ) 
			return _pluck_order( settings.aoData, rows, 'anCells', column ) 
		} )
	} )



	_api_registerPlural( 'columns().visible()', 'column().visible()', function ( vis ) 
		return this.iterator( 'column', function ( settings, column ) 
			return __setColumnVis( settings, column, vis )
		} )
	} )



	_api_registerPlural( 'columns().indexes()', 'column().index()', function ( type ) 
		return this.iterator( 'column', function ( settings, column ) 
			return type === 'visible' 
				_fnColumnIndexToVisible( settings, column ) 
				column
		} )
	} )


	// _api_register( 'columns().show()', function () 
	// 	var selector = this.selector
	// 	return this.columns( selector.cols, selector.opts ).visible( true )
	// } )


	// _api_register( 'columns().hide()', function () 
	// 	var selector = this.selector
	// 	return this.columns( selector.cols, selector.opts ).visible( false )
	// } )



	_api_register( 'columns.adjust()', function () 
		return this.iterator( 'table', function ( settings ) 
			_fnAdjustColumnSizing( settings )
		} )
	} )


	// Convert from one column index type, to another typ
	_api_register( 'column.index()', function ( type, idx ) 
		if ( this.context.length !== 0 ) 
			var ctx = this.context[0]

			if ( type === 'fromVisible' || type === 'toData' ) 
				return _fnColumnIndexToVisible( ctx, idx )
			
			else if ( type === 'fromData' || type === 'toVisible' ) 
				return _fnVisibleToColumnIndex( ctx, idx )
			
		
	} )


	_api_register( 'column()', function ( selector, opts ) 
		return _selector_first( this.columns( selector, opts ) )
	} )




	var __cell_selector = function ( settings, selector, opts 
	
		var data = settings.aoData
		var rows = _selector_row_indexes( settings, opts )
		var cells = _pluck_order( data, rows, 'anCells' )
		var allCells = $( [].concat.apply([], cells) )
		var row
		var columns = settings.aoColumns.length
		var a, i, ien, j

		return _selector_run( selector, function ( s ) 
			if ( ! s ) 
				// All cell
				a = []

				for ( i=0, ien=rows.length ; i<ien ; i++ ) 
					row = rows[i]

					for ( j=0 ; j<columns ; j++ ) 
						a.push( 
							row: row
							column: 
						} )
					
				

				return a
			

			// jQuery filtered cell
			return allCells.filter( s ).map( function (i, el) 
				row = el.parentNode._DT_RowIndex

				return 
					row: row
					column: $.inArray( el, data[ row ].anCells 
				}
			} )
		} )
	}




	_api_register( 'cells()', function ( rowSelector, columnSelector, opts ) 
		// Argument shiftin
		if ( $.isPlainObject( rowSelector ) ) 
			opts = rowSelector
			rowSelector = null
		
		if ( $.isPlainObject( columnSelector ) ) 
			opts = columnSelector
			columnSelector = null
		

		// Cell selecto
		if ( columnSelector === null || columnSelector === undefined ) 
			return this.iterator( 'table', function ( settings ) 
				return __cell_selector( settings, rowSelector, _selector_opts( opts ) )
			} )
		

		// Row + column selecto
		var columns = this.columns( columnSelector, opts )
		var rows = this.rows( rowSelector, opts )
		var a, i, ien, j, jen

		var cells = this.iterator( 'table', function ( settings, idx ) 
			a = []

			for ( i=0, ien=rows[idx].length ; i<ien ; i++ ) 
				for ( j=0, jen=columns[idx].length ; j<jen ; j++ ) 
					a.push( 
						row:    rows[idx][i]
						column: columns[idx][j
					} )
				
			

			return a
		} )

		$.extend( cells.selector, 
			cols: columnSelector
			rows: rowSelector
			opts: opt
		} )

		return cells
	} )


	_api_registerPlural( 'cells().nodes()', 'cell().node()', function () 
		return this.iterator( 'cell', function ( settings, row, column ) 
			return settings.aoData[ row ].anCells[ column ]
		} )
	} )


	_api_register( 'cells().data()', function () 
		return this.iterator( 'cell', function ( settings, row, column ) 
			return _fnGetCellData( settings, row, column )
		} )
	} )


	_api_registerPlural( 'cells().cache()', 'cell().cache()', function ( type ) 
		type = type === 'search' ? '_aFilterData' : '_aSortData'

		return this.iterator( 'cell', function ( settings, row, column ) 
			return settings.aoData[ row ][ type ][ column ]
		} )
	} )


	_api_registerPlural( 'cells().indexes()', 'cell().index()', function () 
		return this.iterator( 'cell', function ( settings, row, column ) 
			return 
				row: row
				column: column
				columnVisible: _fnColumnIndexToVisible( settings, column 
			}
		} )
	} )


	_api_register( 
		'cells().invalidate()'
		'cell().invalidate()
	], function ( src ) 
		var selector = this.selector

		// Use the rows method of the instance to perform the invalidation, rathe
		// than doing it here. This avoids needing to handle duplicate rows fro
		// the cells
		this.rows( selector.rows, selector.opts ).invalidate( src )

		return this
	} )




	_api_register( 'cell()', function ( rowSelector, columnSelector, opts ) 
		return _selector_first( this.cells( rowSelector, columnSelector, opts ) )
	} )



	_api_register( 'cell().data()', function ( data ) 
		var ctx = this.context
		var cell = this[0]

		if ( data === undefined ) 
			// Ge
			return ctx.length && cell.length 
				_fnGetCellData( ctx[0], cell[0].row, cell[0].column ) 
				undefined
		

		// Se
		_fnSetCellData( ctx[0], cell[0].row, cell[0].column, data )
		_fnInvalidateRow( ctx[0], cell[0].row, 'data', cell[0].column )

		return this
	} )



	/*
	 * Get current ordering (sorting) that has been applied to the table
	 
	 * @returns {array} 2D array containing the sorting information for the firs
	 *   table in the current context. Each element in the parent array represent
	 *   a column being sorted upon (i.e. multi-sorting with two columns would hav
	 *   2 inner arrays). The inner arrays may have 2 or 3 elements. The first i
	 *   the column index that the sorting condition applies to, the second is th
	 *   direction of the sort (`desc` or `asc`) and, optionally, the third is th
	 *   index of the sorting order from the `column.sorting` initialisation array
	 *//*
	 * Set the ordering for the table
	 
	 * @param {integer} order Column index to sort upon
	 * @param {string} direction Direction of the sort to be applied (`asc` or `desc`
	 * @returns {DataTables.Api} thi
	 *//*
	 * Set the ordering for the table
	 
	 * @param {array} order 1D array of sorting information to be applied
	 * @param {array} [...] Optional additional sorting condition
	 * @returns {DataTables.Api} thi
	 *//*
	 * Set the ordering for the table
	 
	 * @param {array} order 2D array of sorting information to be applied
	 * @returns {DataTables.Api} thi
	 *
	_api_register( 'order()', function ( order, dir ) 
		var ctx = this.context

		if ( order === undefined ) 
			// ge
			return ctx.length !== 0 
				ctx[0].aaSorting 
				undefined
		

		// se
		if ( typeof order === 'number' ) 
			// Simple column / direction passed i
			order = [ [ order, dir ] ]
		
		else if ( ! $.isArray( order[0] ) ) 
			// Arguments passed in (list of 1D arrays
			order = Array.prototype.slice.call( arguments )
		
		// otherwise a 2D array was passed i

		return this.iterator( 'table', function ( settings ) 
			settings.aaSorting = order.slice()
		} )
	} )


	/*
	 * Attach a sort listener to an element for a given colum
	 
	 * @param {node|jQuery|string} node Identifier for the element(s) to attach th
	 *   listener to. This can take the form of a single DOM node, a jQuer
	 *   collection of nodes or a jQuery selector which will identify the node(s)
	 * @param {integer} column the column that a click on this node will sort o
	 * @param {function} [callback] callback function when sort is ru
	 * @returns {DataTables.Api} thi
	 *
	_api_register( 'order.listener()', function ( node, column, callback ) 
		return this.iterator( 'table', function ( settings ) 
			_fnSortAttachListener( settings, node, column, callback )
		} )
	} )


	// Order by the selected column(s
	_api_register( 
		'columns().order()'
		'column().order()
	], function ( dir ) 
		var that = this

		return this.iterator( 'table', function ( settings, i ) 
			var sort = []

			$.each( that[i], function (j, col) 
				sort.push( [ col, dir ] )
			} )

			settings.aaSorting = sort
		} )
	} )



	_api_register( 'search()', function ( input, regex, smart, caseInsen ) 
		var ctx = this.context

		if ( input === undefined ) 
			// ge
			return ctx.length !== 0 
				ctx[0].oPreviousSearch.sSearch 
				undefined
		

		// se
		return this.iterator( 'table', function ( settings ) 
			if ( ! settings.oFeatures.bFilter ) 
				return
			

			_fnFilterComplete( settings, $.extend( {}, settings.oPreviousSearch, 
				"sSearch": input+""
				"bRegex":  regex === null ? false : regex
				"bSmart":  smart === null ? true  : smart
				"bCaseInsensitive": caseInsen === null ? true : caseInse
			} ), 1 )
		} )
	} )


	_api_register( 
		'columns().search()'
		'column().search()
	], function ( input, regex, smart, caseInsen ) 
		return this.iterator( 'column', function ( settings, column ) 
			var preSearch = settings.aoPreSearchCols

			if ( input === undefined ) 
				// ge
				return preSearch[ column ].sSearch
			

			// se
			if ( ! settings.oFeatures.bFilter ) 
				return
			

			$.extend( preSearch[ column ], 
				"sSearch": input+""
				"bRegex":  regex === null ? false : regex
				"bSmart":  smart === null ? true  : smart
				"bCaseInsensitive": caseInsen === null ? true : caseInse
			} )

			_fnFilterComplete( settings, settings.oPreviousSearch, 1 )
		} )
	} )



	/*
	 * Provide a common method for plug-ins to check the version of DataTables bein
	 * used, in order to ensure compatibility
	 
	 *  @param {string} version Version string to check for, in the format "X.Y.Z"
	 *    Note that the formats "X" and "X.Y" are also acceptable
	 *  @returns {boolean} true if this version of DataTables is greater or equal t
	 *    the required version, or false if this version of DataTales is no
	 *    suitabl
	 *  @stati
	 *  @dtopt API-Stati
	 
	 *  @exampl
	 *    alert( $.fn.dataTable.versionCheck( '1.9.0' ) )
	 *
	DataTable.versionCheck = DataTable.fnVersionCheck = function( version 
	
		var aThis = DataTable.version.split('.')
		var aThat = version.split('.')
		var iThis, iThat

		for ( var i=0, iLen=aThat.length ; i<iLen ; i++ ) 
			iThis = parseInt( aThis[i], 10 ) || 0
			iThat = parseInt( aThat[i], 10 ) || 0

			// Parts are the same, keep comparin
			if (iThis === iThat) 
				continue
			

			// Parts are different, return immediatel
			return iThis > iThat
		

		return true
	}


	/*
	 * Check if a `<table>` node is a DataTable table already or not
	 
	 *  @param {node|jquery|string} table Table node, jQuery object or jQuer
	 *      selector for the table to test. Note that if more than more than on
	 *      table is passed on, only the first will be checke
	 *  @returns {boolean} true the table given is a DataTable, or false otherwis
	 *  @stati
	 *  @dtopt API-Stati
	 
	 *  @exampl
	 *    if ( ! $.fn.DataTable.isDataTable( '#example' ) ) 
	 *      $('#example').dataTable()
	 *    
	 *
	DataTable.isDataTable = DataTable.fnIsDataTable = function ( table 
	
		var t = $(table).get(0)
		var is = false

		$.each( DataTable.settings, function (i, o) 
			if ( o.nTable === t || o.nScrollHead === t || o.nScrollFoot === t ) 
				is = true
			
		} )

		return is
	}


	/*
	 * Get all DataTable tables that have been initialised - optionally you ca
	 * select to get only currently visible tables
	 
	 *  @param {boolean} [visible=false] Flag to indicate if you want all (default
	 *    or visible tables only
	 *  @returns {array} Array of `table` nodes (not DataTable instances) which ar
	 *    DataTable
	 *  @stati
	 *  @dtopt API-Stati
	 
	 *  @exampl
	 *    $.each( $.fn.dataTable.tables(true), function () 
	 *      $(table).DataTable().columns.adjust()
	 *    } )
	 *
	DataTable.tables = DataTable.fnTables = function ( visible 
	
		return jQuery.map( DataTable.settings, function (o) 
			if ( !visible || (visible && $(o.nTable).is(':visible')) ) 
				return o.nTable
			
		} )
	}



	/*
	 
	 *
	_api_register( '$()', function ( selector, opts ) 
		va
			rows   = this.rows( opts ).nodes(), // Get all row
			jqRows = $(rows)

		return $( [].concat
			jqRows.filter( selector ).toArray()
			jqRows.find( selector ).toArray(
		) )
	} )


	// jQuery functions to operate on the table
	$.each( [ 'on', 'one', 'off' ], function (i, key) 
		_api_register( key+'()', function ( /* event, handler */ ) 
			var args = Array.prototype.slice.call(arguments)

			// Add the `dt` namespace automatically if it isn't already presen
			if ( args[0].indexOf( '.dt' ) === -1 ) 
				args[0] += '.dt'
			

			var inst = $( this.tables().nodes() )
			inst[key].apply( inst, args )
			return this
		} )
	} )


	_api_register( 'clear()', function () 
		return this.iterator( 'table', function ( settings ) 
			_fnClearTable( settings )
		} )
	} )


	_api_register( 'settings()', function () 
		return new _Api( this.context, this.context )
	} )


	_api_register( 'data()', function () 
		return this.iterator( 'table', function ( settings ) 
			return _pluck( settings.aoData, '_aData' )
		} ).flatten()
	} )


	_api_register( 'destroy()', function ( remove ) 
		remove = remove || false

		return this.iterator( 'table', function ( settings ) 
			var orig      = settings.nTableWrapper.parentNode
			var classes   = settings.oClasses
			var table     = settings.nTable
			var tbody     = settings.nTBody
			var thead     = settings.nTHead
			var tfoot     = settings.nTFoot
			var jqTable   = $(table)
			var jqTbody   = $(tbody)
			var jqWrapper = $(settings.nTableWrapper)
			var rows      = $.map( settings.aoData, function (r) { return r.nTr; } )
			var i, ien

			// Flag to note that the table is currently being destroyed - no actio
			// should be take
			settings.bDestroying = true

			// Fire off the destroy callbacks for plug-ins et
			_fnCallbackFire( settings, "aoDestroyCallback", "destroy", [settings] )

			// If not being removed from the document, make all columns visibl
			if ( ! remove ) 
				new _Api( settings ).columns().visible( true )
			

			// Blitz all DT event
			jqWrapper.unbind('.DT').find(':not(tbody *)').unbind('.DT')
			$(window).unbind('.DT-'+settings.sInstance)

			// When scrolling we had to break the table up - restore i
			if ( table != thead.parentNode ) 
				jqTable.children('thead').remove()
				jqTable.append( thead )
			

			if ( tfoot && table != tfoot.parentNode ) 
				jqTable.children('tfoot').remove()
				jqTable.append( tfoot )
			

			// Remove the DataTables generated nodes, events and classe
			jqTable.remove()
			jqWrapper.remove()

			settings.aaSorting = []
			settings.aaSortingFixed = []
			_fnSortingClasses( settings )

			$( rows ).removeClass( settings.asStripeClasses.join(' ') )

			$('th, td', thead).removeClass( classes.sSortable+' '
				classes.sSortableAsc+' '+classes.sSortableDesc+' '+classes.sSortableNon
			)

			if ( settings.bJUI ) 
				$('th span.'+classes.sSortIcon+ ', td span.'+classes.sSortIcon, thead).remove()
				$('th, td', thead).each( function () 
					var wrapper = $('div.'+classes.sSortJUIWrapper, this)
					$(this).append( wrapper.contents() )
					wrapper.remove()
				} )
			

			if ( ! remove ) 
				// insertBefore acts like appendChild if !arg[1
				orig.insertBefore( table, settings.nTableReinsertBefore )
			

			// Add the TR elements back into the table in their original orde
			jqTbody.children().detach()
			jqTbody.append( rows )

			// Restore the width of the original table - was read from the style property
			// so we can restore directly to tha
			jqTabl
				.css( 'width', settings.sDestroyWidth 
				.removeClass( classes.sTable )

			// If the were originally stripe classes - then we add them back here
			// Note this is not fool proof (for example if not all rows had strip
			// classes - but it's a good effort without getting carried awa
			ien = settings.asDestroyStripes.length

			if ( ien ) 
				jqTbody.children().each( function (i) 
					$(this).addClass( settings.asDestroyStripes[i % ien] )
				} )
			

			/* Remove the settings object from the settings array *
			var idx = $.inArray( settings, DataTable.settings )
			if ( idx !== -1 ) 
				DataTable.settings.splice( idx, 1 )
			
		} )
	} )


	/*
	 * Version string for plug-ins to check compatibility. Allowed format i
	 * `a.b.c-d` where: a:int, b:int, c:int, d:string(dev|beta|alpha). `d` is use
	 * only for non-release builds. See http://semver.org/ for more information
	 *  @membe
	 *  @type strin
	 *  @default Version numbe
	 *
	DataTable.version = "1.10.0-dev"

	/*
	 * Private data store, containing all of the settings objects that ar
	 * created for the tables on a given page
	 
	 * Note that the `DataTable.settings` object is aliased t
	 * `jQuery.fn.dataTableExt` through which it may be accessed an
	 * manipulated, or `jQuery.fn.dataTable.settings`
	 *  @membe
	 *  @type arra
	 *  @default [
	 *  @privat
	 *
	DataTable.settings = []

	/*
	 * Object models container, for the various models that DataTables ha
	 * available to it. These models define the objects that are used to hol
	 * the active state and configuration of the table
	 *  @namespac
	 *
	DataTable.models = {}



	/*
	 * Template object for the way in which DataTables holds information abou
	 * search information for the global filter and individual column filters
	 *  @namespac
	 *
	DataTable.models.oSearch = 
		/*
		 * Flag to indicate if the filtering should be case insensitive or no
		 *  @type boolea
		 *  @default tru
		 *
		"bCaseInsensitive": true

		/*
		 * Applied search ter
		 *  @type strin
		 *  @default <i>Empty string</i
		 *
		"sSearch": ""

		/*
		 * Flag to indicate if the search term should be interpreted as 
		 * regular expression (true) or not (false) and therefore and specia
		 * regex characters escaped
		 *  @type boolea
		 *  @default fals
		 *
		"bRegex": false

		/*
		 * Flag to indicate if DataTables is to use its smart filtering or not
		 *  @type boolea
		 *  @default tru
		 *
		"bSmart": tru
	}




	/*
	 * Template object for the way in which DataTables holds information abou
	 * each individual row. This is the object format used for the setting
	 * aoData array
	 *  @namespac
	 *
	DataTable.models.oRow = 
		/*
		 * TR element for the ro
		 *  @type nod
		 *  @default nul
		 *
		"nTr": null

		/*
		 * Array of TD elements for each row. This is null until the row has bee
		 * created
		 *  @type array node
		 *  @default [
		 *
		"anCells": null

		/*
		 * Data object from the original data source for the row. This is eithe
		 * an array if using the traditional form of DataTables, or an object i
		 * using mData options. The exact type will depend on the passed i
		 * data from the data source, or will be an array if using DOM a dat
		 * source
		 *  @type array|objec
		 *  @default [
		 *
		"_aData": []

		/*
		 * Sorting data cache - this array is ostensibly the same length as th
		 * number of columns (although each index is generated only as it i
		 * needed), and holds the data that is used for sorting each column in th
		 * row. We do this cache generation at the start of the sort in order tha
		 * the formatting of the sort data need be done only once for each cel
		 * per sort. This array should not be read from or written to by anythin
		 * other than the master sorting methods
		 *  @type arra
		 *  @default nul
		 *  @privat
		 *
		"_aSortData": null

		/*
		 * Per cell filtering data cache. As per the sort data cache, used t
		 * increase the performance of the filtering in DataTable
		 *  @type arra
		 *  @default nul
		 *  @privat
		 *
		"_aFilterData": null

		/*
		 * Filtering data cache. This is the same as the cell filtering cache, bu
		 * in this case a string rather than an array. This is easily computed wit
		 * a join on `_aFilterData`, but is provided as a cache so the join isn'
		 * needed on every search (memory traded for performance
		 *  @type arra
		 *  @default nul
		 *  @privat
		 *
		"_sFilterRow": null

		/*
		 * Cache of the class name that DataTables has applied to the row, so w
		 * can quickly look at this variable rather than needing to do a DOM chec
		 * on className for the nTr property
		 *  @type strin
		 *  @default <i>Empty string</i
		 *  @privat
		 *
		"_sRowStripe": ""

		/*
		 * Denote if the original data source was from the DOM, or the data sourc
		 * object. This is used for invalidating data, so DataTables ca
		 * automatically read data from the original source, unless uninstructe
		 * otherwise
		 *  @type strin
		 *  @default nul
		 *  @privat
		 *
		"src": nul
	}



	/*
	 * Template object for the column information object in DataTables. This objec
	 * is held in the settings aoColumns array and contains all the information tha
	 * DataTables needs about each individual column
	 
	 * Note that this object is related to {@link DataTable.defaults.column
	 * but this one is the internal data store for DataTables's cache of columns
	 * It should NOT be manipulated outside of DataTables. Any configuration shoul
	 * be done through the initialisation options
	 *  @namespac
	 *
	DataTable.models.oColumn = 
		/*
		 * A list of the columns that sorting should occur on when this colum
		 * is sorted. That this property is an array allows multi-column sortin
		 * to be defined for a column (for example first name / last name column
		 * would benefit from this). The values are integers pointing to th
		 * columns to be sorted on (typically it will be a single integer pointin
		 * at itself, but that doesn't need to be the case)
		 *  @type arra
		 *
		"aDataSort": null

		/*
		 * Define the sorting directions that are applied to the column, in sequenc
		 * as the column is repeatedly sorted upon - i.e. the first value is use
		 * as the sorting direction when the column if first sorted (clicked on)
		 * Sort it again (click again) and it will move on to the next index
		 * Repeat until loop
		 *  @type arra
		 *
		"asSorting": null

		/*
		 * Flag to indicate if the column is searchable, and thus should be include
		 * in the filtering or not
		 *  @type boolea
		 *
		"bSearchable": null

		/*
		 * Flag to indicate if the column is sortable or not
		 *  @type boolea
		 *
		"bSortable": null

		/*
		 * Flag to indicate if the column is currently visible in the table or no
		 *  @type boolea
		 *
		"bVisible": null

		/*
		 * Store for manual type assignment using the `column.type` option. Thi
		 * is held in store so we can manipulate the column's `sType` property
		 *  @type strin
		 *  @default nul
		 *  @privat
		 *
		"_sManualType": null

		/*
		 * Flag to indicate if HTML5 data attributes should be used as the dat
		 * source for filtering or sorting. True is either are
		 *  @type boolea
		 *  @default fals
		 *  @privat
		 *
		"_bAttrSrc": false

		/*
		 * Developer definable function that is called whenever a cell is created (Ajax source
		 * etc) or processed for input (DOM source). This can be used as a compliment to mRende
		 * allowing you to modify the DOM element (add background colour for example) when th
		 * element is available
		 *  @type functio
		 *  @param {element} nTd The TD node that has been create
		 *  @param {*} sData The Data for the cel
		 *  @param {array|object} oData The data for the whole ro
		 *  @param {int} iRow The row index for the aoData data stor
		 *  @default nul
		 *
		"fnCreatedCell": null

		/*
		 * Function to get data from a cell in a column. You should <b>never</b
		 * access data directly through _aData internally in DataTables - always us
		 * the method attached to this property. It allows mData to function a
		 * required. This function is automatically assigned by the colum
		 * initialisation metho
		 *  @type functio
		 *  @param {array|object} oData The data array/object for the arra
		 *    (i.e. aoData[]._aData
		 *  @param {string} sSpecific The specific data type you want to get 
		 *    'display', 'type' 'filter' 'sort
		 *  @returns {*} The data for the cell from the given row's dat
		 *  @default nul
		 *
		"fnGetData": null

		/*
		 * Function to set data for a cell in the column. You should <b>never</b
		 * set the data directly to _aData internally in DataTables - always us
		 * this method. It allows mData to function as required. This functio
		 * is automatically assigned by the column initialisation metho
		 *  @type functio
		 *  @param {array|object} oData The data array/object for the arra
		 *    (i.e. aoData[]._aData
		 *  @param {*} sValue Value to se
		 *  @default nul
		 *
		"fnSetData": null

		/*
		 * Property to read the value for the cells in the column from the dat
		 * source array / object. If null, then the default content is used, if 
		 * function is given then the return from the function is used
		 *  @type function|int|string|nul
		 *  @default nul
		 *
		"mData": null

		/*
		 * Partner property to mData which is used (only when defined) to ge
		 * the data - i.e. it is basically the same as mData, but without th
		 * 'set' option, and also the data fed to it is the result from mData
		 * This is the rendering method to match the data method of mData
		 *  @type function|int|string|nul
		 *  @default nul
		 *
		"mRender": null

		/*
		 * Unique header TH/TD element for this column - this is what the sortin
		 * listener is attached to (if sorting is enabled.
		 *  @type nod
		 *  @default nul
		 *
		"nTh": null

		/*
		 * Unique footer TH/TD element for this column (if there is one). Not use
		 * in DataTables as such, but can be used for plug-ins to reference th
		 * footer for each column
		 *  @type nod
		 *  @default nul
		 *
		"nTf": null

		/*
		 * The class to apply to all TD elements in the table's TBODY for the colum
		 *  @type strin
		 *  @default nul
		 *
		"sClass": null

		/*
		 * When DataTables calculates the column widths to assign to each column
		 * it finds the longest string in each column and then constructs 
		 * temporary table and reads the widths from that. The problem with thi
		 * is that "mmm" is much wider then "iiii", but the latter is a longe
		 * string - thus the calculation can go wrong (doing it properly and puttin
		 * it into an DOM object and measuring that is horribly(!) slow). Thus a
		 * a "work around" we provide this option. It will append its value to th
		 * text that is found to be the longest string for the column - i.e. padding
		 *  @type strin
		 *
		"sContentPadding": null

		/*
		 * Allows a default value to be given for a column's data, and will be use
		 * whenever a null data source is encountered (this can be because mDat
		 * is set to null, or because the data source itself is null)
		 *  @type strin
		 *  @default nul
		 *
		"sDefaultContent": null

		/*
		 * Name for the column, allowing reference to the column by name as well a
		 * by index (needs a lookup to work by name)
		 *  @type strin
		 *
		"sName": null

		/*
		 * Custom sorting data type - defines which of the available plug-ins i
		 * afnSortData the custom sorting will use - if any is defined
		 *  @type strin
		 *  @default st
		 *
		"sSortDataType": 'std'

		/*
		 * Class to be applied to the header element when sorting on this colum
		 *  @type strin
		 *  @default nul
		 *
		"sSortingClass": null

		/*
		 * Class to be applied to the header element when sorting on this column 
		 * when jQuery UI theming is used
		 *  @type strin
		 *  @default nul
		 *
		"sSortingClassJUI": null

		/*
		 * Title of the column - what is seen in the TH element (nTh)
		 *  @type strin
		 *
		"sTitle": null

		/*
		 * Column sorting and filtering typ
		 *  @type strin
		 *  @default nul
		 *
		"sType": null

		/*
		 * Width of the colum
		 *  @type strin
		 *  @default nul
		 *
		"sWidth": null

		/*
		 * Width of the column when it was first "encountered
		 *  @type strin
		 *  @default nul
		 *
		"sWidthOrig": nul
	}


	/
	 * Developer note: The properties of the object below are given in Hungaria
	 * notation, that was used as the interface for DataTables prior to v1.10, howeve
	 * from v1.10 onwards the primary interface is camel case. In order to avoi
	 * breaking backwards compatibility utterly with this change, the Hungaria
	 * version is still, internally the primary interface, but is is not documente
	 * - hence the @name tags in each doc comment. This allows a Javascript functio
	 * to create a map from Hungarian notation to camel case (going the other directio
	 * would require each property to be listed, which would at around 3K to the siz
	 * of DataTables, while this method is about a 0.5K hit
	 
	 * Ultimately this does pave the way for Hungarian notation to be droppe
	 * completely, but that is a massive amount of work and will break curren
	 * installs (therefore is on-hold until v2)
	 *

	/*
	 * Initialisation options that can be given to DataTables at initialisatio
	 * time
	 *  @namespac
	 *
	DataTable.defaults = 
		/*
		 * An array of data to use for the table, passed in at initialisation whic
		 * will be used in preference to any data which is already in the DOM. This i
		 * particularly useful for constructing tables purely in Javascript, fo
		 * example with a custom Ajax call
		 *  @type arra
		 *  @default nul
		 
		 *  @dtopt Optio
		 *  @name DataTable.defaults.dat
		 
		 *  @exampl
		 *    // Using a 2D array data sourc
		 *    $(document).ready( function () 
		 *      $('#example').dataTable( 
		 *        "data": 
		 *          ['Trident', 'Internet Explorer 4.0', 'Win 95+', 4, 'X']
		 *          ['Trident', 'Internet Explorer 5.0', 'Win 95+', 5, 'C']
		 *        ]
		 *        "columns": 
		 *          { "title": "Engine" }
		 *          { "title": "Browser" }
		 *          { "title": "Platform" }
		 *          { "title": "Version" }
		 *          { "title": "Grade" 
		 *        
		 *      } )
		 *    } )
		 
		 *  @exampl
		 *    // Using an array of objects as a data source (`data`
		 *    $(document).ready( function () 
		 *      $('#example').dataTable( 
		 *        "data": 
		 *          
		 *            "engine":   "Trident"
		 *            "browser":  "Internet Explorer 4.0"
		 *            "platform": "Win 95+"
		 *            "version":  4
		 *            "grade":    "X
		 *          }
		 *          
		 *            "engine":   "Trident"
		 *            "browser":  "Internet Explorer 5.0"
		 *            "platform": "Win 95+"
		 *            "version":  5
		 *            "grade":    "C
		 *          
		 *        ]
		 *        "columns": 
		 *          { "title": "Engine",   "data": "engine" }
		 *          { "title": "Browser",  "data": "browser" }
		 *          { "title": "Platform", "data": "platform" }
		 *          { "title": "Version",  "data": "version" }
		 *          { "title": "Grade",    "data": "grade" 
		 *        
		 *      } )
		 *    } )
		 *
		"aaData": null


		/*
		 * If ordering is enabled, then DataTables will perform a first pass sort o
		 * initialisation. You can define which column(s) the sort is performe
		 * upon, and the sorting direction, with this variable. The `sorting` arra
		 * should contain an array for each column to be sorted initially containin
		 * the column's index and a direction string ('asc' or 'desc')
		 *  @type arra
		 *  @default [[0,'asc']
		 
		 *  @dtopt Optio
		 *  @name DataTable.defaults.orde
		 
		 *  @exampl
		 *    // Sort by 3rd column first, and then 4th colum
		 *    $(document).ready( function() 
		 *      $('#example').dataTable( 
		 *        "order": [[2,'asc'], [3,'desc']
		 *      } )
		 *    } )
		 
		 *    // No initial sortin
		 *    $(document).ready( function() 
		 *      $('#example').dataTable( 
		 *        "order": [
		 *      } )
		 *    } )
		 *
		"aaSorting": [[0,'asc']]


		/*
		 * This parameter is basically identical to the `sorting` parameter, bu
		 * cannot be overridden by user interaction with the table. What this mean
		 * is that you could have a column (visible or hidden) which the sortin
		 * will always be forced on first - any sorting after that (from the user
		 * will then be performed as required. This can be useful for grouping row
		 * together
		 *  @type arra
		 *  @default nul
		 
		 *  @dtopt Optio
		 *  @name DataTable.defaults.orderFixe
		 
		 *  @exampl
		 *    $(document).ready( function() 
		 *      $('#example').dataTable( 
		 *        "orderFixed": [[0,'asc']
		 *      } )
		 *    } 
		 *
		"aaSortingFixed": []


		/*
		 * DataTables can be instructed to load data to display in the table from 
		 * Ajax source. This option defines how that Ajax call is made and where to
		 
		 * The `ajax` property has three different modes of operation, depending o
		 * how it is defined. These are
		 
		 * * `string` - Set the URL from where the data should be loaded from
		 * * `object` - Define properties for `jQuery.ajax`
		 * * `function` - Custom data get functio
		 
		 * `string
		 * -------
		 
		 * As a string, the `ajax` property simply defines the URL from whic
		 * DataTables will load data
		 
		 * `object
		 * -------
		 
		 * As an object, the parameters in the object are passed t
		 * [jQuery.ajax](http://api.jquery.com/jQuery.ajax/) allowing fine contro
		 * of the Ajax request. DataTables has a number of default parameters whic
		 * you can override using this option. Please refer to the jQuer
		 * documentation for a full description of the options available, althoug
		 * the following parameters provide additional options in DataTables o
		 * require special consideration
		 
		 * * `data` - As with jQuery, `data` can be provided as an object, but i
		 *   can also be used as a function to manipulate the data DataTables send
		 *   to the server. The function takes a single parameter, an object o
		 *   parameters with the values that DataTables has readied for sending. A
		 *   object may be returned which will be merged into the DataTable
		 *   defaults, or you can add the items to the object that was passed in an
		 *   not return anything from the function. This supersedes `fnServerParams
		 *   from DataTables 1.9-
		 
		 * * `dataSrc` - By default DataTables will look for the property `data` (o
		 *   `aaData` for compatibility with DataTables 1.9-) when obtaining dat
		 *   from an Ajax source or for server-side processing - this paramete
		 *   allows that property to be changed. You can use Javascript dotte
		 *   object notation to get a data source for multiple levels of nesting, o
		 *   it my be used as a function. As a function it takes a single parameter
		 *   the JSON returned from the server, which can be manipulated a
		 *   required, with the returned value being that used by DataTables as th
		 *   data source for the table. This supersedes `sAjaxDataProp` fro
		 *   DataTables 1.9-
		 
		 * * `success` - Should not be overridden it is used internally i
		 *   DataTables. To manipulate / transform the data returned by the serve
		 *   use `ajax.dataSrc`, or use `ajax` as a function (see below)
		 
		 * `function
		 * ---------
		 
		 * As a function, making the Ajax call is left up to yourself allowin
		 * complete control of the Ajax request. Indeed, if desired, a method othe
		 * than Ajax could be used to obtain the required data, such as Web storag
		 * or an AIR database
		 
		 * The function is given four parameters and no return is required. Th
		 * parameters are
		 
		 * 1. _object_ - Data to send to the serve
		 * 2. _function_ - Callback function that must be executed when the require
		 *    data has been obtained. That data should be passed into the callbac
		 *    as the only paramete
		 * 3. _object_ - DataTables settings object for the tabl
		 
		 * Note that this supersedes `fnServerData` from DataTables 1.9-
		 
		 *  @type string|object|functio
		 *  @default nul
		 
		 *  @dtopt Optio
		 *  @name DataTable.defaults.aja
		 *  @since 1.10.
		 
		 * @exampl
		 *   // Get JSON data from a file via Ajax
		 *   // Note DataTables expects data in the form `{ data: [ ...data... ] }` by default)
		 *   $('#example').dataTable( 
		 *     "ajax": "data.json
		 *   } )
		 
		 * @exampl
		 *   // Get JSON data from a file via Ajax, using `dataSrc` to chang
		 *   // `data` to `tableData` (i.e. `{ tableData: [ ...data... ] }`
		 *   $('#example').dataTable( 
		 *     "ajax": 
		 *       "url": "data.json"
		 *       "dataSrc": "tableData
		 *     
		 *   } )
		 
		 * @exampl
		 *   // Get JSON data from a file via Ajax, using `dataSrc` to read dat
		 *   // from a plain array rather than an array in an objec
		 *   $('#example').dataTable( 
		 *     "ajax": 
		 *       "url": "data.json"
		 *       "dataSrc": "
		 *     
		 *   } )
		 
		 * @exampl
		 *   // Manipulate the data returned from the server - add a link to dat
		 *   // (note this can, should, be done using `render` for the column - thi
		 *   // is just a simple example of how the data can be manipulated)
		 *   $('#example').dataTable( 
		 *     "ajax": 
		 *       "url": "data.json"
		 *       "dataSrc": function ( json ) 
		 *         for ( var i=0, ien=json.length ; i<ien ; i++ ) 
		 *           json[i][0] = '<a href="/message/'+json[i][0]+'>View message</a>'
		 *         
		 *         return json
		 *       
		 *     
		 *   } )
		 
		 * @exampl
		 *   // Add data to the reques
		 *   $('#example').dataTable( 
		 *     "ajax": 
		 *       "url": "data.json"
		 *       "data": function ( d ) 
		 *         return 
		 *           "extra_search": $('#extra').val(
		 *         }
		 *       
		 *     
		 *   } )
		 
		 * @exampl
		 *   // Send request as POS
		 *   $('#example').dataTable( 
		 *     "ajax": 
		 *       "url": "data.json"
		 *       "type": "POST
		 *     
		 *   } )
		 
		 * @exampl
		 *   // Get the data from localStorage (could interface with a form fo
		 *   // adding, editing and removing rows)
		 *   $('#example').dataTable( 
		 *     "ajax": function (data, callback, settings) 
		 *       callback
		 *         JSON.parse( localStorage.getItem('dataTablesData') 
		 *       )
		 *     
		 *   } )
		 *
		"ajax": null


		/*
		 * This parameter allows you to readily specify the entries in the length dro
		 * down menu that DataTables shows when pagination is enabled. It can b
		 * either a 1D array of options which will be used for both the displaye
		 * option and the value, or a 2D array which will use the array in the firs
		 * position as the value, and the array in the second position as th
		 * displayed options (useful for language strings such as 'All')
		 
		 * Note that the `pageLength` property will be automatically set to th
		 * first value given in this array, unless `pageLength` is also provided
		 *  @type arra
		 *  @default [ 10, 25, 50, 100 
		 
		 *  @dtopt Optio
		 *  @name DataTable.defaults.lengthMen
		 
		 *  @exampl
		 *    $(document).ready( function() 
		 *      $('#example').dataTable( 
		 *        "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]
		 *      } )
		 *    } )
		 *
		"aLengthMenu": [ 10, 25, 50, 100 ]


		/*
		 * The `columns` option in the initialisation parameter allows you to defin
		 * details about the way individual columns behave. For a full list o
		 * column options that can be set, please se
		 * {@link DataTable.defaults.column}. Note that if you use `columns` t
		 * define your columns, you must have an entry in the array for every singl
		 * column that you have in your table (these can be null if you don't whic
		 * to specify any options)
		 *  @membe
		 
		 *  @name DataTable.defaults.colum
		 *
		"aoColumns": null

		/*
		 * Very similar to `columns`, `columnDefs` allows you to target a specifi
		 * column, multiple columns, or all columns, using the `targets` property o
		 * each object in the array. This allows great flexibility when creatin
		 * tables, as the `columnDefs` arrays can be of any length, targeting th
		 * columns you specifically want. `columnDefs` may use any of the colum
		 * options available: {@link DataTable.defaults.column}, but it _must
		 * have `targets` defined in each object in the array. Values in the `targets
		 * array may be
		 *   <ul
		 *     <li>a string - class name will be matched on the TH for the column</li
		 *     <li>0 or a positive integer - column index counting from the left</li
		 *     <li>a negative integer - column index counting from the right</li
		 *     <li>the string "_all" - all columns (i.e. assign a default)</li
		 *   </ul
		 *  @membe
		 
		 *  @name DataTable.defaults.columnDef
		 *
		"aoColumnDefs": null


		/*
		 * Basically the same as `search`, this parameter defines the individual colum
		 * filtering state at initialisation time. The array must be of the same siz
		 * as the number of columns, and each element be an object with the parameter
		 * `search` and `escapeRegex` (the latter is optional). 'null' is als
		 * accepted and the default will be used
		 *  @type arra
		 *  @default [
		 
		 *  @dtopt Optio
		 *  @name DataTable.defaults.searchCol
		 
		 *  @exampl
		 *    $(document).ready( function() 
		 *      $('#example').dataTable( 
		 *        "searchCols": 
		 *          null
		 *          { "search": "My filter" }
		 *          null
		 *          { "search": "^[0-9]", "escapeRegex": false 
		 *        
		 *      } )
		 *    } 
		 *
		"aoSearchCols": []


		/*
		 * An array of CSS classes that should be applied to displayed rows. Thi
		 * array may be of any length, and DataTables will apply each clas
		 * sequentially, looping when required
		 *  @type arra
		 *  @default null <i>Will take the values determined by the `oClasses.stripe*
		 *    options</i
		 
		 *  @dtopt Optio
		 *  @name DataTable.defaults.stripeClasse
		 
		 *  @exampl
		 *    $(document).ready( function() 
		 *      $('#example').dataTable( 
		 *        "stripeClasses": [ 'strip1', 'strip2', 'strip3' 
		 *      } )
		 *    } 
		 *
		"asStripeClasses": null


		/*
		 * Enable or disable automatic column width calculation. This can be disable
		 * as an optimisation (it takes some time to calculate the widths) if th
		 * tables widths are passed in using `columns`
		 *  @type boolea
		 *  @default tru
		 
		 *  @dtopt Feature
		 *  @name DataTable.defaults.autoWidt
		 
		 *  @exampl
		 *    $(document).ready( function () 
		 *      $('#example').dataTable( 
		 *        "autoWidth": fals
		 *      } )
		 *    } )
		 *
		"bAutoWidth": true


		/*
		 * Deferred rendering can provide DataTables with a huge speed boost when yo
		 * are using an Ajax or JS data source for the table. This option, when set t
		 * true, will cause DataTables to defer the creation of the table elements fo
		 * each row until they are needed for a draw - saving a significant amount o
		 * time
		 *  @type boolea
		 *  @default fals
		 
		 *  @dtopt Feature
		 *  @name DataTable.defaults.deferRende
		 
		 *  @exampl
		 *    $(document).ready( function() 
		 *      $('#example').dataTable( 
		 *        "ajax": "sources/arrays.txt"
		 *        "deferRender": tru
		 *      } )
		 *    } )
		 *
		"bDeferRender": false


		/*
		 * Replace a DataTable which matches the given selector and replace it wit
		 * one which has the properties of the new initialisation object passed. If n
		 * table matches the selector, then the new DataTable will be constructed a
		 * per normal
		 *  @type boolea
		 *  @default fals
		 
		 *  @dtopt Option
		 *  @name DataTable.defaults.destro
		 
		 *  @exampl
		 *    $(document).ready( function() 
		 *      $('#example').dataTable( 
		 *        "srollY": "200px"
		 *        "paginate": fals
		 *      } )
		 
		 *      // Some time later...
		 *      $('#example').dataTable( 
		 *        "filter": false
		 *        "destroy": tru
		 *      } )
		 *    } )
		 *
		"bDestroy": false


		/*
		 * Enable or disable filtering of data. Filtering in DataTables is "smart" i
		 * that it allows the end user to input multiple words (space separated) an
		 * will match a row containing those words, even if not in the order that wa
		 * specified (this allow matching across multiple columns). Note that if yo
		 * wish to use filtering in DataTables this must remain 'true' - to remove th
		 * default filtering input box and retain filtering abilities, please us
		 * {@link DataTable.defaults.dom}
		 *  @type boolea
		 *  @default tru
		 
		 *  @dtopt Feature
		 *  @name DataTable.defaults.searchin
		 
		 *  @exampl
		 *    $(document).ready( function () 
		 *      $('#example').dataTable( 
		 *        "searching": fals
		 *      } )
		 *    } )
		 *
		"bFilter": true


		/*
		 * Enable or disable the table information display. This shows informatio
		 * about the data that is currently visible on the page, including informatio
		 * about filtered data if that action is being performed
		 *  @type boolea
		 *  @default tru
		 
		 *  @dtopt Feature
		 *  @name DataTable.defaults.inf
		 
		 *  @exampl
		 *    $(document).ready( function () 
		 *      $('#example').dataTable( 
		 *        "info": fals
		 *      } )
		 *    } )
		 *
		"bInfo": true


		/*
		 * Enable jQuery UI ThemeRoller support (required as ThemeRoller requires som
		 * slightly different and additional mark-up from what DataTables ha
		 * traditionally used)
		 *  @type boolea
		 *  @default fals
		 
		 *  @dtopt Feature
		 *  @name DataTable.defaults.jQueryU
		 
		 *  @exampl
		 *    $(document).ready( function() 
		 *      $('#example').dataTable( 
		 *        "jQueryUI": tru
		 *      } )
		 *    } )
		 *
		"bJQueryUI": false


		/*
		 * Allows the end user to select the size of a formatted page from a selec
		 * menu (sizes are 10, 25, 50 and 100). Requires pagination (`paginate`)
		 *  @type boolea
		 *  @default tru
		 
		 *  @dtopt Feature
		 *  @name DataTable.defaults.lengthChang
		 
		 *  @exampl
		 *    $(document).ready( function () 
		 *      $('#example').dataTable( 
		 *        "lengthChange": fals
		 *      } )
		 *    } )
		 *
		"bLengthChange": true


		/*
		 * Enable or disable pagination
		 *  @type boolea
		 *  @default tru
		 
		 *  @dtopt Feature
		 *  @name DataTable.defaults.pagin
		 
		 *  @exampl
		 *    $(document).ready( function () 
		 *      $('#example').dataTable( 
		 *        "paging": fals
		 *      } )
		 *    } )
		 *
		"bPaginate": true


		/*
		 * Enable or disable the display of a 'processing' indicator when the table i
		 * being processed (e.g. a sort). This is particularly useful for tables wit
		 * large amounts of data where it can take a noticeable amount of time to sor
		 * the entries
		 *  @type boolea
		 *  @default fals
		 
		 *  @dtopt Feature
		 *  @name DataTable.defaults.processin
		 
		 *  @exampl
		 *    $(document).ready( function () 
		 *      $('#example').dataTable( 
		 *        "processing": tru
		 *      } )
		 *    } )
		 *
		"bProcessing": false


		/*
		 * Retrieve the DataTables object for the given selector. Note that if th
		 * table has already been initialised, this parameter will cause DataTable
		 * to simply return the object that has already been set up - it will not tak
		 * account of any changes you might have made to the initialisation objec
		 * passed to DataTables (setting this parameter to true is an acknowledgemen
		 * that you understand this). `destroy` can be used to reinitialise a table i
		 * you need
		 *  @type boolea
		 *  @default fals
		 
		 *  @dtopt Option
		 *  @name DataTable.defaults.retriev
		 
		 *  @exampl
		 *    $(document).ready( function() 
		 *      initTable()
		 *      tableActions()
		 *    } )
		 
		 *    function initTable (
		 *    
		 *      return $('#example').dataTable( 
		 *        "scrollY": "200px"
		 *        "paginate": false
		 *        "retrieve": tru
		 *      } )
		 *    
		 
		 *    function tableActions (
		 *    
		 *      var table = initTable()
		 *      // perform API operations with oTabl
		 *    
		 *
		"bRetrieve": false


		/*
		 * When vertical (y) scrolling is enabled, DataTables will force the height o
		 * the table's viewport to the given height at all times (useful for layout)
		 * However, this can look odd when filtering data down to a small data set
		 * and the footer is left "floating" further down. This parameter (whe
		 * enabled) will cause DataTables to collapse the table's viewport down whe
		 * the result set will fit within the given Y height
		 *  @type boolea
		 *  @default fals
		 
		 *  @dtopt Option
		 *  @name DataTable.defaults.scrollCollaps
		 
		 *  @exampl
		 *    $(document).ready( function() 
		 *      $('#example').dataTable( 
		 *        "scrollY": "200"
		 *        "scrollCollapse": tru
		 *      } )
		 *    } )
		 *
		"bScrollCollapse": false


		/*
		 * Configure DataTables to use server-side processing. Note that th
		 * `ajax` parameter must also be given in order to give DataTables 
		 * source to obtain the required data for each draw
		 *  @type boolea
		 *  @default fals
		 
		 *  @dtopt Feature
		 *  @dtopt Server-sid
		 *  @name DataTable.defaults.serverSid
		 
		 *  @exampl
		 *    $(document).ready( function () 
		 *      $('#example').dataTable( 
		 *        "serverSide": true
		 *        "ajax": "xhr.php
		 *      } )
		 *    } )
		 *
		"bServerSide": false


		/*
		 * Enable or disable sorting of columns. Sorting of individual columns can b
		 * disabled by the `sortable` option for each column
		 *  @type boolea
		 *  @default tru
		 
		 *  @dtopt Feature
		 *  @name DataTable.defaults.orderin
		 
		 *  @exampl
		 *    $(document).ready( function () 
		 *      $('#example').dataTable( 
		 *        "ordering": fals
		 *      } )
		 *    } )
		 *
		"bSort": true


		/*
		 * Enable or display DataTables' ability to sort multiple columns at th
		 * same time (activated by shift-click by the user)
		 *  @type boolea
		 *  @default tru
		 
		 *  @dtopt Option
		 *  @name DataTable.defaults.orderMult
		 
		 *  @exampl
		 *    // Disable multiple column sorting abilit
		 *    $(document).ready( function () 
		 *      $('#example').dataTable( 
		 *        "orderMulti": fals
		 *      } )
		 *    } )
		 *
		"bSortMulti": true


		/*
		 * Allows control over whether DataTables should use the top (true) uniqu
		 * cell that is found for a single column, or the bottom (false - default)
		 * This is useful when using complex headers
		 *  @type boolea
		 *  @default fals
		 
		 *  @dtopt Option
		 *  @name DataTable.defaults.orderCellsTo
		 
		 *  @exampl
		 *    $(document).ready( function() 
		 *      $('#example').dataTable( 
		 *        "orderCellsTop": tru
		 *      } )
		 *    } )
		 *
		"bSortCellsTop": false


		/*
		 * Enable or disable the addition of the classes `sorting\_1`, `sorting\_2` an
		 * `sorting\_3` to the columns which are currently being sorted on. This i
		 * presented as a feature switch as it can increase processing time (whil
		 * classes are removed and added) so for large data sets you might want t
		 * turn this off
		 *  @type boolea
		 *  @default tru
		 
		 *  @dtopt Feature
		 *  @name DataTable.defaults.orderClasse
		 
		 *  @exampl
		 *    $(document).ready( function () 
		 *      $('#example').dataTable( 
		 *        "orderClasses": fals
		 *      } )
		 *    } )
		 *
		"bSortClasses": true


		/*
		 * Enable or disable state saving. When enabled HTML5 `localStorage` will b
		 * used to save table display information such as pagination information
		 * display length, filtering and sorting. As such when the end user reload
		 * the page the display display will match what thy had previously set up
		 
		 * Due to the use of `localStorage` the default state saving is not supporte
		 * in IE6 or 7. If state saving is required in those browsers, us
		 * `stateSaveCallback` to provide a storage solution such as cookies
		 *  @type boolea
		 *  @default fals
		 
		 *  @dtopt Feature
		 *  @name DataTable.defaults.stateSav
		 
		 *  @exampl
		 *    $(document).ready( function () 
		 *      $('#example').dataTable( 
		 *        "stateSave": tru
		 *      } )
		 *    } )
		 *
		"bStateSave": false


		/*
		 * This function is called when a TR element is created (and all TD chil
		 * elements have been inserted), or registered if using a DOM source, allowin
		 * manipulation of the TR element (adding classes etc)
		 *  @type functio
		 *  @param {node} row "TR" element for the current ro
		 *  @param {array} data Raw data array for this ro
		 *  @param {int} dataIndex The index of this row in the internal aoData arra
		 
		 *  @dtopt Callback
		 *  @name DataTable.defaults.createdRo
		 
		 *  @exampl
		 *    $(document).ready( function() 
		 *      $('#example').dataTable( 
		 *        "createdRow": function( row, data, dataIndex ) 
		 *          // Bold the grade for all 'A' grade browser
		 *          if ( data[4] == "A" 
		 *          
		 *            $('td:eq(4)', row).html( '<b>A</b>' )
		 *          
		 *        
		 *      } )
		 *    } )
		 *
		"fnCreatedRow": null


		/*
		 * This function is called on every 'draw' event, and allows you t
		 * dynamically modify any aspect you want about the created DOM
		 *  @type functio
		 *  @param {object} settings DataTables settings objec
		 
		 *  @dtopt Callback
		 *  @name DataTable.defaults.drawCallbac
		 
		 *  @exampl
		 *    $(document).ready( function() 
		 *      $('#example').dataTable( 
		 *        "drawCallback": function( settings ) 
		 *          alert( 'DataTables has redrawn the table' )
		 *        
		 *      } )
		 *    } )
		 *
		"fnDrawCallback": null


		/*
		 * Identical to fnHeaderCallback() but for the table footer this functio
		 * allows you to modify the table footer on every 'draw' event
		 *  @type functio
		 *  @param {node} foot "TR" element for the foote
		 *  @param {array} data Full table data (as derived from the original HTML
		 *  @param {int} start Index for the current display starting point in th
		 *    display arra
		 *  @param {int} end Index for the current display ending point in th
		 *    display arra
		 *  @param {array int} display Index array to translate the visual positio
		 *    to the full data arra
		 
		 *  @dtopt Callback
		 *  @name DataTable.defaults.footerCallbac
		 
		 *  @exampl
		 *    $(document).ready( function() 
		 *      $('#example').dataTable( 
		 *        "footerCallback": function( tfoot, data, start, end, display ) 
		 *          tfoot.getElementsByTagName('th')[0].innerHTML = "Starting index is "+start
		 *        
		 *      } )
		 *    } 
		 *
		"fnFooterCallback": null


		/*
		 * When rendering large numbers in the information element for the tabl
		 * (i.e. "Showing 1 to 10 of 57 entries") DataTables will render large number
		 * to have a comma separator for the 'thousands' units (e.g. 1 million i
		 * rendered as "1,000,000") to help readability for the end user. Thi
		 * function will override the default method DataTables uses
		 *  @type functio
		 *  @membe
		 *  @param {int} toFormat number to be formatte
		 *  @returns {string} formatted string for DataTables to show the numbe
		 
		 *  @dtopt Callback
		 *  @name DataTable.defaults.formatNumbe
		 
		 *  @exampl
		 *    // Format a number using a single quote for the separator (note tha
		 *    // this can also be done with the language.infoThousands option
		 *    $(document).ready( function() 
		 *      $('#example').dataTable( 
		 *        "formatNumber": function ( toFormat ) 
		 *          return toFormat.toString().replace
		 *            /\B(?=(\d{3})+(?!\d))/g, "'
		 *          )
		 *        }
		 *      } )
		 *    } )
		 *
		"fnFormatNumber": function ( toFormat ) 
			return toFormat.toString().replace
				/\B(?=(\d{3})+(?!\d))/g
				this.oLanguage.sInfoThousand
			)
		}


		/*
		 * This function is called on every 'draw' event, and allows you t
		 * dynamically modify the header row. This can be used to calculate an
		 * display useful information about the table
		 *  @type functio
		 *  @param {node} head "TR" element for the heade
		 *  @param {array} data Full table data (as derived from the original HTML
		 *  @param {int} start Index for the current display starting point in th
		 *    display arra
		 *  @param {int} end Index for the current display ending point in th
		 *    display arra
		 *  @param {array int} display Index array to translate the visual positio
		 *    to the full data arra
		 
		 *  @dtopt Callback
		 *  @name DataTable.defaults.headerCallbac
		 
		 *  @exampl
		 *    $(document).ready( function() 
		 *      $('#example').dataTable( 
		 *        "fheaderCallback": function( head, data, start, end, display ) 
		 *          head.getElementsByTagName('th')[0].innerHTML = "Displaying "+(end-start)+" records"
		 *        
		 *      } )
		 *    } 
		 *
		"fnHeaderCallback": null


		/*
		 * The information element can be used to convey information about the curren
		 * state of the table. Although the internationalisation options presented b
		 * DataTables are quite capable of dealing with most customisations, there ma
		 * be times where you wish to customise the string further. This callbac
		 * allows you to do exactly that
		 *  @type functio
		 *  @param {object} oSettings DataTables settings objec
		 *  @param {int} start Starting position in data for the dra
		 *  @param {int} end End position in data for the dra
		 *  @param {int} max Total number of rows in the table (regardless o
		 *    filtering
		 *  @param {int} total Total number of rows in the data set, after filterin
		 *  @param {string} pre The string that DataTables has formatted using it'
		 *    own rule
		 *  @returns {string} The string to be displayed in the information element
		 
		 *  @dtopt Callback
		 *  @name DataTable.defaults.infoCallbac
		 
		 *  @exampl
		 *    $('#example').dataTable( 
		 *      "infoCallback": function( settings, start, end, max, total, pre ) 
		 *        return start +" to "+ end
		 *      
		 *    } )
		 *
		"fnInfoCallback": null


		/*
		 * Called when the table has been initialised. Normally DataTables wil
		 * initialise sequentially and there will be no need for this function
		 * however, this does not hold true when using external language informatio
		 * since that is obtained using an async XHR call
		 *  @type functio
		 *  @param {object} settings DataTables settings objec
		 *  @param {object} json The JSON object request from the server - onl
		 *    present if client-side Ajax sourced data is use
		 
		 *  @dtopt Callback
		 *  @name DataTable.defaults.initComplet
		 
		 *  @exampl
		 *    $(document).ready( function() 
		 *      $('#example').dataTable( 
		 *        "initComplete": function(settings, json) 
		 *          alert( 'DataTables has finished its initialisation.' )
		 *        
		 *      } )
		 *    } 
		 *
		"fnInitComplete": null


		/*
		 * Called at the very start of each table draw and can be used to cancel th
		 * draw by returning false, any other return (including undefined) results i
		 * the full draw occurring)
		 *  @type functio
		 *  @param {object} settings DataTables settings objec
		 *  @returns {boolean} False will cancel the draw, anything else (including n
		 *    return) will allow it to complete
		 
		 *  @dtopt Callback
		 *  @name DataTable.defaults.preDrawCallbac
		 
		 *  @exampl
		 *    $(document).ready( function() 
		 *      $('#example').dataTable( 
		 *        "preDrawCallback": function( settings ) 
		 *          if ( $('#test').val() == 1 ) 
		 *            return false
		 *          
		 *        
		 *      } )
		 *    } )
		 *
		"fnPreDrawCallback": null


		/*
		 * This function allows you to 'post process' each row after it have bee
		 * generated for each table draw, but before it is rendered on screen. Thi
		 * function might be used for setting the row class name etc
		 *  @type functio
		 *  @param {node} row "TR" element for the current ro
		 *  @param {array} data Raw data array for this ro
		 *  @param {int} displayIndex The display index for the current table dra
		 *  @param {int} displayIndexFull The index of the data in the full list o
		 *    rows (after filtering
		 
		 *  @dtopt Callback
		 *  @name DataTable.defaults.rowCallbac
		 
		 *  @exampl
		 *    $(document).ready( function() 
		 *      $('#example').dataTable( 
		 *        "rowCallback": function( row, data, displayIndex, displayIndexFull ) 
		 *          // Bold the grade for all 'A' grade browser
		 *          if ( data[4] == "A" ) 
		 *            $('td:eq(4)', row).html( '<b>A</b>' )
		 *          
		 *        
		 *      } )
		 *    } )
		 *
		"fnRowCallback": null


		/*
		 * __Deprecated__ The functionality provided by this parameter has now bee
		 * superseded by that provided through `ajax`, which should be used instead
		 
		 * This parameter allows you to override the default function which obtain
		 * the data from the server so something more suitable for your application
		 * For example you could use POST data, or pull information from a Gears o
		 * AIR database
		 *  @type functio
		 *  @membe
		 *  @param {string} source HTTP source to obtain the data from (`ajax`
		 *  @param {array} data A key/value pair object containing the data to sen
		 *    to the serve
		 *  @param {function} callback to be called on completion of the data ge
		 *    process that will draw the data on the page
		 *  @param {object} settings DataTables settings objec
		 
		 *  @dtopt Callback
		 *  @dtopt Server-sid
		 *  @name DataTable.defaults.serverDat
		 
		 *  @deprecated 1.10. Please use `ajax` for this functionality now
		 *
		"fnServerData": null


		/*
		 * __Deprecated__ The functionality provided by this parameter has now bee
		 * superseded by that provided through `ajax`, which should be used instead
		 
		 *  It is often useful to send extra data to the server when making an Aja
		 * request - for example custom filtering information, and this callbac
		 * function makes it trivial to send extra information to the server. Th
		 * passed in parameter is the data set that has been constructed b
		 * DataTables, and you can add to this or modify it as you require
		 *  @type functio
		 *  @param {array} data Data array (array of objects which are name/valu
		 *    pairs) that has been constructed by DataTables and will be sent to th
		 *    server. In the case of Ajax sourced data with server-side processin
		 *    this will be an empty array, for server-side processing there will be 
		 *    significant number of parameters
		 *  @returns {undefined} Ensure that you modify the data array passed in
		 *    as this is passed by reference
		 
		 *  @dtopt Callback
		 *  @dtopt Server-sid
		 *  @name DataTable.defaults.serverParam
		 
		 *  @deprecated 1.10. Please use `ajax` for this functionality now
		 *
		"fnServerParams": null


		/*
		 * Load the table state. With this function you can define from where, and how, th
		 * state of a table is loaded. By default DataTables will load from `localStorage
		 * but you might wish to use a server-side database or cookies
		 *  @type functio
		 *  @membe
		 *  @param {object} settings DataTables settings objec
		 *  @return {object} The DataTables state object to be loade
		 
		 *  @dtopt Callback
		 *  @name DataTable.defaults.stateLoadCallbac
		 
		 *  @exampl
		 *    $(document).ready( function() 
		 *      $('#example').dataTable( 
		 *        "stateSave": true
		 *        "stateLoadCallback": function (settings) 
		 *          var o
		 
		 *          // Send an Ajax request to the server to get the data. Note tha
		 *          // this is a synchronous request
		 *          $.ajax( 
		 *            "url": "/state_load"
		 *            "async": false
		 *            "dataType": "json"
		 *            "success": function (json) 
		 *              o = json
		 *            
		 *          } )
		 
		 *          return o
		 *        
		 *      } )
		 *    } )
		 *
		"fnStateLoadCallback": function ( settings ) 
			try 
				return JSON.parse
					localStorage.getItem('DataTables_'+settings.sInstance+'_'+window.location.pathname
				)
			} catch (e) {
		}


		/*
		 * Callback which allows modification of the saved state prior to loading that state
		 * This callback is called when the table is loading state from the stored data, bu
		 * prior to the settings object being modified by the saved state. Note that fo
		 * plug-in authors, you should use the `stateLoadParams` event to load parameters fo
		 * a plug-in
		 *  @type functio
		 *  @param {object} settings DataTables settings objec
		 *  @param {object} data The state object that is to be loade
		 
		 *  @dtopt Callback
		 *  @name DataTable.defaults.stateLoadParam
		 
		 *  @exampl
		 *    // Remove a saved filter, so filtering is never loade
		 *    $(document).ready( function() 
		 *      $('#example').dataTable( 
		 *        "stateSave": true
		 *        "stateLoadParams": function (settings, data) 
		 *          data.oSearch.sSearch = ""
		 *        
		 *      } )
		 *    } )
		 
		 *  @exampl
		 *    // Disallow state loading by returning fals
		 *    $(document).ready( function() 
		 *      $('#example').dataTable( 
		 *        "stateSave": true
		 *        "stateLoadParams": function (settings, data) 
		 *          return false
		 *        
		 *      } )
		 *    } )
		 *
		"fnStateLoadParams": null


		/*
		 * Callback that is called when the state has been loaded from the state saving metho
		 * and the DataTables settings object has been modified as a result of the loaded state
		 *  @type functio
		 *  @param {object} settings DataTables settings objec
		 *  @param {object} data The state object that was loade
		 
		 *  @dtopt Callback
		 *  @name DataTable.defaults.stateLoade
		 
		 *  @exampl
		 *    // Show an alert with the filtering value that was save
		 *    $(document).ready( function() 
		 *      $('#example').dataTable( 
		 *        "stateSave": true
		 *        "stateLoaded": function (settings, data) 
		 *          alert( 'Saved filter was: '+data.oSearch.sSearch )
		 *        
		 *      } )
		 *    } )
		 *
		"fnStateLoaded": null


		/*
		 * Save the table state. This function allows you to define where and how the stat
		 * information for the table is stored By default DataTables will use `localStorage
		 * but you might wish to use a server-side database or cookies
		 *  @type functio
		 *  @membe
		 *  @param {object} settings DataTables settings objec
		 *  @param {object} data The state object to be save
		 
		 *  @dtopt Callback
		 *  @name DataTable.defaults.stateSaveCallbac
		 
		 *  @exampl
		 *    $(document).ready( function() 
		 *      $('#example').dataTable( 
		 *        "stateSave": true
		 *        "stateSaveCallback": function (settings, data) 
		 *          // Send an Ajax request to the server with the state objec
		 *          $.ajax( 
		 *            "url": "/state_save"
		 *            "data": data
		 *            "dataType": "json"
		 *            "method": "POST
		 *            "success": function () {
		 *          } )
		 *        
		 *      } )
		 *    } )
		 *
		"fnStateSaveCallback": function ( settings, data ) 
			try 
				localStorage.setItem
					'DataTables_'+settings.sInstance+'_'+window.location.pathname
					JSON.stringify(data
				)
			} catch (e) {
		}


		/*
		 * Callback which allows modification of the state to be saved. Called when the tabl
		 * has changed state a new state save is required. This method allows modification o
		 * the state saving object prior to actually doing the save, including addition o
		 * other state properties or modification. Note that for plug-in authors, you shoul
		 * use the `stateSaveParams` event to save parameters for a plug-in
		 *  @type functio
		 *  @param {object} settings DataTables settings objec
		 *  @param {object} data The state object to be save
		 
		 *  @dtopt Callback
		 *  @name DataTable.defaults.stateSaveParam
		 
		 *  @exampl
		 *    // Remove a saved filter, so filtering is never save
		 *    $(document).ready( function() 
		 *      $('#example').dataTable( 
		 *        "stateSave": true
		 *        "stateSaveParams": function (settings, data) 
		 *          data.oSearch.sSearch = ""
		 *        
		 *      } )
		 *    } )
		 *
		"fnStateSaveParams": null


		/*
		 * Duration for which the saved state information is considered valid. After this perio
		 * has elapsed the state will be returned to the default
		 * Value is given in seconds
		 *  @type in
		 *  @default 7200 <i>(2 hours)</i
		 
		 *  @dtopt Option
		 *  @name DataTable.defaults.stateDuratio
		 
		 *  @exampl
		 *    $(document).ready( function() 
		 *      $('#example').dataTable( 
		 *        "stateDuration": 60*60*24; // 1 da
		 *      } )
		 *    } 
		 *
		"iStateDuration": 7200


		/*
		 * When enabled DataTables will not make a request to the server for the firs
		 * page draw - rather it will use the data already on the page (no sorting et
		 * will be applied to it), thus saving on an XHR at load time. `deferLoading
		 * is used to indicate that deferred loading is required, but it is also use
		 * to tell DataTables how many records there are in the full table (allowin
		 * the information element and pagination to be displayed correctly). In the cas
		 * where a filtering is applied to the table on initial load, this can b
		 * indicated by giving the parameter as an array, where the first element i
		 * the number of records available after filtering and the second element is th
		 * number of records without filtering (allowing the table information elemen
		 * to be shown correctly)
		 *  @type int | arra
		 *  @default nul
		 
		 *  @dtopt Option
		 *  @name DataTable.defaults.deferLoadin
		 
		 *  @exampl
		 *    // 57 records available in the table, no filtering applie
		 *    $(document).ready( function() 
		 *      $('#example').dataTable( 
		 *        "serverSide": true
		 *        "ajax": "scripts/server_processing.php"
		 *        "deferLoading": 5
		 *      } )
		 *    } )
		 
		 *  @exampl
		 *    // 57 records after filtering, 100 without filtering (an initial filter applied
		 *    $(document).ready( function() 
		 *      $('#example').dataTable( 
		 *        "serverSide": true
		 *        "ajax": "scripts/server_processing.php"
		 *        "deferLoading": [ 57, 100 ]
		 *        "search": 
		 *          "search": "my_filter
		 *        
		 *      } )
		 *    } )
		 *
		"iDeferLoading": null


		/*
		 * Number of rows to display on a single page when using pagination. I
		 * feature enabled (`lengthChange`) then the end user will be able to overrid
		 * this to a custom setting using a pop-up menu
		 *  @type in
		 *  @default 1
		 
		 *  @dtopt Option
		 *  @name DataTable.defaults.pageLengt
		 
		 *  @exampl
		 *    $(document).ready( function() 
		 *      $('#example').dataTable( 
		 *        "pageLength": 5
		 *      } )
		 *    } 
		 *
		"iDisplayLength": 10


		/*
		 * Define the starting point for data display when using DataTables wit
		 * pagination. Note that this parameter is the number of records, rather tha
		 * the page number, so if you have 10 records per page and want to start o
		 * the third page, it should be "20"
		 *  @type in
		 *  @default 
		 
		 *  @dtopt Option
		 *  @name DataTable.defaults.displayStar
		 
		 *  @exampl
		 *    $(document).ready( function() 
		 *      $('#example').dataTable( 
		 *        "displayStart": 2
		 *      } )
		 *    } 
		 *
		"iDisplayStart": 0


		/*
		 * By default DataTables allows keyboard navigation of the table (sorting, paging
		 * and filtering) by adding a `tabindex` attribute to the required elements. Thi
		 * allows you to tab through the controls and press the enter key to activate them
		 * The tabindex is default 0, meaning that the tab follows the flow of the document
		 * You can overrule this using this parameter if you wish. Use a value of -1 t
		 * disable built-in keyboard navigation
		 *  @type in
		 *  @default 
		 
		 *  @dtopt Option
		 *  @name DataTable.defaults.tabInde
		 
		 *  @exampl
		 *    $(document).ready( function() 
		 *      $('#example').dataTable( 
		 *        "tabIndex": 
		 *      } )
		 *    } )
		 *
		"iTabIndex": 0


		/*
		 * Classes that DataTables assigns to the various components and feature
		 * that it adds to the HTML table. This allows classes to be configure
		 * during initialisation in addition to through the stati
		 * {@link DataTable.ext.oStdClasses} object)
		 *  @namespac
		 *  @name DataTable.defaults.classe
		 *
		"oClasses": {}


		/*
		 * All strings that DataTables uses in the user interface that it create
		 * are defined in this object, allowing you to modified them individually o
		 * completely replace them all as required
		 *  @namespac
		 *  @name DataTable.defaults.languag
		 *
		"oLanguage": 
			/*
			 * Strings that are used for WAI-ARIA labels and controls only (these are no
			 * actually visible on the page, but will be read by screenreaders, and thu
			 * must be internationalised as well)
			 *  @namespac
			 *  @name DataTable.defaults.language.ari
			 *
			"oAria": 
				/*
				 * ARIA label that is added to the table headers when the column may b
				 * sorted ascending by activing the column (click or return when focused)
				 * Note that the column header is prefixed to this string
				 *  @type strin
				 *  @default : activate to sort column ascendin
				 
				 *  @dtopt Languag
				 *  @name DataTable.defaults.language.aria.sortAscendin
				 
				 *  @exampl
				 *    $(document).ready( function() 
				 *      $('#example').dataTable( 
				 *        "language": 
				 *          "aria": 
				 *            "sortAscending": " - click/return to sort ascending
				 *          
				 *        
				 *      } )
				 *    } )
				 *
				"sSortAscending": ": activate to sort column ascending"

				/*
				 * ARIA label that is added to the table headers when the column may b
				 * sorted descending by activing the column (click or return when focused)
				 * Note that the column header is prefixed to this string
				 *  @type strin
				 *  @default : activate to sort column ascendin
				 
				 *  @dtopt Languag
				 *  @name DataTable.defaults.language.aria.sortDescendin
				 
				 *  @exampl
				 *    $(document).ready( function() 
				 *      $('#example').dataTable( 
				 *        "language": 
				 *          "aria": 
				 *            "sortDescending": " - click/return to sort descending
				 *          
				 *        
				 *      } )
				 *    } )
				 *
				"sSortDescending": ": activate to sort column descending
			}

			/*
			 * Pagination string used by DataTables for the built-in paginatio
			 * control types
			 *  @namespac
			 *  @name DataTable.defaults.language.paginat
			 *
			"oPaginate": 
				/*
				 * Text to use when using the 'full_numbers' type of pagination for th
				 * button to take the user to the first page
				 *  @type strin
				 *  @default Firs
				 
				 *  @dtopt Languag
				 *  @name DataTable.defaults.language.paginate.firs
				 
				 *  @exampl
				 *    $(document).ready( function() 
				 *      $('#example').dataTable( 
				 *        "language": 
				 *          "paginate": 
				 *            "first": "First page
				 *          
				 *        
				 *      } )
				 *    } )
				 *
				"sFirst": "First"


				/*
				 * Text to use when using the 'full_numbers' type of pagination for th
				 * button to take the user to the last page
				 *  @type strin
				 *  @default Las
				 
				 *  @dtopt Languag
				 *  @name DataTable.defaults.language.paginate.las
				 
				 *  @exampl
				 *    $(document).ready( function() 
				 *      $('#example').dataTable( 
				 *        "language": 
				 *          "paginate": 
				 *            "last": "Last page
				 *          
				 *        
				 *      } )
				 *    } )
				 *
				"sLast": "Last"


				/*
				 * Text to use for the 'next' pagination button (to take the user to th
				 * next page)
				 *  @type strin
				 *  @default Nex
				 
				 *  @dtopt Languag
				 *  @name DataTable.defaults.language.paginate.nex
				 
				 *  @exampl
				 *    $(document).ready( function() 
				 *      $('#example').dataTable( 
				 *        "language": 
				 *          "paginate": 
				 *            "next": "Next page
				 *          
				 *        
				 *      } )
				 *    } )
				 *
				"sNext": "Next"


				/*
				 * Text to use for the 'previous' pagination button (to take the user t
				 * the previous page)
				 *  @type strin
				 *  @default Previou
				 
				 *  @dtopt Languag
				 *  @name DataTable.defaults.language.paginate.previou
				 
				 *  @exampl
				 *    $(document).ready( function() 
				 *      $('#example').dataTable( 
				 *        "language": 
				 *          "paginate": 
				 *            "previous": "Previous page
				 *          
				 *        
				 *      } )
				 *    } )
				 *
				"sPrevious": "Previous
			}

			/*
			 * This string is shown in preference to `zeroRecords` when the table i
			 * empty of data (regardless of filtering). Note that this is an optiona
			 * parameter - if it is not given, the value of `zeroRecords` will be use
			 * instead (either the default or given value)
			 *  @type strin
			 *  @default No data available in tabl
			 
			 *  @dtopt Languag
			 *  @name DataTable.defaults.language.emptyTabl
			 
			 *  @exampl
			 *    $(document).ready( function() 
			 *      $('#example').dataTable( 
			 *        "language": 
			 *          "emptyTable": "No data available in table
			 *        
			 *      } )
			 *    } )
			 *
			"sEmptyTable": "No data available in table"


			/*
			 * This string gives information to the end user about the informatio
			 * that is current on display on the page. The following tokens can b
			 * used in the string and will be dynamically replaced as the tabl
			 * display updates. This tokens can be placed anywhere in the string, o
			 * removed as needed by the language requires
			 
			 * * `\_START\_` - Display index of the first record on the current pag
			 * * `\_END\_` - Display index of the last record on the current pag
			 * * `\_TOTAL\_` - Number of records in the table after filterin
			 * * `\_MAX\_` - Number of records in the table without filterin
			 * * `\_PAGE\_` - Current page numbe
			 * * `\_PAGES\_` - Total number of pages of data in the tabl
			 
			 *  @type strin
			 *  @default Showing _START_ to _END_ of _TOTAL_ entrie
			 
			 *  @dtopt Languag
			 *  @name DataTable.defaults.language.inf
			 
			 *  @exampl
			 *    $(document).ready( function() 
			 *      $('#example').dataTable( 
			 *        "language": 
			 *          "info": "Showing page _PAGE_ of _PAGES_
			 *        
			 *      } )
			 *    } )
			 *
			"sInfo": "Showing _START_ to _END_ of _TOTAL_ entries"


			/*
			 * Display information string for when the table is empty. Typically th
			 * format of this string should match `info`
			 *  @type strin
			 *  @default Showing 0 to 0 of 0 entrie
			 
			 *  @dtopt Languag
			 *  @name DataTable.defaults.language.infoEmpt
			 
			 *  @exampl
			 *    $(document).ready( function() 
			 *      $('#example').dataTable( 
			 *        "language": 
			 *          "infoEmpty": "No entries to show
			 *        
			 *      } )
			 *    } )
			 *
			"sInfoEmpty": "Showing 0 to 0 of 0 entries"


			/*
			 * When a user filters the information in a table, this string is appende
			 * to the information (`info`) to give an idea of how strong the filterin
			 * is. The variable _MAX_ is dynamically updated
			 *  @type strin
			 *  @default (filtered from _MAX_ total entries
			 
			 *  @dtopt Languag
			 *  @name DataTable.defaults.language.infoFiltere
			 
			 *  @exampl
			 *    $(document).ready( function() 
			 *      $('#example').dataTable( 
			 *        "language": 
			 *          "infoFiltered": " - filtering from _MAX_ records
			 *        
			 *      } )
			 *    } )
			 *
			"sInfoFiltered": "(filtered from _MAX_ total entries)"


			/*
			 * If can be useful to append extra information to the info string at times
			 * and this variable does exactly that. This information will be appended t
			 * the `info` (`infoEmpty` and `infoFiltered` in whatever combination they ar
			 * being used) at all times
			 *  @type strin
			 *  @default <i>Empty string</i
			 
			 *  @dtopt Languag
			 *  @name DataTable.defaults.language.infoPostFi
			 
			 *  @exampl
			 *    $(document).ready( function() 
			 *      $('#example').dataTable( 
			 *        "language": 
			 *          "infoPostFix": "All records shown are derived from real information.
			 *        
			 *      } )
			 *    } )
			 *
			"sInfoPostFix": ""


			/*
			 * DataTables has a build in number formatter (`formatNumber`) which is use
			 * to format large numbers that are used in the table information. B
			 * default a comma is used, but this can be trivially changed to an
			 * character you wish with this parameter
			 *  @type strin
			 *  @default 
			 
			 *  @dtopt Languag
			 *  @name DataTable.defaults.language.infoThousand
			 
			 *  @exampl
			 *    $(document).ready( function() 
			 *      $('#example').dataTable( 
			 *        "language": 
			 *          "infoThousands": "'
			 *        
			 *      } )
			 *    } )
			 *
			"sInfoThousands": ","


			/*
			 * Detail the action that will be taken when the drop down menu for th
			 * pagination length option is changed. The '_MENU_' variable is replace
			 * with a default select list of 10, 25, 50 and 100, and can be replace
			 * with a custom select box if required
			 *  @type strin
			 *  @default Show _MENU_ entrie
			 
			 *  @dtopt Languag
			 *  @name DataTable.defaults.language.lengthMen
			 
			 *  @exampl
			 *    // Language change onl
			 *    $(document).ready( function() 
			 *      $('#example').dataTable( 
			 *        "language": 
			 *          "lengthMenu": "Display _MENU_ records
			 *        
			 *      } )
			 *    } )
			 
			 *  @exampl
			 *    // Language and options chang
			 *    $(document).ready( function() 
			 *      $('#example').dataTable( 
			 *        "language": 
			 *          "lengthMenu": 'Display <select>'
			 *            '<option value="10">10</option>'
			 *            '<option value="20">20</option>'
			 *            '<option value="30">30</option>'
			 *            '<option value="40">40</option>'
			 *            '<option value="50">50</option>'
			 *            '<option value="-1">All</option>'
			 *            '</select> records
			 *        
			 *      } )
			 *    } )
			 *
			"sLengthMenu": "Show _MENU_ entries"


			/*
			 * When using Ajax sourced data and during the first draw when DataTables i
			 * gathering the data, this message is shown in an empty row in the table t
			 * indicate to the end user the the data is being loaded. Note that thi
			 * parameter is not used when loading data by server-side processing, jus
			 * Ajax sourced data with client-side processing
			 *  @type strin
			 *  @default Loading..
			 
			 *  @dtopt Languag
			 *  @name DataTable.defaults.language.loadingRecord
			 
			 *  @exampl
			 *    $(document).ready( function() 
			 *      $('#example').dataTable( 
			 *        "language": 
			 *          "loadingRecords": "Please wait - loading...
			 *        
			 *      } )
			 *    } )
			 *
			"sLoadingRecords": "Loading..."


			/*
			 * Text which is displayed when the table is processing a user actio
			 * (usually a sort command or similar)
			 *  @type strin
			 *  @default Processing..
			 
			 *  @dtopt Languag
			 *  @name DataTable.defaults.language.processin
			 
			 *  @exampl
			 *    $(document).ready( function() 
			 *      $('#example').dataTable( 
			 *        "language": 
			 *          "processing": "DataTables is currently busy
			 *        
			 *      } )
			 *    } )
			 *
			"sProcessing": "Processing..."


			/*
			 * Details the actions that will be taken when the user types into th
			 * filtering input text box. The variable "_INPUT_", if used in the string
			 * is replaced with the HTML text box for the filtering input allowin
			 * control over where it appears in the string. If "_INPUT_" is not give
			 * then the input box is appended to the string automatically
			 *  @type strin
			 *  @default Search
			 
			 *  @dtopt Languag
			 *  @name DataTable.defaults.language.searc
			 
			 *  @exampl
			 *    // Input text box will be appended at the end automaticall
			 *    $(document).ready( function() 
			 *      $('#example').dataTable( 
			 *        "language": 
			 *          "search": "Filter records:
			 *        
			 *      } )
			 *    } )
			 
			 *  @exampl
			 *    // Specify where the filter should appea
			 *    $(document).ready( function() 
			 *      $('#example').dataTable( 
			 *        "language": 
			 *          "search": "Apply filter _INPUT_ to table
			 *        
			 *      } )
			 *    } )
			 *
			"sSearch": "Search:"


			/*
			 * All of the language information can be stored in a file on th
			 * server-side, which DataTables will look up if this parameter is passed
			 * It must store the URL of the language file, which is in a JSON format
			 * and the object has the same properties as the oLanguage object in th
			 * initialiser object (i.e. the above parameters). Please refer to one o
			 * the example language files to see how this works in action
			 *  @type strin
			 *  @default <i>Empty string - i.e. disabled</i
			 
			 *  @dtopt Languag
			 *  @name DataTable.defaults.language.ur
			 
			 *  @exampl
			 *    $(document).ready( function() 
			 *      $('#example').dataTable( 
			 *        "language": 
			 *          "url": "http://www.sprymedia.co.uk/dataTables/lang.txt
			 *        
			 *      } )
			 *    } )
			 *
			"sUrl": ""


			/*
			 * Text shown inside the table records when the is no information to b
			 * displayed after filtering. `emptyTable` is shown when there is simply n
			 * information in the table at all (regardless of filtering)
			 *  @type strin
			 *  @default No matching records foun
			 
			 *  @dtopt Languag
			 *  @name DataTable.defaults.language.zeroRecord
			 
			 *  @exampl
			 *    $(document).ready( function() 
			 *      $('#example').dataTable( 
			 *        "language": 
			 *          "zeroRecords": "No records to display
			 *        
			 *      } )
			 *    } )
			 *
			"sZeroRecords": "No matching records found
		}


		/*
		 * This parameter allows you to have define the global filtering state a
		 * initialisation time. As an object the `search` parameter must b
		 * defined, but all other parameters are optional. When `regex` is true
		 * the search string will be treated as a regular expression, when fals
		 * (default) it will be treated as a straight string. When `smart
		 * DataTables will use it's smart filtering methods (to word match a
		 * any point in the data), when false this will not be done
		 *  @namespac
		 *  @extends DataTable.models.oSearc
		 
		 *  @dtopt Option
		 *  @name DataTable.defaults.searc
		 
		 *  @exampl
		 *    $(document).ready( function() 
		 *      $('#example').dataTable( 
		 *        "search": {"search": "Initial search"
		 *      } )
		 *    } 
		 *
		"oSearch": $.extend( {}, DataTable.models.oSearch )


		/*
		 * __Deprecated__ The functionality provided by this parameter has now bee
		 * superseded by that provided through `ajax`, which should be used instead
		 
		 * By default DataTables will look for the property `data` (or `aaData` fo
		 * compatibility with DataTables 1.9-) when obtaining data from an Aja
		 * source or for server-side processing - this parameter allows tha
		 * property to be changed. You can use Javascript dotted object notation t
		 * get a data source for multiple levels of nesting
		 *  @type strin
		 *  @default dat
		 
		 *  @dtopt Option
		 *  @dtopt Server-sid
		 *  @name DataTable.defaults.ajaxDataPro
		 
		 *  @deprecated 1.10. Please use `ajax` for this functionality now
		 *
		"sAjaxDataProp": "data"


		/*
		 * __Deprecated__ The functionality provided by this parameter has now bee
		 * superseded by that provided through `ajax`, which should be used instead
		 
		 * You can instruct DataTables to load data from an externa
		 * source using this parameter (use aData if you want to pass data in yo
		 * already have). Simply provide a url a JSON object can be obtained from
		 *  @type strin
		 *  @default nul
		 
		 *  @dtopt Option
		 *  @dtopt Server-sid
		 *  @name DataTable.defaults.ajaxSourc
		 
		 *  @deprecated 1.10. Please use `ajax` for this functionality now
		 *
		"sAjaxSource": null


		/*
		 * This initialisation variable allows you to specify exactly where in th
		 * DOM you want DataTables to inject the various controls it adds to the pag
		 * (for example you might want the pagination controls at the top of th
		 * table). DIV elements (with or without a custom class) can also be added t
		 * aid styling. The follow syntax is used
		 *   <ul
		 *     <li>The following options are allowed
		 *       <ul
		 *         <li>'l' - Length changing</li
		 *         <li>'f' - Filtering input</li
		 *         <li>'t' - The table!</li
		 *         <li>'i' - Information</li
		 *         <li>'p' - Pagination</li
		 *         <li>'r' - pRocessing</li
		 *       </ul
		 *     </li
		 *     <li>The following constants are allowed
		 *       <ul
		 *         <li>'H' - jQueryUI theme "header" classes ('fg-toolbar ui-widget-header ui-corner-tl ui-corner-tr ui-helper-clearfix')</li
		 *         <li>'F' - jQueryUI theme "footer" classes ('fg-toolbar ui-widget-header ui-corner-bl ui-corner-br ui-helper-clearfix')</li
		 *       </ul
		 *     </li
		 *     <li>The following syntax is expected
		 *       <ul
		 *         <li>'&lt;' and '&gt;' - div elements</li
		 *         <li>'&lt;"class" and '&gt;' - div with a class</li
		 *         <li>'&lt;"#id" and '&gt;' - div with an ID</li
		 *       </ul
		 *     </li
		 *     <li>Examples
		 *       <ul
		 *         <li>'&lt;"wrapper"flipt&gt;'</li
		 *         <li>'&lt;lf&lt;t&gt;ip&gt;'</li
		 *       </ul
		 *     </li
		 *   </ul
		 *  @type strin
		 *  @default lfrtip <i>(when `jQueryUI` is false)</i> <b>or</b
		 *    <"H"lfr>t<"F"ip> <i>(when `jQueryUI` is true)</i
		 
		 *  @dtopt Option
		 *  @name DataTable.defaults.do
		 
		 *  @exampl
		 *    $(document).ready( function() 
		 *      $('#example').dataTable( 
		 *        "dom": '&lt;"top"i&gt;rt&lt;"bottom"flp&gt;&lt;"clear"&gt;
		 *      } )
		 *    } )
		 *
		"sDom": "lfrtip"


		/*
		 * DataTables features four different built-in options for the buttons t
		 * display for pagination control
		 
		 * * `simple` - 'Previous' and 'Next' buttons onl
		 * * 'simple_numbers` - 'Previous' and 'Next' buttons, plus page number
		 * * `full` - 'First', 'Previous', 'Next' and 'Last' button
		 * * `full_numbers` - 'First', 'Previous', 'Next' and 'Last' buttons, plu
		 *   page number
		 * 
		 * Further methods can be added using {@link DataTable.ext.oPagination}
		 *  @type strin
		 *  @default simple_number
		 
		 *  @dtopt Option
		 *  @name DataTable.defaults.pagingTyp
		 
		 *  @exampl
		 *    $(document).ready( function() 
		 *      $('#example').dataTable( 
		 *        "pagingType": "full_numbers
		 *      } )
		 *    } 
		 *
		"sPaginationType": "simple_numbers"


		/*
		 * Enable horizontal scrolling. When a table is too wide to fit into 
		 * certain layout, or you have a large number of columns in the table, yo
		 * can enable x-scrolling to show the table in a viewport, which can b
		 * scrolled. This property can be `true` which will allow the table t
		 * scroll horizontally when needed, or any CSS unit, or a number (in whic
		 * case it will be treated as a pixel measurement). Setting as simply `true
		 * is recommended
		 *  @type boolean|strin
		 *  @default <i>blank string - i.e. disabled</i
		 
		 *  @dtopt Feature
		 *  @name DataTable.defaults.scroll
		 
		 *  @exampl
		 *    $(document).ready( function() 
		 *      $('#example').dataTable( 
		 *        "scrollX": true
		 *        "scrollCollapse": tru
		 *      } )
		 *    } )
		 *
		"sScrollX": ""


		/*
		 * This property can be used to force a DataTable to use more width than i
		 * might otherwise do when x-scrolling is enabled. For example if you have 
		 * table which requires to be well spaced, this parameter is useful fo
		 * "over-sizing" the table, and thus forcing scrolling. This property can b
		 * any CSS unit, or a number (in which case it will be treated as a pixe
		 * measurement)
		 *  @type strin
		 *  @default <i>blank string - i.e. disabled</i
		 
		 *  @dtopt Option
		 *  @name DataTable.defaults.scrollXInne
		 
		 *  @exampl
		 *    $(document).ready( function() 
		 *      $('#example').dataTable( 
		 *        "scrollX": "100%"
		 *        "scrollXInner": "110%
		 *      } )
		 *    } )
		 *
		"sScrollXInner": ""


		/*
		 * Enable vertical scrolling. Vertical scrolling will constrain the DataTabl
		 * to the given height, and enable scrolling for any data which overflows th
		 * current viewport. This can be used as an alternative to paging to displa
		 * a lot of data in a small area (although paging and scrolling can both b
		 * enabled at the same time). This property can be any CSS unit, or a numbe
		 * (in which case it will be treated as a pixel measurement)
		 *  @type strin
		 *  @default <i>blank string - i.e. disabled</i
		 
		 *  @dtopt Feature
		 *  @name DataTable.defaults.scroll
		 
		 *  @exampl
		 *    $(document).ready( function() 
		 *      $('#example').dataTable( 
		 *        "scrollY": "200px"
		 *        "paginate": fals
		 *      } )
		 *    } )
		 *
		"sScrollY": ""


		/*
		 * __Deprecated__ The functionality provided by this parameter has now bee
		 * superseded by that provided through `ajax`, which should be used instead
		 
		 * Set the HTTP method that is used to make the Ajax call for server-sid
		 * processing or Ajax sourced data
		 *  @type strin
		 *  @default GE
		 
		 *  @dtopt Option
		 *  @dtopt Server-sid
		 *  @name DataTable.defaults.serverMetho
		 
		 *  @deprecated 1.10. Please use `ajax` for this functionality now
		 *
		"sServerMethod": "GET"


		/*
		 * DataTables makes use of renderers when displaying HTML elements fo
		 * a table. These renderers can be added or modified by plug-ins t
		 * generate suitable mark-up for a site. For example the Bootstra
		 * integration plug-in for DataTables uses a paging button renderer t
		 * display pagination buttons in the mark-up required by Bootstrap
		 
		 * For further information about the renderers available se
		 * DataTable.ext.rendere
		 *  @type string|objec
		 *  @default nul
		 
		 *  @name DataTable.defaults.rendere
		 
		 *
		"renderer": nul
	}

	_fnHungarianMap( DataTable.defaults )



	/
	 * Developer note - See note in model.defaults.js about the use of Hungaria
	 * notation and camel case
	 *

	/*
	 * Column options that can be given to DataTables at initialisation time
	 *  @namespac
	 *
	DataTable.defaults.column = 
		/*
		 * Define which column(s) an order will occur on for this column. Thi
		 * allows a column's ordering to take multiple columns into account whe
		 * doing a sort or use the data from a different column. For example firs
		 * name / last name columns make sense to do a multi-column sort over th
		 * two columns
		 *  @type array|in
		 *  @default null <i>Takes the value of the column index automatically</i
		 
		 *  @name DataTable.defaults.column.orderDat
		 *  @dtopt Column
		 
		 *  @exampl
		 *    // Using `columnDefs
		 *    $(document).ready( function() 
		 *      $('#example').dataTable( 
		 *        "columnDefs": 
		 *          { "orderData": [ 0, 1 ], "targets": [ 0 ] }
		 *          { "orderData": [ 1, 0 ], "targets": [ 1 ] }
		 *          { "orderData": 2, "targets": [ 2 ] 
		 *        
		 *      } )
		 *    } )
		 
		 *  @exampl
		 *    // Using `columns
		 *    $(document).ready( function() 
		 *      $('#example').dataTable( 
		 *        "columns": 
		 *          { "orderData": [ 0, 1 ] }
		 *          { "orderData": [ 1, 0 ] }
		 *          { "orderData": 2 }
		 *          null
		 *          nul
		 *        
		 *      } )
		 *    } )
		 *
		"aDataSort": null
		"iDataSort": -1


		/*
		 * You can control the default ordering direction, and even alter th
		 * behaviour of the sort handler (i.e. only allow ascending ordering etc
		 * using this parameter
		 *  @type arra
		 *  @default [ 'asc', 'desc' 
		 
		 *  @name DataTable.defaults.column.orderSequenc
		 *  @dtopt Column
		 
		 *  @exampl
		 *    // Using `columnDefs
		 *    $(document).ready( function() 
		 *      $('#example').dataTable( 
		 *        "columnDefs": 
		 *          { "orderSequence": [ "asc" ], "targets": [ 1 ] }
		 *          { "orderSequence": [ "desc", "asc", "asc" ], "targets": [ 2 ] }
		 *          { "orderSequence": [ "desc" ], "targets": [ 3 ] 
		 *        
		 *      } )
		 *    } )
		 
		 *  @exampl
		 *    // Using `columns
		 *    $(document).ready( function() 
		 *      $('#example').dataTable( 
		 *        "columns": 
		 *          null
		 *          { "orderSequence": [ "asc" ] }
		 *          { "orderSequence": [ "desc", "asc", "asc" ] }
		 *          { "orderSequence": [ "desc" ] }
		 *          nul
		 *        
		 *      } )
		 *    } )
		 *
		"asSorting": [ 'asc', 'desc' ]


		/*
		 * Enable or disable filtering on the data in this column
		 *  @type boolea
		 *  @default tru
		 
		 *  @name DataTable.defaults.column.searchabl
		 *  @dtopt Column
		 
		 *  @exampl
		 *    // Using `columnDefs
		 *    $(document).ready( function() 
		 *      $('#example').dataTable( 
		 *        "columnDefs": 
		 *          { "searchable": false, "targets": [ 0 ] 
		 *        ] } )
		 *    } )
		 
		 *  @exampl
		 *    // Using `columns
		 *    $(document).ready( function() 
		 *      $('#example').dataTable( 
		 *        "columns": 
		 *          { "searchable": false }
		 *          null
		 *          null
		 *          null
		 *          nul
		 *        ] } )
		 *    } )
		 *
		"bSearchable": true


		/*
		 * Enable or disable ordering on this column
		 *  @type boolea
		 *  @default tru
		 
		 *  @name DataTable.defaults.column.orderabl
		 *  @dtopt Column
		 
		 *  @exampl
		 *    // Using `columnDefs
		 *    $(document).ready( function() 
		 *      $('#example').dataTable( 
		 *        "columnDefs": 
		 *          { "orderable": false, "targets": [ 0 ] 
		 *        ] } )
		 *    } )
		 
		 *  @exampl
		 *    // Using `columns
		 *    $(document).ready( function() 
		 *      $('#example').dataTable( 
		 *        "columns": 
		 *          { "orderable": false }
		 *          null
		 *          null
		 *          null
		 *          nul
		 *        ] } )
		 *    } )
		 *
		"bSortable": true


		/*
		 * Enable or disable the display of this column
		 *  @type boolea
		 *  @default tru
		 
		 *  @name DataTable.defaults.column.visibl
		 *  @dtopt Column
		 
		 *  @exampl
		 *    // Using `columnDefs
		 *    $(document).ready( function() 
		 *      $('#example').dataTable( 
		 *        "columnDefs": 
		 *          { "visible": false, "targets": [ 0 ] 
		 *        ] } )
		 *    } )
		 
		 *  @exampl
		 *    // Using `columns
		 *    $(document).ready( function() 
		 *      $('#example').dataTable( 
		 *        "columns": 
		 *          { "visible": false }
		 *          null
		 *          null
		 *          null
		 *          nul
		 *        ] } )
		 *    } )
		 *
		"bVisible": true


		/*
		 * Developer definable function that is called whenever a cell is created (Ajax source
		 * etc) or processed for input (DOM source). This can be used as a compliment to mRende
		 * allowing you to modify the DOM element (add background colour for example) when th
		 * element is available
		 *  @type functio
		 *  @param {element} td The TD node that has been create
		 *  @param {*} cellData The Data for the cel
		 *  @param {array|object} rowData The data for the whole ro
		 *  @param {int} row The row index for the aoData data stor
		 *  @param {int} col The column index for aoColumn
		 
		 *  @name DataTable.defaults.column.createdCel
		 *  @dtopt Column
		 
		 *  @exampl
		 *    $(document).ready( function() 
		 *      $('#example').dataTable( 
		 *        "columnDefs": [ 
		 *          "targets": [3]
		 *          "createdCell": function (td, cellData, rowData, row, col) 
		 *            if ( cellData == "1.7" ) 
		 *              $(td).css('color', 'blue'
		 *            
		 *          
		 *        } 
		 *      })
		 *    } )
		 *
		"fnCreatedCell": null


		/*
		 * This parameter has been replaced by `data` in DataTables to ensure namin
		 * consistency. `dataProp` can still be used, as there is backward
		 * compatibility in DataTables for this option, but it is strongl
		 * recommended that you use `data` in preference to `dataProp`
		 *  @name DataTable.defaults.column.dataPro
		 *


		/*
		 * This property can be used to read data from any data source property
		 * including deeply nested objects / properties. `data` can be given in 
		 * number of different ways which effect its behaviour
		 
		 * * `integer` - treated as an array index for the data source. This is th
		 *   default that DataTables uses (incrementally increased for each column)
		 * * `string` - read an object property from the data source. There ar
		 *   three 'special' options that can be used in the string to alter ho
		 *   DataTables reads the data from the source object
		 *    * `.` - Dotted Javascript notation. Just as you use a `.` i
		 *      Javascript to read from nested objects, so to can the option
		 *      specified in `data`. For example: `browser.version` o
		 *      `browser.name`. If your object parameter name contains a period, us
		 *      `\\` to escape it - i.e. `first\\.name`
		 *    * `[]` - Array notation. DataTables can automatically combine dat
		 *      from and array source, joining the data with the characters provide
		 *      between the two brackets. For example: `name[, ]` would provide 
		 *      comma-space separated list from the source array. If no character
		 *      are provided between the brackets, the original array source i
		 *      returned
		 *    * `()` - Function notation. Adding `()` to the end of a parameter wil
		 *      execute a function of the name given. For example: `browser()` for 
		 *      simple function on the data source, `browser.version()` for 
		 *      function in a nested property or even `browser().version` to get a
		 *      object property if the function called returns an object. Note tha
		 *      function notation is recommended for use in `render` rather tha
		 *      `data` as it is much simpler to use as a renderer
		 * * `null` - use the original data source for the row rather than pluckin
		 *   data directly from it. This action has effects on two othe
		 *   initialisation options
		 *    * `defaultContent` - When null is given as the `data` option an
		 *      `defaultContent` is specified for the column, the value defined b
		 *      `defaultContent` will be used for the cell
		 *    * `render` - When null is used for the `data` option and the `render
		 *      option is specified for the column, the whole data source for th
		 *      row is used for the renderer
		 * * `function` - the function given will be executed whenever DataTable
		 *   needs to set or get the data for a cell in the column. The functio
		 *   takes three parameters
		 *    * Parameters
		 *      * `{array|object}` The data source for the ro
		 *      * `{string}` The type call data requested - this will be 'set' whe
		 *        setting data or 'filter', 'display', 'type', 'sort' or undefine
		 *        when gathering data. Note that when `undefined` is given for th
		 *        type DataTables expects to get the raw data for the object back
		 *      * `{*}` Data to set when the second parameter is 'set'
		 *    * Return
		 *      * The return value from the function is not required when 'set' i
		 *        the type of call, but otherwise the return is what will be use
		 *        for the data requested
		 
		 * Note that `data` is a getter and setter option. If you just requir
		 * formatting of data for output, you will likely want to use `render` whic
		 * is simply a getter and thus simpler to use
		 
		 * Note that prior to DataTables 1.9.2 `data` was called `mDataProp`. Th
		 * name change reflects the flexibility of this property and is consisten
		 * with the naming of mRender. If 'mDataProp' is given, then it will stil
		 * be used by DataTables, as it automatically maps the old name to the ne
		 * if required
		 
		 *  @type string|int|function|nul
		 *  @default null <i>Use automatically calculated column index</i
		 
		 *  @name DataTable.defaults.column.dat
		 *  @dtopt Column
		 
		 *  @exampl
		 *    // Read table data from object
		 *    // JSON structure for each row
		 *    //   
		 *    //      "engine": {value}
		 *    //      "browser": {value}
		 *    //      "platform": {value}
		 *    //      "version": {value}
		 *    //      "grade": {value
		 *    //   
		 *    $(document).ready( function() 
		 *      $('#example').dataTable( 
		 *        "ajaxSource": "sources/objects.txt"
		 *        "columns": 
		 *          { "data": "engine" }
		 *          { "data": "browser" }
		 *          { "data": "platform" }
		 *          { "data": "version" }
		 *          { "data": "grade" 
		 *        
		 *      } )
		 *    } )
		 
		 *  @exampl
		 *    // Read information from deeply nested object
		 *    // JSON structure for each row
		 *    //   
		 *    //      "engine": {value}
		 *    //      "browser": {value}
		 *    //      "platform": 
		 *    //         "inner": {value
		 *    //      }
		 *    //      "details": 
		 *    //         {value}, {value
		 *    //      
		 *    //   
		 *    $(document).ready( function() 
		 *      $('#example').dataTable( 
		 *        "ajaxSource": "sources/deep.txt"
		 *        "columns": 
		 *          { "data": "engine" }
		 *          { "data": "browser" }
		 *          { "data": "platform.inner" }
		 *          { "data": "platform.details.0" }
		 *          { "data": "platform.details.1" 
		 *        
		 *      } )
		 *    } )
		 
		 *  @exampl
		 *    // Using `data` as a function to provide different information fo
		 *    // sorting, filtering and display. In this case, currency (price
		 *    $(document).ready( function() 
		 *      $('#example').dataTable( 
		 *        "columnDefs": [ 
		 *          "targets": [ 0 ]
		 *          "data": function ( source, type, val ) 
		 *            if (type === 'set') 
		 *              source.price = val
		 *              // Store the computed dislay and filter values for efficienc
		 *              source.price_display = val=="" ? "" : "$"+numberFormat(val)
		 *              source.price_filter  = val=="" ? "" : "$"+numberFormat(val)+" "+val
		 *              return
		 *            
		 *            else if (type === 'display') 
		 *              return source.price_display
		 *            
		 *            else if (type === 'filter') 
		 *              return source.price_filter
		 *            
		 *            // 'sort', 'type' and undefined all just use the intege
		 *            return source.price
		 *          
		 *        } 
		 *      } )
		 *    } )
		 
		 *  @exampl
		 *    // Using default conten
		 *    $(document).ready( function() 
		 *      $('#example').dataTable( 
		 *        "columnDefs": [ 
		 *          "targets": [ 0 ]
		 *          "data": null
		 *          "defaultContent": "Click to edit
		 *        } 
		 *      } )
		 *    } )
		 
		 *  @exampl
		 *    // Using array notation - outputting a list from an arra
		 *    $(document).ready( function() 
		 *      $('#example').dataTable( 
		 *        "columnDefs": [ 
		 *          "targets": [ 0 ]
		 *          "data": "name[, ]
		 *        } 
		 *      } )
		 *    } )
		 
		 *
		"mData": null


		/*
		 * This property is the rendering partner to `data` and it is suggested tha
		 * when you want to manipulate data for display (including filtering
		 * sorting etc) without altering the underlying data for the table, use thi
		 * property. `render` can be considered to be the the read only companion t
		 * `data` which is read / write (then as such more complex). Like `data
		 * this option can be given in a number of different ways to effect it
		 * behaviour
		 
		 * * `integer` - treated as an array index for the data source. This is th
		 *   default that DataTables uses (incrementally increased for each column)
		 * * `string` - read an object property from the data source. There ar
		 *   three 'special' options that can be used in the string to alter ho
		 *   DataTables reads the data from the source object
		 *    * `.` - Dotted Javascript notation. Just as you use a `.` i
		 *      Javascript to read from nested objects, so to can the option
		 *      specified in `data`. For example: `browser.version` o
		 *      `browser.name`. If your object parameter name contains a period, us
		 *      `\\` to escape it - i.e. `first\\.name`
		 *    * `[]` - Array notation. DataTables can automatically combine dat
		 *      from and array source, joining the data with the characters provide
		 *      between the two brackets. For example: `name[, ]` would provide 
		 *      comma-space separated list from the source array. If no character
		 *      are provided between the brackets, the original array source i
		 *      returned
		 *    * `()` - Function notation. Adding `()` to the end of a parameter wil
		 *      execute a function of the name given. For example: `browser()` for 
		 *      simple function on the data source, `browser.version()` for 
		 *      function in a nested property or even `browser().version` to get a
		 *      object property if the function called returns an object
		 * * `object` - use different data for the different data types requested b
		 *   DataTables ('filter', 'display', 'type' or 'sort'). The property name
		 *   of the object is the data type the property refers to and the value ca
		 *   defined using an integer, string or function using the same rules a
		 *   `render` normally does. Note that an `_` option _must_ be specified
		 *   This is the default value to use if you haven't specified a value fo
		 *   the data type requested by DataTables
		 * * `function` - the function given will be executed whenever DataTable
		 *   needs to set or get the data for a cell in the column. The functio
		 *   takes three parameters
		 *    * Parameters
		 *      * {array|object} The data source for the row (based on `data`
		 *      * {string} The type call data requested - this will be 'filter'
		 *        'display', 'type' or 'sort'
		 *      * {array|object} The full data source for the row (not based o
		 *        `data`
		 *    * Return
		 *      * The return value from the function is what will be used for th
		 *        data requested
		 
		 *  @type string|int|function|object|nul
		 *  @default null Use the data source value
		 
		 *  @name DataTable.defaults.column.rende
		 *  @dtopt Column
		 
		 *  @exampl
		 *    // Create a comma separated list from an array of object
		 *    $(document).ready( function() 
		 *      $('#example').dataTable( 
		 *        "ajaxSource": "sources/deep.txt"
		 *        "columns": 
		 *          { "data": "engine" }
		 *          { "data": "browser" }
		 *          
		 *            "data": "platform"
		 *            "render": "[, ].name
		 *          
		 *        
		 *      } )
		 *    } )
		 
		 *  @exampl
		 *    // Execute a function to obtain dat
		 *    $(document).ready( function() 
		 *      $('#example').dataTable( 
		 *        "columnDefs": [ 
		 *          "targets": [ 0 ]
		 *          "data": null, // Use the full data source object for the renderer's sourc
		 *          "render": "browserName()
		 *        } 
		 *      } )
		 *    } )
		 
		 *  @exampl
		 *    // As an object, extracting different data for the different type
		 *    // This would be used with a data source such as
		 *    //   { "phone": 5552368, "phone_filter": "5552368 555-2368", "phone_display": "555-2368" 
		 *    // Here the `phone` integer is used for sorting and type detection, while `phone_filter
		 *    // (which has both forms) is used for filtering for if a user inputs either format, whil
		 *    // the formatted phone number is the one that is shown in the table
		 *    $(document).ready( function() 
		 *      $('#example').dataTable( 
		 *        "columnDefs": [ 
		 *          "targets": [ 0 ]
		 *          "data": null, // Use the full data source object for the renderer's sourc
		 *          "render": 
		 *            "_": "phone"
		 *            "filter": "phone_filter"
		 *            "display": "phone_display
		 *          
		 *        } 
		 *      } )
		 *    } )
		 
		 *  @exampl
		 *    // Use as a function to create a link from the data sourc
		 *    $(document).ready( function() 
		 *      $('#example').dataTable( 
		 *        "columnDefs": [ 
		 *          "targets": [ 0 ]
		 *          "data": "download_link"
		 *          "render": function ( data, type, full ) 
		 *            return '<a href="'+data+'">Download</a>'
		 *          
		 *        } 
		 *      } )
		 *    } )
		 *
		"mRender": null


		/*
		 * Change the cell type created for the column - either TD cells or TH cells. Thi
		 * can be useful as TH cells have semantic meaning in the table body, allowing the
		 * to act as a header for a row (you may wish to add scope='row' to the TH elements)
		 *  @type strin
		 *  @default t
		 
		 *  @name DataTable.defaults.column.cellTyp
		 *  @dtopt Column
		 
		 *  @exampl
		 *    // Make the first column use TH cell
		 *    $(document).ready( function() 
		 *      $('#example').dataTable( 
		 *        "columnDefs": [ 
		 *          "targets": [ 0 ]
		 *          "cellType": "th
		 *        } 
		 *      } )
		 *    } )
		 *
		"sCellType": "td"


		/*
		 * Class to give to each cell in this column
		 *  @type strin
		 *  @default <i>Empty string</i
		 
		 *  @name DataTable.defaults.column.clas
		 *  @dtopt Column
		 
		 *  @exampl
		 *    // Using `columnDefs
		 *    $(document).ready( function() 
		 *      $('#example').dataTable( 
		 *        "columnDefs": 
		 *          { "class": "my_class", "targets": [ 0 ] 
		 *        
		 *      } )
		 *    } )
		 
		 *  @exampl
		 *    // Using `columns
		 *    $(document).ready( function() 
		 *      $('#example').dataTable( 
		 *        "columns": 
		 *          { "class": "my_class" }
		 *          null
		 *          null
		 *          null
		 *          nul
		 *        
		 *      } )
		 *    } )
		 *
		"sClass": ""

		/*
		 * When DataTables calculates the column widths to assign to each column
		 * it finds the longest string in each column and then constructs 
		 * temporary table and reads the widths from that. The problem with thi
		 * is that "mmm" is much wider then "iiii", but the latter is a longe
		 * string - thus the calculation can go wrong (doing it properly and puttin
		 * it into an DOM object and measuring that is horribly(!) slow). Thus a
		 * a "work around" we provide this option. It will append its value to th
		 * text that is found to be the longest string for the column - i.e. padding
		 * Generally you shouldn't need this
		 *  @type strin
		 *  @default <i>Empty string<i
		 
		 *  @name DataTable.defaults.column.contentPaddin
		 *  @dtopt Column
		 
		 *  @exampl
		 *    // Using `columns
		 *    $(document).ready( function() 
		 *      $('#example').dataTable( 
		 *        "columns": 
		 *          null
		 *          null
		 *          null
		 *          
		 *            "contentPadding": "mmm
		 *          
		 *        
		 *      } )
		 *    } )
		 *
		"sContentPadding": ""


		/*
		 * Allows a default value to be given for a column's data, and will be use
		 * whenever a null data source is encountered (this can be because `data
		 * is set to null, or because the data source itself is null)
		 *  @type strin
		 *  @default nul
		 
		 *  @name DataTable.defaults.column.defaultConten
		 *  @dtopt Column
		 
		 *  @exampl
		 *    // Using `columnDefs
		 *    $(document).ready( function() 
		 *      $('#example').dataTable( 
		 *        "columnDefs": 
		 *          
		 *            "data": null
		 *            "defaultContent": "Edit"
		 *            "targets": [ -1 
		 *          
		 *        
		 *      } )
		 *    } )
		 
		 *  @exampl
		 *    // Using `columns
		 *    $(document).ready( function() 
		 *      $('#example').dataTable( 
		 *        "columns": 
		 *          null
		 *          null
		 *          null
		 *          
		 *            "data": null
		 *            "defaultContent": "Edit
		 *          
		 *        
		 *      } )
		 *    } )
		 *
		"sDefaultContent": null


		/*
		 * This parameter is only used in DataTables' server-side processing. It ca
		 * be exceptionally useful to know what columns are being displayed on th
		 * client side, and to map these to database fields. When defined, the name
		 * also allow DataTables to reorder information from the server if it come
		 * back in an unexpected order (i.e. if you switch your columns around on th
		 * client-side, your server-side code does not also need updating)
		 *  @type strin
		 *  @default <i>Empty string</i
		 
		 *  @name DataTable.defaults.column.nam
		 *  @dtopt Column
		 
		 *  @exampl
		 *    // Using `columnDefs
		 *    $(document).ready( function() 
		 *      $('#example').dataTable( 
		 *        "columnDefs": 
		 *          { "name": "engine", "targets": [ 0 ] }
		 *          { "name": "browser", "targets": [ 1 ] }
		 *          { "name": "platform", "targets": [ 2 ] }
		 *          { "name": "version", "targets": [ 3 ] }
		 *          { "name": "grade", "targets": [ 4 ] 
		 *        
		 *      } )
		 *    } )
		 
		 *  @exampl
		 *    // Using `columns
		 *    $(document).ready( function() 
		 *      $('#example').dataTable( 
		 *        "columns": 
		 *          { "name": "engine" }
		 *          { "name": "browser" }
		 *          { "name": "platform" }
		 *          { "name": "version" }
		 *          { "name": "grade" 
		 *        
		 *      } )
		 *    } )
		 *
		"sName": ""


		/*
		 * Defines a data source type for the ordering which can be used to rea
		 * real-time information from the table (updating the internally cache
		 * version) prior to ordering. This allows ordering to occur on use
		 * editable elements such as form inputs
		 *  @type strin
		 *  @default st
		 
		 *  @name DataTable.defaults.column.orderDataTyp
		 *  @dtopt Column
		 
		 *  @exampl
		 *    // Using `columnDefs
		 *    $(document).ready( function() 
		 *      $('#example').dataTable( 
		 *        "columnDefs": 
		 *          { "orderDataType": "dom-text", "targets": [ 2, 3 ] }
		 *          { "type": "numeric", "targets": [ 3 ] }
		 *          { "orderDataType": "dom-select", "targets": [ 4 ] }
		 *          { "orderDataType": "dom-checkbox", "targets": [ 5 ] 
		 *        
		 *      } )
		 *    } )
		 
		 *  @exampl
		 *    // Using `columns
		 *    $(document).ready( function() 
		 *      $('#example').dataTable( 
		 *        "columns": 
		 *          null
		 *          null
		 *          { "orderDataType": "dom-text" }
		 *          { "orderDataType": "dom-text", "type": "numeric" }
		 *          { "orderDataType": "dom-select" }
		 *          { "orderDataType": "dom-checkbox" 
		 *        
		 *      } )
		 *    } )
		 *
		"sSortDataType": "std"


		/*
		 * The title of this column
		 *  @type strin
		 *  @default null <i>Derived from the 'TH' value for this column in th
		 *    original HTML table.</i
		 
		 *  @name DataTable.defaults.column.titl
		 *  @dtopt Column
		 
		 *  @exampl
		 *    // Using `columnDefs
		 *    $(document).ready( function() 
		 *      $('#example').dataTable( 
		 *        "columnDefs": 
		 *          { "title": "My column title", "targets": [ 0 ] 
		 *        
		 *      } )
		 *    } )
		 
		 *  @exampl
		 *    // Using `columns
		 *    $(document).ready( function() 
		 *      $('#example').dataTable( 
		 *        "columns": 
		 *          { "title": "My column title" }
		 *          null
		 *          null
		 *          null
		 *          nul
		 *        
		 *      } )
		 *    } )
		 *
		"sTitle": null


		/*
		 * The type allows you to specify how the data for this column will b
		 * ordered. Four types (string, numeric, date and html (which will stri
		 * HTML tags before ordering)) are currently available. Note that only dat
		 * formats understood by Javascript's Date() object will be accepted as typ
		 * date. For example: "Mar 26, 2008 5:03 PM". May take the values: 'string'
		 * 'numeric', 'date' or 'html' (by default). Further types can be addin
		 * through plug-ins
		 *  @type strin
		 *  @default null <i>Auto-detected from raw data</i
		 
		 *  @name DataTable.defaults.column.typ
		 *  @dtopt Column
		 
		 *  @exampl
		 *    // Using `columnDefs
		 *    $(document).ready( function() 
		 *      $('#example').dataTable( 
		 *        "columnDefs": 
		 *          { "type": "html", "targets": [ 0 ] 
		 *        
		 *      } )
		 *    } )
		 
		 *  @exampl
		 *    // Using `columns
		 *    $(document).ready( function() 
		 *      $('#example').dataTable( 
		 *        "columns": 
		 *          { "type": "html" }
		 *          null
		 *          null
		 *          null
		 *          nul
		 *        
		 *      } )
		 *    } )
		 *
		"sType": null


		/*
		 * Defining the width of the column, this parameter may take any CSS valu
		 * (3em, 20px etc). DataTables applies 'smart' widths to columns which have no
		 * been given a specific width through this interface ensuring that the tabl
		 * remains readable
		 *  @type strin
		 *  @default null <i>Automatic</i
		 
		 *  @name DataTable.defaults.column.widt
		 *  @dtopt Column
		 
		 *  @exampl
		 *    // Using `columnDefs
		 *    $(document).ready( function() 
		 *      $('#example').dataTable( 
		 *        "columnDefs": 
		 *          { "width": "20%", "targets": [ 0 ] 
		 *        
		 *      } )
		 *    } )
		 
		 *  @exampl
		 *    // Using `columns
		 *    $(document).ready( function() 
		 *      $('#example').dataTable( 
		 *        "columns": 
		 *          { "width": "20%" }
		 *          null
		 *          null
		 *          null
		 *          nul
		 *        
		 *      } )
		 *    } )
		 *
		"sWidth": nul
	}

	_fnHungarianMap( DataTable.defaults.column )



	/*
	 * DataTables settings object - this holds all the information needed for 
	 * given table, including configuration, data and current application of th
	 * table options. DataTables does not have a single instance for each DataTabl
	 * with the settings attached to that instance, but rather instances of th
	 * DataTable "class" are created on-the-fly as needed (typically by 
	 * $().dataTable() call) and the settings object is then applied to tha
	 * instance
	 
	 * Note that this object is related to {@link DataTable.defaults} but thi
	 * one is the internal data store for DataTables's cache of columns. It shoul
	 * NOT be manipulated outside of DataTables. Any configuration should be don
	 * through the initialisation options
	 *  @namespac
	 *  @todo Really should attach the settings object to individual instances so w
	 *    don't need to create new instances on each $().dataTable() call (if th
	 *    table already exists). It would also save passing oSettings around an
	 *    into every single function. However, this is a very significan
	 *    architecture change for DataTables and will almost certainly brea
	 *    backwards compatibility with older installations. This is something tha
	 *    will be done in 2.0
	 *
	DataTable.models.oSettings = 
		/*
		 * Primary features of DataTables and their enablement state
		 *  @namespac
		 *
		"oFeatures": 

			/*
			 * Flag to say if DataTables should automatically try to calculate th
			 * optimum table and columns widths (true) or not (false)
			 * Note that this parameter will be set by the initialisation routine. T
			 * set a default use {@link DataTable.defaults}
			 *  @type boolea
			 *
			"bAutoWidth": null

			/*
			 * Delay the creation of TR and TD elements until they are actuall
			 * needed by a driven page draw. This can give a significant spee
			 * increase for Ajax source and Javascript source data, but makes n
			 * difference at all fro DOM and server-side processing tables
			 * Note that this parameter will be set by the initialisation routine. T
			 * set a default use {@link DataTable.defaults}
			 *  @type boolea
			 *
			"bDeferRender": null

			/*
			 * Enable filtering on the table or not. Note that if this is disable
			 * then there is no filtering at all on the table, including fnFilter
			 * To just remove the filtering input use sDom and remove the 'f' option
			 * Note that this parameter will be set by the initialisation routine. T
			 * set a default use {@link DataTable.defaults}
			 *  @type boolea
			 *
			"bFilter": null

			/*
			 * Table information element (the 'Showing x of y records' div) enabl
			 * flag
			 * Note that this parameter will be set by the initialisation routine. T
			 * set a default use {@link DataTable.defaults}
			 *  @type boolea
			 *
			"bInfo": null

			/*
			 * Present a user control allowing the end user to change the page siz
			 * when pagination is enabled
			 * Note that this parameter will be set by the initialisation routine. T
			 * set a default use {@link DataTable.defaults}
			 *  @type boolea
			 *
			"bLengthChange": null

			/*
			 * Pagination enabled or not. Note that if this is disabled then lengt
			 * changing must also be disabled
			 * Note that this parameter will be set by the initialisation routine. T
			 * set a default use {@link DataTable.defaults}
			 *  @type boolea
			 *
			"bPaginate": null

			/*
			 * Processing indicator enable flag whenever DataTables is enacting 
			 * user request - typically an Ajax request for server-side processing
			 * Note that this parameter will be set by the initialisation routine. T
			 * set a default use {@link DataTable.defaults}
			 *  @type boolea
			 *
			"bProcessing": null

			/*
			 * Server-side processing enabled flag - when enabled DataTables wil
			 * get all data from the server for every draw - there is no filtering
			 * sorting or paging done on the client-side
			 * Note that this parameter will be set by the initialisation routine. T
			 * set a default use {@link DataTable.defaults}
			 *  @type boolea
			 *
			"bServerSide": null

			/*
			 * Sorting enablement flag
			 * Note that this parameter will be set by the initialisation routine. T
			 * set a default use {@link DataTable.defaults}
			 *  @type boolea
			 *
			"bSort": null

			/*
			 * Multi-column sortin
			 * Note that this parameter will be set by the initialisation routine. T
			 * set a default use {@link DataTable.defaults}
			 *  @type boolea
			 *
			"bSortMulti": null

			/*
			 * Apply a class to the columns which are being sorted to provide 
			 * visual highlight or not. This can slow things down when enabled sinc
			 * there is a lot of DOM interaction
			 * Note that this parameter will be set by the initialisation routine. T
			 * set a default use {@link DataTable.defaults}
			 *  @type boolea
			 *
			"bSortClasses": null

			/*
			 * State saving enablement flag
			 * Note that this parameter will be set by the initialisation routine. T
			 * set a default use {@link DataTable.defaults}
			 *  @type boolea
			 *
			"bStateSave": nul
		}


		/*
		 * Scrolling settings for a table
		 *  @namespac
		 *
		"oScroll": 
			/*
			 * When the table is shorter in height than sScrollY, collapse th
			 * table container down to the height of the table (when true)
			 * Note that this parameter will be set by the initialisation routine. T
			 * set a default use {@link DataTable.defaults}
			 *  @type boolea
			 *
			"bCollapse": null

			/*
			 * Width of the scrollbar for the web-browser's platform. Calculate
			 * during table initialisation
			 *  @type in
			 *  @default 
			 *
			"iBarWidth": 0

			/*
			 * Viewport width for horizontal scrolling. Horizontal scrolling i
			 * disabled if an empty string
			 * Note that this parameter will be set by the initialisation routine. T
			 * set a default use {@link DataTable.defaults}
			 *  @type strin
			 *
			"sX": null

			/*
			 * Width to expand the table to when using x-scrolling. Typically yo
			 * should not need to use this
			 * Note that this parameter will be set by the initialisation routine. T
			 * set a default use {@link DataTable.defaults}
			 *  @type strin
			 *  @deprecate
			 *
			"sXInner": null

			/*
			 * Viewport height for vertical scrolling. Vertical scrolling is disable
			 * if an empty string
			 * Note that this parameter will be set by the initialisation routine. T
			 * set a default use {@link DataTable.defaults}
			 *  @type strin
			 *
			"sY": nul
		}

		/*
		 * Language information for the table
		 *  @namespac
		 *  @extends DataTable.defaults.oLanguag
		 *
		"oLanguage": 
			/*
			 * Information callback function. Se
			 * {@link DataTable.defaults.fnInfoCallback
			 *  @type functio
			 *  @default nul
			 *
			"fnInfoCallback": nul
		}

		/*
		 * Browser support parameter
		 *  @namespac
		 *
		"oBrowser": 
			/*
			 * Indicate if the browser incorrectly calculates width:100% inside 
			 * scrolling element (IE6/7
			 *  @type boolea
			 *  @default fals
			 *
			"bScrollOversize": false

			/*
			 * Determine if the vertical scrollbar is on the right or left of th
			 * scrolling container - needed for rtl language layout, although no
			 * all browsers move the scrollbar (Safari)
			 *  @type boolea
			 *  @default fals
			 *
			"bScrollbarLeft": fals
		}


		"ajax": null


		/*
		 * Array referencing the nodes which are used for the features. Th
		 * parameters of this object match what is allowed by sDom - i.e
		 *   <ul
		 *     <li>'l' - Length changing</li
		 *     <li>'f' - Filtering input</li
		 *     <li>'t' - The table!</li
		 *     <li>'i' - Information</li
		 *     <li>'p' - Pagination</li
		 *     <li>'r' - pRocessing</li
		 *   </ul
		 *  @type arra
		 *  @default [
		 *
		"aanFeatures": []

		/*
		 * Store data information - see {@link DataTable.models.oRow} for detaile
		 * information
		 *  @type arra
		 *  @default [
		 *
		"aoData": []

		/*
		 * Array of indexes which are in the current display (after filtering etc
		 *  @type arra
		 *  @default [
		 *
		"aiDisplay": []

		/*
		 * Array of indexes for display - no filterin
		 *  @type arra
		 *  @default [
		 *
		"aiDisplayMaster": []

		/*
		 * Store information about each column that is in us
		 *  @type arra
		 *  @default [
		 *
		"aoColumns": []

		/*
		 * Store information about the table's heade
		 *  @type arra
		 *  @default [
		 *
		"aoHeader": []

		/*
		 * Store information about the table's foote
		 *  @type arra
		 *  @default [
		 *
		"aoFooter": []

		/*
		 * Store the applied global search information in case we want to force 
		 * research or compare the old search to a new one
		 * Note that this parameter will be set by the initialisation routine. T
		 * set a default use {@link DataTable.defaults}
		 *  @namespac
		 *  @extends DataTable.models.oSearc
		 *
		"oPreviousSearch": {}

		/*
		 * Store the applied search for each column - se
		 * {@link DataTable.models.oSearch} for the format that is used for th
		 * filtering information for each column
		 *  @type arra
		 *  @default [
		 *
		"aoPreSearchCols": []

		/*
		 * Sorting that is applied to the table. Note that the inner arrays ar
		 * used in the following manner
		 * <ul
		 *   <li>Index 0 - column number</li
		 *   <li>Index 1 - current sorting direction</li
		 * </ul
		 * Note that this parameter will be set by the initialisation routine. T
		 * set a default use {@link DataTable.defaults}
		 *  @type arra
		 *  @todo These inner arrays should really be object
		 *
		"aaSorting": null

		/*
		 * Sorting that is always applied to the table (i.e. prefixed in front o
		 * aaSorting)
		 * Note that this parameter will be set by the initialisation routine. T
		 * set a default use {@link DataTable.defaults}
		 *  @type arra
		 *  @default [
		 *
		"aaSortingFixed": []

		/*
		 * Classes to use for the striping of a table
		 * Note that this parameter will be set by the initialisation routine. T
		 * set a default use {@link DataTable.defaults}
		 *  @type arra
		 *  @default [
		 *
		"asStripeClasses": null

		/*
		 * If restoring a table - we should restore its striping classes as wel
		 *  @type arra
		 *  @default [
		 *
		"asDestroyStripes": []

		/*
		 * If restoring a table - we should restore its widt
		 *  @type in
		 *  @default 
		 *
		"sDestroyWidth": 0

		/*
		 * Callback functions array for every time a row is inserted (i.e. on a draw)
		 *  @type arra
		 *  @default [
		 *
		"aoRowCallback": []

		/*
		 * Callback functions for the header on each draw
		 *  @type arra
		 *  @default [
		 *
		"aoHeaderCallback": []

		/*
		 * Callback function for the footer on each draw
		 *  @type arra
		 *  @default [
		 *
		"aoFooterCallback": []

		/*
		 * Array of callback functions for draw callback function
		 *  @type arra
		 *  @default [
		 *
		"aoDrawCallback": []

		/*
		 * Array of callback functions for row created functio
		 *  @type arra
		 *  @default [
		 *
		"aoRowCreatedCallback": []

		/*
		 * Callback functions for just before the table is redrawn. A return o
		 * false will be used to cancel the draw
		 *  @type arra
		 *  @default [
		 *
		"aoPreDrawCallback": []

		/*
		 * Callback functions for when the table has been initialised
		 *  @type arra
		 *  @default [
		 *
		"aoInitComplete": []


		/*
		 * Callbacks for modifying the settings to be stored for state saving, prior t
		 * saving state
		 *  @type arra
		 *  @default [
		 *
		"aoStateSaveParams": []

		/*
		 * Callbacks for modifying the settings that have been stored for state savin
		 * prior to using the stored values to restore the state
		 *  @type arra
		 *  @default [
		 *
		"aoStateLoadParams": []

		/*
		 * Callbacks for operating on the settings object once the saved state has bee
		 * loade
		 *  @type arra
		 *  @default [
		 *
		"aoStateLoaded": []

		/*
		 * Cache the table ID for quick acces
		 *  @type strin
		 *  @default <i>Empty string</i
		 *
		"sTableId": ""

		/*
		 * The TABLE node for the main tabl
		 *  @type nod
		 *  @default nul
		 *
		"nTable": null

		/*
		 * Permanent ref to the thead elemen
		 *  @type nod
		 *  @default nul
		 *
		"nTHead": null

		/*
		 * Permanent ref to the tfoot element - if it exist
		 *  @type nod
		 *  @default nul
		 *
		"nTFoot": null

		/*
		 * Permanent ref to the tbody elemen
		 *  @type nod
		 *  @default nul
		 *
		"nTBody": null

		/*
		 * Cache the wrapper node (contains all DataTables controlled elements
		 *  @type nod
		 *  @default nul
		 *
		"nTableWrapper": null

		/*
		 * Indicate if when using server-side processing the loading of dat
		 * should be deferred until the second draw
		 * Note that this parameter will be set by the initialisation routine. T
		 * set a default use {@link DataTable.defaults}
		 *  @type boolea
		 *  @default fals
		 *
		"bDeferLoading": false

		/*
		 * Indicate if all required information has been read i
		 *  @type boolea
		 *  @default fals
		 *
		"bInitialised": false

		/*
		 * Information about open rows. Each object in the array has the parameter
		 * 'nTr' and 'nParent
		 *  @type arra
		 *  @default [
		 *
		"aoOpenRows": []

		/*
		 * Dictate the positioning of DataTables' control elements - se
		 * {@link DataTable.model.oInit.sDom}
		 * Note that this parameter will be set by the initialisation routine. T
		 * set a default use {@link DataTable.defaults}
		 *  @type strin
		 *  @default nul
		 *
		"sDom": null

		/*
		 * Which type of pagination should be used
		 * Note that this parameter will be set by the initialisation routine. T
		 * set a default use {@link DataTable.defaults}
		 *  @type strin
		 *  @default two_butto
		 *
		"sPaginationType": "two_button"

		/*
		 * The state duration (for `stateSave`) in seconds
		 * Note that this parameter will be set by the initialisation routine. T
		 * set a default use {@link DataTable.defaults}
		 *  @type in
		 *  @default 
		 *
		"iStateDuration": 0

		/*
		 * Array of callback functions for state saving. Each array element is a
		 * object with the following parameters
		 *   <ul
		 *     <li>function:fn - function to call. Takes two parameters, oSetting
		 *       and the JSON string to save that has been thus far created. Return
		 *       a JSON string to be inserted into a json objec
		 *       (i.e. '"param": [ 0, 1, 2]')</li
		 *     <li>string:sName - name of callback</li
		 *   </ul
		 *  @type arra
		 *  @default [
		 *
		"aoStateSave": []

		/*
		 * Array of callback functions for state loading. Each array element is a
		 * object with the following parameters
		 *   <ul
		 *     <li>function:fn - function to call. Takes two parameters, oSetting
		 *       and the object stored. May return false to cancel state loading</li
		 *     <li>string:sName - name of callback</li
		 *   </ul
		 *  @type arra
		 *  @default [
		 *
		"aoStateLoad": []

		/*
		 * State that was loaded. Useful for back referenc
		 *  @type objec
		 *  @default nul
		 *
		"oLoadedState": null

		/*
		 * Source url for AJAX data for the table
		 * Note that this parameter will be set by the initialisation routine. T
		 * set a default use {@link DataTable.defaults}
		 *  @type strin
		 *  @default nul
		 *
		"sAjaxSource": null

		/*
		 * Property from a given object from which to read the table data from. Thi
		 * can be an empty string (when not server-side processing), in which cas
		 * it is  assumed an an array is given directly
		 * Note that this parameter will be set by the initialisation routine. T
		 * set a default use {@link DataTable.defaults}
		 *  @type strin
		 *
		"sAjaxDataProp": null

		/*
		 * Note if draw should be blocked while getting dat
		 *  @type boolea
		 *  @default tru
		 *
		"bAjaxDataGet": true

		/*
		 * The last jQuery XHR object that was used for server-side data gathering
		 * This can be used for working with the XHR information in one of th
		 * callback
		 *  @type objec
		 *  @default nul
		 *
		"jqXHR": null

		/*
		 * JSON returned from the server in the last Ajax reques
		 *  @type objec
		 *  @default undefine
		 *
		"json": undefined

		/*
		 * Function to get the server-side data
		 * Note that this parameter will be set by the initialisation routine. T
		 * set a default use {@link DataTable.defaults}
		 *  @type functio
		 *
		"fnServerData": null

		/*
		 * Functions which are called prior to sending an Ajax request so extr
		 * parameters can easily be sent to the serve
		 *  @type arra
		 *  @default [
		 *
		"aoServerParams": []

		/*
		 * Send the XHR HTTP method - GET or POST (could be PUT or DELETE i
		 * required)
		 * Note that this parameter will be set by the initialisation routine. T
		 * set a default use {@link DataTable.defaults}
		 *  @type strin
		 *
		"sServerMethod": null

		/*
		 * Format numbers for display
		 * Note that this parameter will be set by the initialisation routine. T
		 * set a default use {@link DataTable.defaults}
		 *  @type functio
		 *
		"fnFormatNumber": null

		/*
		 * List of options that can be used for the user selectable length menu
		 * Note that this parameter will be set by the initialisation routine. T
		 * set a default use {@link DataTable.defaults}
		 *  @type arra
		 *  @default [
		 *
		"aLengthMenu": null

		/*
		 * Counter for the draws that the table does. Also used as a tracker fo
		 * server-side processin
		 *  @type in
		 *  @default 
		 *
		"iDraw": 0

		/*
		 * Indicate if a redraw is being done - useful for Aja
		 *  @type boolea
		 *  @default fals
		 *
		"bDrawing": false

		/*
		 * Draw index (iDraw) of the last error when parsing the returned dat
		 *  @type in
		 *  @default -
		 *
		"iDrawError": -1

		/*
		 * Paging display lengt
		 *  @type in
		 *  @default 1
		 *
		"_iDisplayLength": 10

		/*
		 * Paging start point - aiDisplay inde
		 *  @type in
		 *  @default 
		 *
		"_iDisplayStart": 0

		/*
		 * Server-side processing - number of records in the result se
		 * (i.e. before filtering), Use fnRecordsTotal rather tha
		 * this property to get the value of the number of records, regardless o
		 * the server-side processing setting
		 *  @type in
		 *  @default 
		 *  @privat
		 *
		"_iRecordsTotal": 0

		/*
		 * Server-side processing - number of records in the current display se
		 * (i.e. after filtering). Use fnRecordsDisplay rather tha
		 * this property to get the value of the number of records, regardless o
		 * the server-side processing setting
		 *  @type boolea
		 *  @default 
		 *  @privat
		 *
		"_iRecordsDisplay": 0

		/*
		 * Flag to indicate if jQuery UI marking and classes should be used
		 * Note that this parameter will be set by the initialisation routine. T
		 * set a default use {@link DataTable.defaults}
		 *  @type boolea
		 *
		"bJUI": null

		/*
		 * The classes to use for the tabl
		 *  @type objec
		 *  @default {
		 *
		"oClasses": {}

		/*
		 * Flag attached to the settings object so you can check in the dra
		 * callback if filtering has been done in the draw. Deprecated in favour o
		 * events
		 *  @type boolea
		 *  @default fals
		 *  @deprecate
		 *
		"bFiltered": false

		/*
		 * Flag attached to the settings object so you can check in the dra
		 * callback if sorting has been done in the draw. Deprecated in favour o
		 * events
		 *  @type boolea
		 *  @default fals
		 *  @deprecate
		 *
		"bSorted": false

		/*
		 * Indicate that if multiple rows are in the header and there is more tha
		 * one unique cell per column, if the top one (true) or bottom one (false
		 * should be used for sorting / title by DataTables
		 * Note that this parameter will be set by the initialisation routine. T
		 * set a default use {@link DataTable.defaults}
		 *  @type boolea
		 *
		"bSortCellsTop": null

		/*
		 * Initialisation object that is used for the tabl
		 *  @type objec
		 *  @default nul
		 *
		"oInit": null

		/*
		 * Destroy callback functions - for plug-ins to attach themselves to th
		 * destroy so they can clean up markup and events
		 *  @type arra
		 *  @default [
		 *
		"aoDestroyCallback": []


		/*
		 * Get the number of records in the current record set, before filterin
		 *  @type functio
		 *
		"fnRecordsTotal": function (
		
			return _fnDataSource( this ) == 'ssp' 
				this._iRecordsTotal * 1 
				this.aiDisplayMaster.length
		}

		/*
		 * Get the number of records in the current record set, after filterin
		 *  @type functio
		 *
		"fnRecordsDisplay": function (
		
			return _fnDataSource( this ) == 'ssp' 
				this._iRecordsDisplay * 1 
				this.aiDisplay.length
		}

		/*
		 * Get the display end point - aiDisplay inde
		 *  @type functio
		 *
		"fnDisplayEnd": function (
		
			va
				len      = this._iDisplayLength
				start    = this._iDisplayStart
				calc     = start + len
				records  = this.aiDisplay.length
				features = this.oFeatures
				paginate = features.bPaginate

			if ( features.bServerSide ) 
				return paginate === false || len === -1 
					start + records 
					Math.min( start+len, this._iRecordsDisplay )
			
			else 
				return ! paginate || calc>records || len===-1 
					records 
					calc
			
		}

		/*
		 * The DataTables object for this tabl
		 *  @type objec
		 *  @default nul
		 *
		"oInstance": null

		/*
		 * Unique identifier for each instance of the DataTables object. If ther
		 * is an ID on the table node, then it takes that value, otherwise a
		 * incrementing internal counter is used
		 *  @type strin
		 *  @default nul
		 *
		"sInstance": null

		/*
		 * tabindex attribute value that is added to DataTables control elements, allowin
		 * keyboard navigation of the table and its controls
		 *
		"iTabIndex": 0

		/*
		 * DIV container for the footer scrolling table if scrollin
		 *
		"nScrollHead": null

		/*
		 * DIV container for the footer scrolling table if scrollin
		 *
		"nScrollFoot": null

		/*
		 * Last applied sor
		 *  @type arra
		 *  @default [
		 *
		"aLastSort": []

		/*
		 * Stored plug-in instance
		 *  @type objec
		 *  @default {
		 *
		"oPlugins": {
	}

	/*
	 * Extension object for DataTables that is used to provide all extensio
	 * options
	 
	 * Note that the `DataTable.ext` object is available throug
	 * `jQuery.fn.dataTable.ext` where it may be accessed and manipulated. It i
	 * also aliased to `jQuery.fn.dataTableExt` for historic reasons
	 *  @namespac
	 *  @extends DataTable.models.ex
	 *


	/*
	 * DataTables extension
	 *
	 * This namespace acts as a collection area for plug-ins that can be used t
	 * extend DataTables capabilities. Indeed many of the build in method
	 * use this method to provide their own capabilities (sorting methods fo
	 * example)
	 
	 * Note that this namespace is aliased to `jQuery.fn.dataTableExt` for legac
	 * reason
	 
	 *  @namespac
	 *
	DataTable.ext = _ext = 
		/*
		 * Element class name
		 
		 *  @type objec
		 *  @default {
		 *
		classes: {}


		/*
		 * Error reporting
		 *
		 * How should DataTables report an error. Can take the value 'alert' o
		 * 'throw
		 
		 *  @type strin
		 *  @default aler
		 *
		errMode: "alert"


		/*
		 * Feature plug-ins
		 *
		 * This is an array of objects which describe the feature plug-ins that ar
		 * available to DataTables. These feature plug-ins are then available fo
		 * use through the `dom` initialisation option
		 *
		 * Each feature plug-in is described by an object which must have th
		 * following properties
		 *
		 * * `fnInit` - function that is used to initialise the plug-in
		 * * `cFeature` - a character so the feature can be enabled by the `dom
		 *   instillation option. This is case sensitive
		 
		 * The `fnInit` function has the following input parameters
		 
		 * 1. `{object}` DataTables settings object: se
		 *    {@link DataTable.models.oSettings
		 
		 * And the following return is expected
		 *
		 * * {node|null} The element which contains your feature. Note that th
		 *   return may also be void if your plug-in does not require to inject an
		 *   DOM elements into DataTables control (`dom`) - for example this migh
		 *   be useful when developing a plug-in which allows table control vi
		 *   keyboard entr
		 
		 *  @type arra
		 
		 *  @exampl
		 *    $.fn.dataTable.ext.features.push( 
		 *      "fnInit": function( oSettings ) 
		 *        return new TableTools( { "oDTSettings": oSettings } )
		 *      }
		 *      "cFeature": "T
		 *    } )
		 *
		feature: []


		/*
		 * Row searching
		 *
		 * This method of searching is complimentary to the default type base
		 * searching, and a lot more comprehensive as it allows you complete contro
		 * over the searching logic. Each element in this array is a functio
		 * (parameters described below) that is called for every row in the table
		 * and your logic decides if it should be included in the searching data se
		 * or not
		 
		 * Searching functions have the following input parameters
		 
		 * 1. `{object}` DataTables settings object: se
		 *    {@link DataTable.models.oSettings
		 * 2. `{array|object}` Data for the row to be processed (same as th
		 *    original format that was passed in as the data source, or an arra
		 *    from a DOM data sourc
		 * 3. `{int}` Row index ({@link DataTable.models.oSettings.aoData}), whic
		 *    can be useful to retrieve the `TR` element if you need DOM interaction
		 
		 * And the following return is expected
		 
		 * * {boolean} Include the row in the searched result set (true) or no
		 *   (false
		 
		 * Note that as with the main search ability in DataTables, technically thi
		 * is "filtering", since it is subtractive. However, for consistency i
		 * naming we call it searching here
		 
		 *  @type arra
		 *  @default [
		 
		 *  @exampl
		 *    // The following example shows custom search being applied to th
		 *    // fourth column (i.e. the data[3] index) based on two input value
		 *    // from the end-user, matching the data in a certain range
		 *    $.fn.dataTable.ext.search.push
		 *      function( settings, data, dataIndex ) 
		 *        var min = document.getElementById('min').value * 1
		 *        var max = document.getElementById('max').value * 1
		 *        var version = data[3] == "-" ? 0 : data[3]*1
		 
		 *        if ( min == "" && max == "" ) 
		 *          return true
		 *        
		 *        else if ( min == "" && version < max ) 
		 *          return true
		 *        
		 *        else if ( min < version && "" == max ) 
		 *          return true
		 *        
		 *        else if ( min < version && version < max ) 
		 *          return true
		 *        
		 *        return false
		 *      
		 *    )
		 *
		search: []


		/*
		 * Internal functions, exposed for used in plug-ins
		 *
		 * Please note that you should not need to use the internal methods fo
		 * anything other than a plug-in (and even then, try to avoid if possible)
		 * The internal function may change between releases
		 
		 *  @type objec
		 *  @default {
		 *
		internal: {}


		/*
		 * Legacy configuration options. Enable and disable legacy options tha
		 * are available in DataTables
		 
		 *  @type objec
		 *
		legacy: 
			/*
			 * Enable / disable DataTables 1.9 compatible server-side processin
			 * request
			 
			 *  @type boolea
			 *  @default fals
			 *
			ajax: fals
		}


		/*
		 * Pagination plug-in methods
		 *
		 * Each entry in this object is a function and defines which buttons shoul
		 * be shown by the pagination rendering method that is used for the table
		 * {@link DataTable.ext.renderer.pageButton}. The renderer addresses how th
		 * buttons are displayed in the document, while the functions here tell i
		 * what buttons to display. This is done by returning an array of butto
		 * descriptions (what each button will do)
		 
		 * Pagination types (the four built in options and any additional plug-i
		 * options defined here) can be used through the `paginationType
		 * initialisation parameter
		 
		 * The functions defined take two parameters
		 
		 * 1. `{int} page` The current page inde
		 * 2. `{int} pages` The number of pages in the tabl
		 
		 * Each function is expected to return an array where each element of th
		 * array can be one of
		 
		 * * `first` - Jump to first page when activate
		 * * `last` - Jump to last page when activate
		 * * `previous` - Show previous page when activate
		 * * `next` - Show next page when activate
		 * * `{int}` - Show page of the index give
		 * * `{array}` - A nested array containing the above elements to add 
		 *   containing 'DIV' element (might be useful for styling)
		 
		 * Note that DataTables v1.9- used this object slightly differently whereb
		 * an object with two functions would be defined for each plug-in. Tha
		 * ability is still supported by DataTables 1.10+ to provide backward
		 * compatibility, but this option of use is now decremented and no longe
		 * documented in DataTables 1.10+
		 
		 *  @type objec
		 *  @default {
		 
		 *  @exampl
		 *    // Show previous, next and current page buttons onl
		 *    $.fn.dataTableExt.oPagination.current = function ( page, pages ) 
		 *      return [ 'previous', page, 'next' ]
		 *    }
		 *
		pager: {}


		renderer: 
			pageButton: {}
			header: {
		}


		/*
		 * Ordering plug-ins - custom data sourc
		 *
		 * The extension options for ordering of data available here is complimentar
		 * to the default type based ordering that DataTables typically uses. I
		 * allows much greater control over the the data that is being used t
		 * order a column, but is necessarily therefore more complex
		 *
		 * This type of ordering is useful if you want to do ordering based on dat
		 * live from the DOM (for example the contents of an 'input' element) rathe
		 * than just the static string that DataTables knows of
		 *
		 * The way these plug-ins work is that you create an array of the values yo
		 * wish to be ordering for the column in question and then return tha
		 * array. The data in the array much be in the index order of the rows i
		 * the table (not the currently ordering order!). Which order data gatherin
		 * function is run here depends on the `dt-init columns.orderDataType
		 * parameter that is used for the column (if any)
		 
		 * The functions defined take two parameters
		 
		 * 1. `{object}` DataTables settings object: se
		 *    {@link DataTable.models.oSettings
		 * 2. `{int}` Target column inde
		 
		 * Each function is expected to return an array
		 
		 * * `{array}` Data for the column to be ordering upo
		 
		 *  @type arra
		 
		 *  @exampl
		 *    // Ordering using `input` node value
		 *    $.fn.dataTable.ext.order['dom-text'] = function  ( settings, col 
		 *    
		 *      return this.api().column( col, {order:'index'} ).nodes().map( function ( td, i ) 
		 *        return $('input', td).val()
		 *      } )
		 *    
		 *
		order: {}


		/*
		 * Type based plug-ins
		 
		 * Each column in DataTables has a type assigned to it, either by automati
		 * detection or by direct assignment using the `type` option for the column
		 * The type of a column will effect how it is ordering and search (plug-in
		 * can also make use of the column type if required)
		 
		 * @namespac
		 *
		type: 
			/*
			 * Type detection functions
			 
			 * The functions defined in this object are used to automatically detec
			 * a column's type, making initialisation of DataTables super easy, eve
			 * when complex data is in the table
			 
			 * The functions defined take a single parameter
			 
		     *  1. `{*}` Data from the column cell to be analyse
			 
			 * Each function is expected to return
			 
			 * * `{string|null}` Data type detected, or null if unknown (and thu
			 *   pass it on to the other type detection functions
			 
			 *  @type arra
			 
			 *  @exampl
			 *    // Currency type detection plug-in
			 *    $.fn.dataTable.ext.type.detect.push
			 *      function ( data ) 
			 *        // Check the numeric par
			 *        if ( ! $.isNumeric( data.substring(1) ) ) 
			 *          return null
			 *        
			 
			 *        // Check prefixed by currenc
			 *        if ( data.charAt(0) == '$' || data.charAt(0) == '&pound;' ) 
			 *          return 'currency'
			 *        
			 *        return null
			 *      
			 *    )
			 *
			detect: []


			/*
			 * Type based search formatting
			 
			 * The type based searching functions can be used to pre-format th
			 * data to be search on. For example, it can be used to strip HTM
			 * tags or to de-format telephone numbers for numeric only searching
			 
			 * Note that is a search is not defined for a column of a given type
			 * no search formatting will be performed
			 *
			 * Pre-processing of searching data plug-ins - When you assign the sTyp
			 * for a column (or have it automatically detected for you by DataTable
			 * or a type detection plug-in), you will typically be using this fo
			 * custom sorting, but it can also be used to provide custom searchin
			 * by allowing you to pre-processing the data and returning the data i
			 * the format that should be searched upon. This is done by addin
			 * functions this object with a parameter name which matches the sTyp
			 * for that target column. This is the corollary of <i>afnSortData</i
			 * for searching data
			 
			 * The functions defined take a single parameter
			 
		     *  1. `{*}` Data from the column cell to be prepared for searchin
			 
			 * Each function is expected to return
			 
			 * * `{string|null}` Formatted string that will be used for the searching
			 
			 *  @type objec
			 *  @default {
			 
			 *  @exampl
			 *    $.fn.dataTable.ext.type.search['title-numeric'] = function ( d ) 
			 *      return d.replace(/\n/g," ").replace( /<.*?>/g, "" )
			 *    
			 *
			search: {}


			/*
			 * Type based ordering
			 
			 * The column type tells DataTables what ordering to apply to the tabl
			 * when a column is sorted upon. The order for each type that is defined
			 * is defined by the functions available in this object
			 
			 * Each ordering option can be described by three properties added t
			 * this object
			 
			 * * `{type}-pre` - Pre-formatting functio
			 * * `{type}-asc` - Ascending order functio
			 * * `{type}-desc` - Descending order functio
			 
			 * All three can be used together, only `{type}-pre` or onl
			 * `{type}-asc` and `{type}-desc` together. It is generally recommende
			 * that only `{type}-pre` is used, as this provides the optima
			 * implementation in terms of speed, although the others are provide
			 * for compatibility with existing Javascript sort functions
			 
			 * `{type}-pre`: Functions defined take a single parameter
			 
		     *  1. `{*}` Data from the column cell to be prepared for orderin
			 
			 * And return
			 
			 * * `{*}` Data to be sorted upo
			 
			 * `{type}-asc` and `{type}-desc`: Functions are typical Javascript sor
			 * functions, taking two parameters
			 
		     *  1. `{*}` Data to compare to the second paramete
		     *  2. `{*}` Data to compare to the first paramete
			 
			 * And returning
			 
			 * * `{*}` Ordering match: <0 if first parameter should be sorted lowe
			 *   than the second parameter, ===0 if the two parameters are equal an
			 *   >0 if the first parameter should be sorted height than the secon
			 *   parameter
			 *
			 *  @type objec
			 *  @default {
			 
			 *  @exampl
			 *    // Numeric ordering of formatted numbers with a pre-formatte
			 *    $.extend( $.fn.dataTable.ext.type.order, 
			 *      "string-pre": function(x) 
			 *        a = (a === "-" || a === "") ? 0 : a.replace( /[^\d\-\.]/g, "" )
			 *        return parseFloat( a )
			 *      
			 *    } )
			 
			 *  @exampl
			 *    // Case-sensitive string ordering, with no pre-formatting metho
			 *    $.extend( $.fn.dataTable.ext.order, 
			 *      "string-case-asc": function(x,y) 
			 *        return ((x < y) ? -1 : ((x > y) ? 1 : 0))
			 *      }
			 *      "string-case-desc": function(x,y) 
			 *        return ((x < y) ? 1 : ((x > y) ? -1 : 0))
			 *      
			 *    } )
			 *
			order: {
		}

		/*
		 * Unique DataTables instance counte
		 
		 * @type in
		 * @privat
		 *
		_unique: 0


		/
		// Depreciate
		// The following properties are retained for backwards compatiblity only
		// The should not be used in new projects and will be removed in a futur
		// versio
		/

		/*
		 * Version check function
		 *  @type functio
		 *  @depreciated Since 1.1
		 *
		fnVersionCheck: DataTable.fnVersionCheck


		/*
		 * Index for what 'this' index API functions should us
		 *  @type in
		 *  @deprecated Since v1.1
		 *
		iApiIndex: 0


		/*
		 * jQuery UI class containe
		 *  @type objec
		 *  @deprecated Since v1.1
		 *
		oJUIClasses: {}


		/*
		 * Software versio
		 *  @type strin
		 *  @deprecated Since v1.1
		 *
		sVersion: DataTable.versio
	}


	/
	// Backwards compatibility. Alias to pre 1.10 Hungarian notation counter part
	/
	$.extend( _ext, 
		afnFiltering: _ext.search
		aTypes:       _ext.type.detect
		ofnSearch:    _ext.type.search
		oSort:        _ext.type.order
		afnSortData:  _ext.order
		aoFeatures:   _ext.feature
		oApi:         _ext.internal
		oStdClasses:  _ext.classes
		oPagination:  _ext.page
	} )


	$.extend( DataTable.ext.classes, 
		"sTable": "dataTable"
		"sNoFooter": "no-footer"

		/* Paging buttons *
		"sPageButton": "paginate_button"
		"sPageButtonActive": "current"
		"sPageButtonDisabled": "disabled"

		/* Striping classes *
		"sStripeOdd": "odd"
		"sStripeEven": "even"

		/* Empty row *
		"sRowEmpty": "dataTables_empty"

		/* Features *
		"sWrapper": "dataTables_wrapper"
		"sFilter": "dataTables_filter"
		"sInfo": "dataTables_info"
		"sPaging": "dataTables_paginate paging_", /* Note that the type is postfixed *
		"sLength": "dataTables_length"
		"sProcessing": "dataTables_processing"

		/* Sorting *
		"sSortAsc": "sorting_asc"
		"sSortDesc": "sorting_desc"
		"sSortable": "sorting", /* Sortable in both directions *
		"sSortableAsc": "sorting_asc_disabled"
		"sSortableDesc": "sorting_desc_disabled"
		"sSortableNone": "sorting_disabled"
		"sSortColumn": "sorting_", /* Note that an int is postfixed for the sorting order *

		/* Filtering *
		"sFilterInput": ""

		/* Page length *
		"sLengthSelect": ""

		/* Scrolling *
		"sScrollWrapper": "dataTables_scroll"
		"sScrollHead": "dataTables_scrollHead"
		"sScrollHeadInner": "dataTables_scrollHeadInner"
		"sScrollBody": "dataTables_scrollBody"
		"sScrollFoot": "dataTables_scrollFoot"
		"sScrollFootInner": "dataTables_scrollFootInner"

		/* Misc *
		"sHeaderTH": ""
		"sFooterTH": ""

		// Deprecate
		"sSortJUIAsc": ""
		"sSortJUIDesc": ""
		"sSortJUI": ""
		"sSortJUIAscAllowed": ""
		"sSortJUIDescAllowed": ""
		"sSortJUIWrapper": ""
		"sSortIcon": ""
		"sJUIHeader": ""
		"sJUIFooter": "
	} )


	(function() 

	// Reused strings for better compression. Closure compiler appears to have 
	// weird edge case where it is trying to expand strings rather than use th
	// variable version. This results in about 200 bytes being added, for ver
	// little preference benefit since it this run on script load only
	var _empty = ''
	_empty = ''

	var _stateDefault = _empty + 'ui-state-default'
	var _sortIcon     = _empty + 'css_right ui-icon ui-icon-'
	var _headerFooter = _empty + 'fg-toolbar ui-toolbar ui-widget-header ui-helper-clearfix'

	$.extend( DataTable.ext.oJUIClasses, DataTable.ext.classes, 
		/* Full numbers paging buttons *
		"sPageButton":         "fg-button ui-button "+_stateDefault
		"sPageButtonActive":   "ui-state-disabled"
		"sPageButtonDisabled": "ui-state-disabled"

		/* Features *
		"sPaging": "dataTables_paginate fg-buttonset ui-buttonset fg-buttonset-multi "
			"ui-buttonset-multi paging_", /* Note that the type is postfixed *

		/* Sorting *
		"sSortAsc":            _stateDefault+" sorting_asc"
		"sSortDesc":           _stateDefault+" sorting_desc"
		"sSortable":           _stateDefault+" sorting"
		"sSortableAsc":        _stateDefault+" sorting_asc_disabled"
		"sSortableDesc":       _stateDefault+" sorting_desc_disabled"
		"sSortableNone":       _stateDefault+" sorting_disabled"
		"sSortJUIAsc":         _sortIcon+"triangle-1-n"
		"sSortJUIDesc":        _sortIcon+"triangle-1-s"
		"sSortJUI":            _sortIcon+"carat-2-n-s"
		"sSortJUIAscAllowed":  _sortIcon+"carat-1-n"
		"sSortJUIDescAllowed": _sortIcon+"carat-1-s"
		"sSortJUIWrapper":     "DataTables_sort_wrapper"
		"sSortIcon":           "DataTables_sort_icon"

		/* Scrolling *
		"sScrollHead": "dataTables_scrollHead "+_stateDefault
		"sScrollFoot": "dataTables_scrollFoot "+_stateDefault

		/* Misc *
		"sHeaderTH":  _stateDefault
		"sFooterTH":  _stateDefault
		"sJUIHeader": _headerFooter+" ui-corner-tl ui-corner-tr"
		"sJUIFooter": _headerFooter+" ui-corner-bl ui-corner-br
	} )

	}())



	var extPagination = DataTable.ext.pager

	function _numbers ( page, pages ) 
		va
			numbers = []
			buttons = extPagination.numbers_length
			half = Math.floor( buttons / 2 )
			i = 1

		if ( pages <= buttons ) 
			numbers = _range( 0, pages )
		
		else if ( page <= half ) 
			numbers = _range( 0, buttons-2 )
			numbers.push( 'ellipsis' )
			numbers.push( pages-1 )
		
		else if ( page >= pages - 1 - half ) 
			numbers = _range( pages-(buttons-2), pages )
			numbers.splice( 0, 0, 'ellipsis' ); // no unshift in ie
			numbers.splice( 0, 0, 0 )
		
		else 
			numbers = _range( page-1, page+2 )
			numbers.push( 'ellipsis' )
			numbers.push( pages-1 )
			numbers.splice( 0, 0, 'ellipsis' )
			numbers.splice( 0, 0, 0 )
		

		numbers.DT_el = 'span'
		return numbers
	


	$.extend( extPagination, 
		simple: function ( page, pages ) 
			return [ 'previous', 'next' ]
		}

		full: function ( page, pages ) 
			return [  'first', 'previous', 'next', 'last' ]
		}

		simple_numbers: function ( page, pages ) 
			return [ 'previous', _numbers(page, pages), 'next' ]
		}

		full_numbers: function ( page, pages ) 
			return [ 'first', 'previous', _numbers(page, pages), 'next', 'last' ]
		}

		// For testing and plug-ins to us
		_numbers: _numbers
		numbers_length: 
	} )


	$.extend( true, DataTable.ext.renderer, 
		pageButton: 
			_: function ( settings, host, idx, buttons, page, pages ) 
				var classes = settings.oClasses
				var lang = settings.oLanguage.oPaginate
				var btnDisplay, btnClass

				var attach = function( container, buttons ) 
					var i, ien, node, button
					var clickHandler = function ( e ) 
						_fnPageChange( settings, e.data.action, true )
					}

					for ( i=0, ien=buttons.length ; i<ien ; i++ ) 
						button = buttons[i]

						if ( $.isArray( button ) ) 
							var inner = $( '<'+(button.DT_el || 'div')+'/>' 
								.appendTo( container )
							attach( inner, button )
						
						else 
							btnDisplay = ''
							btnClass = ''

							switch ( button ) 
								case 'ellipsis'
									container.append('<span>&hellip;</span>')
									break

								case 'first'
									btnDisplay = lang.sFirst
									btnClass = button + (page > 0 
										'' : ' '+classes.sPageButtonDisabled)
									break

								case 'previous'
									btnDisplay = lang.sPrevious
									btnClass = button + (page > 0 
										'' : ' '+classes.sPageButtonDisabled)
									break

								case 'next'
									btnDisplay = lang.sNext
									btnClass = button + (page < pages-1 
										'' : ' '+classes.sPageButtonDisabled)
									break

								case 'last'
									btnDisplay = lang.sLast
									btnClass = button + (page < pages-1 
										'' : ' '+classes.sPageButtonDisabled)
									break

								default
									btnDisplay = button + 1
									btnClass = page === button 
										classes.sPageButtonActive : ''
									break
							

							if ( btnDisplay ) 
								node = $('<a>', 
										'class': classes.sPageButton+' '+btnClass
										'aria-controls': settings.sTableId
										'tabindex': settings.iTabIndex
										'id': idx === 0 && typeof button === 'string' 
											settings.sTableId +'_'+ button 
											nul
									} 
									.html( btnDisplay 
									.appendTo( container )

								_fnBindAction
									node, {action: button}, clickHandle
								)
							
						
					
				}

				attach( $(host).empty(), buttons )
			
		
	} )



	var __numericReplace = function ( d, re1, re2 ) 
		if ( !d || d === '-' ) 
			return -Infinity
		

		if ( d.replace ) 
			if ( re1 ) 
				d = d.replace( re1, '' )
			

			if ( re2 ) 
				d = d.replace( re2, '' )
			
		

		return d * 1
	}


	$.extend( DataTable.ext.type.order, 
		// Date
		"date-pre": function ( d 
		
			return Date.parse( d ) || 0
		}

		// Plain number
		"numeric-pre": function ( d 
		
			return __numericReplace( d )
		}

		// Formatted number
		"numeric-fmt-pre": function ( d 
		
			return __numericReplace( d, _re_formatted_numeric )
		}

		// HTML numeri
		"html-numeric-pre": function ( d 
		
			return __numericReplace( d, _re_html )
		}

		// HTML numeric, formatte
		"html-numeric-fmt-pre": function ( d 
		
			return __numericReplace( d, _re_html, _re_formatted_numeric )
		}

		// htm
		"html-pre": function ( a 
		
			return a.replace 
				a.replace( /<.*?>/g, "" ).toLowerCase() 
				a+''
		}

		// strin
		"string-pre": function ( a 
		
			return typeof a === 'string' 
				a.toLowerCase() 
				! a || ! a.toString 
					'' 
					a.toString()
		}

		// string-asc and -desc are retained only for compatibility with the ol
		// sort method
		"string-asc": function ( x, y 
		
			return ((x < y) ? -1 : ((x > y) ? 1 : 0))
		}

		"string-desc": function ( x, y 
		
			return ((x < y) ? 1 : ((x > y) ? -1 : 0))
		
	} )


	// Built in type detection. See model.ext.aTypes for information abou
	// what is required from this methods
	$.extend( DataTable.ext.type.detect, 
		// Plain numbers - first since V8 detects some plain numbers as date
		// e.g. Date.parse('55') (but not all, e.g. Date.parse('22')...)
		function ( d 
		
			return _isNumber( d ) ? 'numeric' : null
		}

		// Dates (only those recognised by the browser's Date.parse
		function ( d 
		
			// V8 will remove any unknown characters at the start of the expression
			// leading to false matches such as `$245.12` being a valid date. Se
			// forum thread 18941 for detail
			if ( d && ! _re_date_start.test(d) ) 
				return null
			
			var parsed = Date.parse(d)
			return (parsed !== null && !isNaN(parsed)) || _empty(d) ? 'date' : null
		}

		// Formatted number
		function ( d 
		
			return _isNumber( d, true ) ? 'numeric-fmt' : null
		}

		// HTML numeri
		function ( d 
		
			return _htmlNumeric( d ) ? 'html-numeric' : null
		}

		// HTML numeric, formatte
		function ( d 
		
			return _htmlNumeric( d, true ) ? 'html-numeric-fmt' : null
		}

		// HTML (this is strict checking - there much be html
		function ( d 
		
			return _empty( d ) || (typeof d === 'string' && d.indexOf('<') !== -1) 
				'html' : null
		
	] )



	// Filter formatting functions. See model.ext.ofnSearch for information abou
	// what is required from these methods


	$.extend( DataTable.ext.type.search, 
		html: function ( data ) 
			return _empty(data) 
				'' 
				typeof data === 'string' 
					dat
						.replace( _re_new_lines, " " 
						.replace( _re_html, "" ) 
					''
		}

		string: function ( data ) 
			return _empty(data) 
				'' 
				typeof data === 'string' 
					data.replace( _re_new_lines, " " ) 
					data
		
	} )



	$.extend( true, DataTable.ext.renderer, 
		header: 
			_: function ( settings, cell, column, idx, classes ) 
				// No additional mark-up require

				// Attach a sort listener to update on sor
				$(settings.nTable).on( 'order.dt', function ( e, settings, sorting, columns ) 
					cel
						.removeClass
							column.sSortingClass +' '
							classes.sSortAsc +' '
							classes.sSortDes
						
						.addClass( columns[ idx ] == 'asc' 
							classes.sSortAsc : columns[ idx ] == 'desc' 
								classes.sSortDesc 
								column.sSortingClas
						)
				} )
			}

			jqueryui: function ( settings, cell, column, idx, classes ) 
				$('<div/>'
					.addClass( classes.sSortJUIWrapper 
					.append( cell.contents() 
					.append( $('<span/>'
						.addClass( classes.sSortIcon+' '+column.sSortingClassJUI 
					
					.appendTo( cell )

				// Attach a sort listener to update on sor
				$(settings.nTable).on( 'order.dt', function ( e, settings, sorting, columns ) 
					cel
						.removeClass( classes.sSortAsc +" "+classes.sSortDesc 
						.addClass( columns[ idx ] == 'asc' 
							classes.sSortAsc : columns[ idx ] == 'desc' 
								classes.sSortDesc 
								column.sSortingClas
						)

					cel
						.find( 'span' 
						.removeClass
							classes.sSortJUIAsc +" "
							classes.sSortJUIDesc +" "
							classes.sSortJUI +" "
							classes.sSortJUIAscAllowed +" "
							classes.sSortJUIDescAllowe
						
						.addClass( columns[ idx ] == 'asc' 
							classes.sSortJUIAsc : columns[ idx ] == 'desc' 
								classes.sSortJUIDesc 
								column.sSortingClassJU
						)
				} )
			
		
	} )


	// jQuery acces
	$.fn.dataTable = DataTable

	// Legacy aliase
	$.fn.dataTableSettings = DataTable.settings
	$.fn.dataTableExt = DataTable.ext

	// With a capital `D` we return a DataTables API instance rather than 
	// jQuery objec
	$.fn.DataTable = function ( opts ) 
		return $(this).dataTable( opts ).api()
	}

	// All properties that are available to $.fn.dataTable should also b
	// available on $.fn.DataTabl
	$.each( DataTable, function ( prop, val ) 
		$.fn.DataTable[ prop ] = val
	} )

	// Information about events fired by DataTables - for documentation
	/*
	 * Draw event, fired whenever the table is redrawn on the page, at the sam
	 * point as fnDrawCallback. This may be useful for binding events o
	 * performing calculations when the table is altered at all
	 *  @name DataTable#draw.d
	 *  @even
	 *  @param {event} e jQuery event objec
	 *  @param {object} o DataTables settings object {@link DataTable.models.oSettings
	 *

	/*
	 * Search event, fired when the searching applied to the table (using th
	 * built-in global search, or column filters) is altered
	 *  @name DataTable#search.d
	 *  @even
	 *  @param {event} e jQuery event objec
	 *  @param {object} o DataTables settings object {@link DataTable.models.oSettings
	 *

	/*
	 * Page change event, fired when the paging of the table is altered
	 *  @name DataTable#page.d
	 *  @even
	 *  @param {event} e jQuery event objec
	 *  @param {object} o DataTables settings object {@link DataTable.models.oSettings
	 *

	/*
	 * Order event, fired when the ordering applied to the table is altered
	 *  @name DataTable#order.d
	 *  @even
	 *  @param {event} e jQuery event objec
	 *  @param {object} o DataTables settings object {@link DataTable.models.oSettings
	 *

	/*
	 * DataTables initialisation complete event, fired when the table is full
	 * drawn, including Ajax data loaded, if Ajax data is required
	 *  @name DataTable#init.d
	 *  @even
	 *  @param {event} e jQuery event objec
	 *  @param {object} oSettings DataTables settings objec
	 *  @param {object} json The JSON object request from the server - onl
	 *    present if client-side Ajax sourced data is used</li></ol
	 *

	/*
	 * State save event, fired when the table has changed state a new state sav
	 * is required. This event allows modification of the state saving objec
	 * prior to actually doing the save, including addition or other stat
	 * properties (for plug-ins) or modification of a DataTables core property
	 *  @name DataTable#stateSaveParams.d
	 *  @even
	 *  @param {event} e jQuery event objec
	 *  @param {object} oSettings DataTables settings objec
	 *  @param {object} json The state information to be save
	 *

	/*
	 * State load event, fired when the table is loading state from the store
	 * data, but prior to the settings object being modified by the saved stat
	 * - allowing modification of the saved state is required or loading o
	 * state for a plug-in
	 *  @name DataTable#stateLoadParams.d
	 *  @even
	 *  @param {event} e jQuery event objec
	 *  @param {object} oSettings DataTables settings objec
	 *  @param {object} json The saved state informatio
	 *

	/*
	 * State loaded event, fired when state has been loaded from stored data an
	 * the settings object has been modified by the loaded data
	 *  @name DataTable#stateLoaded.d
	 *  @even
	 *  @param {event} e jQuery event objec
	 *  @param {object} oSettings DataTables settings objec
	 *  @param {object} json The saved state informatio
	 *

	/*
	 * Processing event, fired when DataTables is doing some kind of processin
	 * (be it, order, searcg or anything else). It can be used to indicate t
	 * the end user that there is something happening, or that something ha
	 * finished
	 *  @name DataTable#processing.d
	 *  @even
	 *  @param {event} e jQuery event objec
	 *  @param {object} oSettings DataTables settings objec
	 *  @param {boolean} bShow Flag for if DataTables is doing processing or no
	 *

	/*
	 * Ajax (XHR) event, fired whenever an Ajax request is completed from 
	 * request to made to the server for new data. This event is called befor
	 * DataTables processed the returned data, so it can also be used to pre
	 * process the data returned from the server, if needed
	 
	 * Note that this trigger is called in `fnServerData`, if you overrid
	 * `fnServerData` and which to use this event, you need to trigger it in yo
	 * success function
	 *  @name DataTable#xhr.d
	 *  @even
	 *  @param {event} e jQuery event objec
	 *  @param {object} o DataTables settings object {@link DataTable.models.oSettings
	 *  @param {object} json JSON returned from the serve
	 
	 *  @exampl
	 *     // Use a custom property returned from the server in another DOM elemen
	 *     $('#table').dataTable().on('xhr.dt', function (e, settings, json) 
	 *       $('#status').html( json.status )
	 *     } )
	 
	 *  @exampl
	 *     // Pre-process the data returned from the serve
	 *     $('#table').dataTable().on('xhr.dt', function (e, settings, json) 
	 *       for ( var i=0, ien=json.aaData.length ; i<ien ; i++ ) 
	 *         json.aaData[i].sum = json.aaData[i].one + json.aaData[i].two
	 *       
	 *       // Note no return - manipulate the data directly in the JSON object
	 *     } )
	 *

	/*
	 * Destroy event, fired when the DataTable is destroyed by calling fnDestro
	 * or passing the bDestroy:true parameter in the initialisation object. Thi
	 * can be used to remove bound events, added DOM nodes, etc
	 *  @name DataTable#destroy.d
	 *  @even
	 *  @param {event} e jQuery event objec
	 *  @param {object} o DataTables settings object {@link DataTable.models.oSettings
	 *

	/*
	 * Page length change event, fired when number of records to show on eac
	 * page (the length) is changed
	 *  @name DataTable#length.d
	 *  @even
	 *  @param {event} e jQuery event objec
	 *  @param {object} o DataTables settings object {@link DataTable.models.oSettings
	 *  @param {integer} len New lengt
	 *

	/*
	 * Column sizing has changed
	 *  @name DataTable#column-sizing.d
	 *  @even
	 *  @param {event} e jQuery event objec
	 *  @param {object} o DataTables settings object {@link DataTable.models.oSettings
	 *

	/*
	 * Column visibility has changed
	 *  @name DataTable#column-visibility.d
	 *  @even
	 *  @param {event} e jQuery event objec
	 *  @param {object} o DataTables settings object {@link DataTable.models.oSettings
	 *  @param {int} column Column inde
	 *  @param {bool} vis `false` if column now hidden, or `true` if visibl
	 *

	return $.fn.dataTable
}))

}(window, document));

