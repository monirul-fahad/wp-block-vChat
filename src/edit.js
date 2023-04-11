import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	RichText,
	BlockControls,
	AlignmentToolbar,
	InspectorControls,
	MediaUpload,
} from '@wordpress/block-editor';
import {
	PanelBody,
	ToggleControl,
	Button,
	ComboboxControl,
} from '@wordpress/components';
import { useState } from '@wordpress/element';

const { SelectControl, TextControl } = wp.components;
import classnames from 'classnames';
import './editor.scss';

const timezones = [
	{
		value: 'Africa/Abidjan',
		label: __('Africa/Abidjan', 'ta-vchat'),
	},
	{
		value: 'Africa/Accra',
		label: __('Africa/Accra', 'ta-vchat'),
	},
	{
		value: 'Africa/Addis_Ababa',
		label: __('Africa/Addis_Ababa', 'ta-vchat'),
	},
	{
		value: 'Africa/Algiers',
		label: __('Africa/Algiers', 'ta-vchat'),
	},
	{
		value: 'Africa/Asmara',
		label: __('Africa/Asmara', 'ta-vchat'),
	},
	{
		value: 'Africa/Asmera',
		label: __('Africa/Asmera', 'ta-vchat'),
	},
	{
		value: 'Africa/Bamako',
		label: __('Africa/Bamako', 'ta-vchat'),
	},
	{
		value: 'Africa/Bangui',
		label: __('Africa/Bangui', 'ta-vchat'),
	},
	{
		value: 'Africa/Banjul',
		label: __('Africa/Banjul', 'ta-vchat'),
	},
	{
		value: 'Africa/Bissau',
		label: __('Africa/Bissau', 'ta-vchat'),
	},
	{
		value: 'Africa/Blantyre',
		label: __('Africa/Blantyre', 'ta-vchat'),
	},
	{
		value: 'Africa/Brazzaville',
		label: __('Africa/Brazzaville', 'ta-vchat'),
	},
	{
		value: 'Africa/Bujumbura',
		label: __('Africa/Bujumbura', 'ta-vchat'),
	},
	{
		value: 'Africa/Cairo',
		label: __('Africa/Cairo', 'ta-vchat'),
	},
	{
		value: 'Africa/Casablanca',
		label: __('Africa/Casablanca', 'ta-vchat'),
	},
	{
		value: 'Africa/Ceuta',
		label: __('Africa/Ceuta', 'ta-vchat'),
	},
	{
		value: 'Africa/Conakry',
		label: __('Africa/Conakry', 'ta-vchat'),
	},
	{
		value: 'Africa/Dakar',
		label: __('Africa/Dakar', 'ta-vchat'),
	},
	{
		value: 'Africa/Dar_es_Salaam',
		label: __('Africa/Dar_es_Salaam', 'ta-vchat'),
	},
	{
		value: 'Africa/Djibouti',
		label: __('Africa/Djibouti', 'ta-vchat'),
	},
	{
		value: 'Africa/Douala',
		label: __('Africa/Douala', 'ta-vchat'),
	},
	{
		value: 'Africa/El_Aaiun',
		label: __('Africa/El_Aaiun', 'ta-vchat'),
	},
	{
		value: 'Africa/Freetown',
		label: __('Africa/Freetown', 'ta-vchat'),
	},
	{
		value: 'Africa/Gaborone',
		label: __('Africa/Gaborone', 'ta-vchat'),
	},
	{
		value: 'Africa/Harare',
		label: __('Africa/Harare', 'ta-vchat'),
	},
	{
		value: 'Africa/Johannesburg',
		label: __('Africa/Johannesburg', 'ta-vchat'),
	},
	{
		value: 'Africa/Juba',
		label: __('Africa/Juba', 'ta-vchat'),
	},
	{
		value: 'Africa/Kampala',
		label: __('Africa/Kampala', 'ta-vchat'),
	},
	{
		value: 'Africa/Khartoum',
		label: __('Africa/Khartoum', 'ta-vchat'),
	},
	{
		value: 'Africa/Kigali',
		label: __('Africa/Kigali', 'ta-vchat'),
	},
	{
		value: 'Africa/Kinshasa',
		label: __('Africa/Kinshasa', 'ta-vchat'),
	},
	{
		value: 'Africa/Lagos',
		label: __('Africa/Lagos', 'ta-vchat'),
	},
	{
		value: 'Africa/Libreville',
		label: __('Africa/Libreville', 'ta-vchat'),
	},
	{
		value: 'Africa/Lome',
		label: __('Africa/Lome', 'ta-vchat'),
	},
	{
		value: 'Africa/Luanda',
		label: __('Africa/Luanda', 'ta-vchat'),
	},
	{
		value: 'Africa/Lubumbashi',
		label: __('Africa/Lubumbashi', 'ta-vchat'),
	},
	{
		value: 'Africa/Lusaka',
		label: __('Africa/Lusaka', 'ta-vchat'),
	},
	{
		value: 'Africa/Malabo',
		label: __('Africa/Malabo', 'ta-vchat'),
	},
	{
		value: 'Africa/Maputo',
		label: __('Africa/Maputo', 'ta-vchat'),
	},
	{
		value: 'Africa/Maseru',
		label: __('Africa/Maseru', 'ta-vchat'),
	},
	{
		value: 'Africa/Mbabane',
		label: __('Africa/Mbabane', 'ta-vchat'),
	},
	{
		value: 'Africa/Mogadishu',
		label: __('Africa/Mogadishu', 'ta-vchat'),
	},
	{
		value: 'Africa/Monrovia',
		label: __('Africa/Monrovia', 'ta-vchat'),
	},
	{
		value: 'Africa/Nairobi',
		label: __('Africa/Nairobi', 'ta-vchat'),
	},
	{
		value: 'Africa/Ndjamena',
		label: __('Africa/Ndjamena', 'ta-vchat'),
	},
	{
		value: 'Africa/Niamey',
		label: __('Africa/Niamey', 'ta-vchat'),
	},
	{
		value: 'Africa/Nouakchott',
		label: __('Africa/Nouakchott', 'ta-vchat'),
	},
	{
		value: 'Africa/Ouagadougou',
		label: __('Africa/Ouagadougou', 'ta-vchat'),
	},
	{
		value: 'Africa/Porto-Novo',
		label: __('Africa/Porto-Novo', 'ta-vchat'),
	},
	{
		value: 'Africa/Sao_Tome',
		label: __('Africa/Sao_Tome', 'ta-vchat'),
	},
	{
		value: 'Africa/Timbuktu',
		label: __('Africa/Timbuktu', 'ta-vchat'),
	},
	{
		value: 'Africa/Tripoli',
		label: __('Africa/Tripoli', 'ta-vchat'),
	},
	{
		value: 'Africa/Tunis',
		label: __('Africa/Tunis', 'ta-vchat'),
	},
	{
		value: 'Africa/Windhoek',
		label: __('Africa/Windhoek', 'ta-vchat'),
	},
	{
		value: 'America/Adak',
		label: __('America/Adak', 'ta-vchat'),
	},
	{
		value: 'America/Anchorage',
		label: __('America/Anchorage', 'ta-vchat'),
	},
	{
		value: 'America/Anguilla',
		label: __('America/Anguilla', 'ta-vchat'),
	},
	{
		value: 'America/Antigua',
		label: __('America/Antigua', 'ta-vchat'),
	},
	{
		value: 'America/Araguaina',
		label: __('America/Araguaina', 'ta-vchat'),
	},
	{
		value: 'America/Argentina/Buenos_Aires',
		label: __('America/Argentina/Buenos_Aires', 'ta-vchat'),
	},
	{
		value: 'America/Argentina/Catamarca',
		label: __('America/Argentina/Catamarca', 'ta-vchat'),
	},
	{
		value: 'America/Argentina/ComodRivadavia',
		label: __('America/Argentina/ComodRivadavia', 'ta-vchat'),
	},
	{
		value: 'America/Argentina/Cordoba',
		label: __('America/Argentina/Cordoba', 'ta-vchat'),
	},
	{
		value: 'America/Argentina/Jujuy',
		label: __('America/Argentina/Jujuy', 'ta-vchat'),
	},
	{
		value: 'America/Argentina/La_Rioja',
		label: __('America/Argentina/La_Rioja', 'ta-vchat'),
	},
	{
		value: 'America/Argentina/Mendoza',
		label: __('America/Argentina/Mendoza', 'ta-vchat'),
	},
	{
		value: 'America/Argentina/Rio_Gallegos',
		label: __('America/Argentina/Rio_Gallegos', 'ta-vchat'),
	},
	{
		value: 'America/Argentina/Salta',
		label: __('America/Argentina/Salta', 'ta-vchat'),
	},
	{
		value: 'America/Argentina/San_Juan',
		label: __('America/Argentina/San_Juan', 'ta-vchat'),
	},
	{
		value: 'America/Argentina/San_Luis',
		label: __('America/Argentina/San_Luis', 'ta-vchat'),
	},
	{
		value: 'America/Argentina/Tucuman',
		label: __('America/Argentina/Tucuman', 'ta-vchat'),
	},
	{
		value: 'America/Argentina/Ushuaia',
		label: __('America/Argentina/Ushuaia', 'ta-vchat'),
	},
	{
		value: 'America/Aruba',
		label: __('America/Aruba', 'ta-vchat'),
	},
	{
		value: 'America/Asuncion',
		label: __('America/Asuncion', 'ta-vchat'),
	},
	{
		value: 'America/Atikokan',
		label: __('America/Atikokan', 'ta-vchat'),
	},
	{
		value: 'America/Atka',
		label: __('America/Atka', 'ta-vchat'),
	},
	{
		value: 'America/Bahia',
		label: __('America/Bahia', 'ta-vchat'),
	},
	{
		value: 'America/Bahia_Banderas',
		label: __('America/Bahia_Banderas', 'ta-vchat'),
	},
	{
		value: 'America/Barbados',
		label: __('America/Barbados', 'ta-vchat'),
	},
	{
		value: 'America/Belem',
		label: __('America/Belem', 'ta-vchat'),
	},
	{
		value: 'America/Belize',
		label: __('America/Belize', 'ta-vchat'),
	},
	{
		value: 'America/Blanc-Sablon',
		label: __('America/Blanc-Sablon', 'ta-vchat'),
	},
	{
		value: 'America/Boa_Vista',
		label: __('America/Boa_Vista', 'ta-vchat'),
	},
	{
		value: 'America/Bogota',
		label: __('America/Bogota', 'ta-vchat'),
	},
	{
		value: 'America/Boise',
		label: __('America/Boise', 'ta-vchat'),
	},
	{
		value: 'America/Buenos_Aires',
		label: __('America/Buenos_Aires', 'ta-vchat'),
	},
	{
		value: 'America/Cambridge_Bay',
		label: __('America/Cambridge_Bay', 'ta-vchat'),
	},
	{
		value: 'America/Campo_Grande',
		label: __('America/Campo_Grande', 'ta-vchat'),
	},
	{
		value: 'America/Cancun',
		label: __('America/Cancun', 'ta-vchat'),
	},
	{
		value: 'America/Caracas',
		label: __('America/Caracas', 'ta-vchat'),
	},
	{
		value: 'America/Catamarca',
		label: __('America/Catamarca', 'ta-vchat'),
	},
	{
		value: 'America/Cayenne',
		label: __('America/Cayenne', 'ta-vchat'),
	},
	{
		value: 'America/Cayman',
		label: __('America/Cayman', 'ta-vchat'),
	},
	{
		value: 'America/Chicago',
		label: __('America/Chicago', 'ta-vchat'),
	},
	{
		value: 'America/Chihuahua',
		label: __('America/Chihuahua', 'ta-vchat'),
	},
	{
		value: 'America/Coral_Harbour',
		label: __('America/Coral_Harbour', 'ta-vchat'),
	},
	{
		value: 'America/Cordoba',
		label: __('America/Cordoba', 'ta-vchat'),
	},
	{
		value: 'America/Costa_Rica',
		label: __('America/Costa_Rica', 'ta-vchat'),
	},
	{
		value: 'America/Creston',
		label: __('America/Creston', 'ta-vchat'),
	},
	{
		value: 'America/Cuiaba',
		label: __('America/Cuiaba', 'ta-vchat'),
	},
	{
		value: 'America/Curacao',
		label: __('America/Curacao', 'ta-vchat'),
	},
	{
		value: 'America/Danmarkshavn',
		label: __('America/Danmarkshavn', 'ta-vchat'),
	},
	{
		value: 'America/Dawson',
		label: __('America/Dawson', 'ta-vchat'),
	},
	{
		value: 'America/Dawson_Creek',
		label: __('America/Dawson_Creek', 'ta-vchat'),
	},
	{
		value: 'America/Denver',
		label: __('America/Denver', 'ta-vchat'),
	},
	{
		value: 'America/Detroit',
		label: __('America/Detroit', 'ta-vchat'),
	},
	{
		value: 'America/Dominica',
		label: __('America/Dominica', 'ta-vchat'),
	},
	{
		value: 'America/Edmonton',
		label: __('America/Edmonton', 'ta-vchat'),
	},
	{
		value: 'America/Eirunepe',
		label: __('America/Eirunepe', 'ta-vchat'),
	},
	{
		value: 'America/El_Salvador',
		label: __('America/El_Salvador', 'ta-vchat'),
	},
	{
		value: 'America/Ensenada',
		label: __('America/Ensenada', 'ta-vchat'),
	},
	{
		value: 'America/Fort_Nelson',
		label: __('America/Fort_Nelson', 'ta-vchat'),
	},
	{
		value: 'America/Fort_Wayne',
		label: __('America/Fort_Wayne', 'ta-vchat'),
	},
	{
		value: 'America/Fortaleza',
		label: __('America/Fortaleza', 'ta-vchat'),
	},
	{
		value: 'America/Glace_Bay',
		label: __('America/Glace_Bay', 'ta-vchat'),
	},
	{
		value: 'America/Godthab',
		label: __('America/Godthab', 'ta-vchat'),
	},
	{
		value: 'America/Goose_Bay',
		label: __('America/Goose_Bay', 'ta-vchat'),
	},
	{
		value: 'America/Grand_Turk',
		label: __('America/Grand_Turk', 'ta-vchat'),
	},
	{
		value: 'America/Grenada',
		label: __('America/Grenada', 'ta-vchat'),
	},
	{
		value: 'America/Guadeloupe',
		label: __('America/Guadeloupe', 'ta-vchat'),
	},
	{
		value: 'America/Guatemala',
		label: __('America/Guatemala', 'ta-vchat'),
	},
	{
		value: 'America/Guayaquil',
		label: __('America/Guayaquil', 'ta-vchat'),
	},
	{
		value: 'America/Guyana',
		label: __('America/Guyana', 'ta-vchat'),
	},
	{
		value: 'America/Halifax',
		label: __('America/Halifax', 'ta-vchat'),
	},
	{
		value: 'America/Havana',
		label: __('America/Havana', 'ta-vchat'),
	},
	{
		value: 'America/Hermosillo',
		label: __('America/Hermosillo', 'ta-vchat'),
	},
	{
		value: 'America/Indiana/Indianapolis',
		label: __('America/Indiana/Indianapolis', 'ta-vchat'),
	},
	{
		value: 'America/Indiana/Knox',
		label: __('America/Indiana/Knox', 'ta-vchat'),
	},
	{
		value: 'America/Indiana/Marengo',
		label: __('America/Indiana/Marengo', 'ta-vchat'),
	},
	{
		value: 'America/Indiana/Petersburg',
		label: __('America/Indiana/Petersburg', 'ta-vchat'),
	},
	{
		value: 'America/Indiana/Tell_City',
		label: __('America/Indiana/Tell_City', 'ta-vchat'),
	},
	{
		value: 'America/Indiana/Vevay',
		label: __('America/Indiana/Vevay', 'ta-vchat'),
	},
	{
		value: 'America/Indiana/Vincennes',
		label: __('America/Indiana/Vincennes', 'ta-vchat'),
	},
	{
		value: 'America/Indiana/Winamac',
		label: __('America/Indiana/Winamac', 'ta-vchat'),
	},
	{
		value: 'America/Indianapolis',
		label: __('America/Indianapolis', 'ta-vchat'),
	},
	{
		value: 'America/Inuvik',
		label: __('America/Inuvik', 'ta-vchat'),
	},
	{
		value: 'America/Iqaluit',
		label: __('America/Iqaluit', 'ta-vchat'),
	},
	{
		value: 'America/Jamaica',
		label: __('America/Jamaica', 'ta-vchat'),
	},
	{
		value: 'America/Jujuy',
		label: __('America/Jujuy', 'ta-vchat'),
	},
	{
		value: 'America/Juneau',
		label: __('America/Juneau', 'ta-vchat'),
	},
	{
		value: 'America/Kentucky/Louisville',
		label: __('America/Kentucky/Louisville', 'ta-vchat'),
	},
	{
		value: 'America/Kentucky/Monticello',
		label: __('America/Kentucky/Monticello', 'ta-vchat'),
	},
	{
		value: 'America/Knox_IN',
		label: __('America/Knox_IN', 'ta-vchat'),
	},
	{
		value: 'America/Kralendijk',
		label: __('America/Kralendijk', 'ta-vchat'),
	},
	{
		value: 'America/La_Paz',
		label: __('America/La_Paz', 'ta-vchat'),
	},
	{
		value: 'America/Lima',
		label: __('America/Lima', 'ta-vchat'),
	},
	{
		value: 'America/Los_Angeles',
		label: __('America/Los_Angeles', 'ta-vchat'),
	},
	{
		value: 'America/Louisville',
		label: __('America/Louisville', 'ta-vchat'),
	},
	{
		value: 'America/Lower_Princes',
		label: __('America/Lower_Princes', 'ta-vchat'),
	},
	{
		value: 'America/Maceio',
		label: __('America/Maceio', 'ta-vchat'),
	},
	{
		value: 'America/Managua',
		label: __('America/Managua', 'ta-vchat'),
	},
	{
		value: 'America/Manaus',
		label: __('America/Manaus', 'ta-vchat'),
	},
	{
		value: 'America/Marigot',
		label: __('America/Marigot', 'ta-vchat'),
	},
	{
		value: 'America/Martinique',
		label: __('America/Martinique', 'ta-vchat'),
	},
	{
		value: 'America/Matamoros',
		label: __('America/Matamoros', 'ta-vchat'),
	},
	{
		value: 'America/Mazatlan',
		label: __('America/Mazatlan', 'ta-vchat'),
	},
	{
		value: 'America/Mendoza',
		label: __('America/Mendoza', 'ta-vchat'),
	},
	{
		value: 'America/Menominee',
		label: __('America/Menominee', 'ta-vchat'),
	},
	{
		value: 'America/Merida',
		label: __('America/Merida', 'ta-vchat'),
	},
	{
		value: 'America/Metlakatla',
		label: __('America/Metlakatla', 'ta-vchat'),
	},
	{
		value: 'America/Mexico_City',
		label: __('America/Mexico_City', 'ta-vchat'),
	},
	{
		value: 'America/Miquelon',
		label: __('America/Miquelon', 'ta-vchat'),
	},
	{
		value: 'America/Moncton',
		label: __('America/Moncton', 'ta-vchat'),
	},
	{
		value: 'America/Monterrey',
		label: __('America/Monterrey', 'ta-vchat'),
	},
	{
		value: 'America/Montevideo',
		label: __('America/Montevideo', 'ta-vchat'),
	},
	{
		value: 'America/Montreal',
		label: __('America/Montreal', 'ta-vchat'),
	},
	{
		value: 'America/Montserrat',
		label: __('America/Montserrat', 'ta-vchat'),
	},
	{
		value: 'America/Nassau',
		label: __('America/Nassau', 'ta-vchat'),
	},
	{
		value: 'America/New_York',
		label: __('America/New_York', 'ta-vchat'),
	},
	{
		value: 'America/Nipigon',
		label: __('America/Nipigon', 'ta-vchat'),
	},
	{
		value: 'America/Nome',
		label: __('America/Nome', 'ta-vchat'),
	},
	{
		value: 'America/Noronha',
		label: __('America/Noronha', 'ta-vchat'),
	},
	{
		value: 'America/North_Dakota/Beulah',
		label: __('America/North_Dakota/Beulah', 'ta-vchat'),
	},
	{
		value: 'America/North_Dakota/Center',
		label: __('America/North_Dakota/Center', 'ta-vchat'),
	},
	{
		value: 'America/North_Dakota/New_Salem',
		label: __('America/North_Dakota/New_Salem', 'ta-vchat'),
	},
	{
		value: 'America/Ojinaga',
		label: __('America/Ojinaga', 'ta-vchat'),
	},
	{
		value: 'America/Panama',
		label: __('America/Panama', 'ta-vchat'),
	},
	{
		value: 'America/Pangnirtung',
		label: __('America/Pangnirtung', 'ta-vchat'),
	},
	{
		value: 'America/Paramaribo',
		label: __('America/Paramaribo', 'ta-vchat'),
	},
	{
		value: 'America/Phoenix',
		label: __('America/Phoenix', 'ta-vchat'),
	},
	{
		value: 'America/Port-au-Prince',
		label: __('America/Port-au-Prince', 'ta-vchat'),
	},
	{
		value: 'America/Port_of_Spain',
		label: __('America/Port_of_Spain', 'ta-vchat'),
	},
	{
		value: 'America/Porto_Acre',
		label: __('America/Porto_Acre', 'ta-vchat'),
	},
	{
		value: 'America/Porto_Velho',
		label: __('America/Porto_Velho', 'ta-vchat'),
	},
	{
		value: 'America/Puerto_Rico',
		label: __('America/Puerto_Rico', 'ta-vchat'),
	},
	{
		value: 'America/Punta_Arenas',
		label: __('America/Punta_Arenas', 'ta-vchat'),
	},
	{
		value: 'America/Rainy_River',
		label: __('America/Rainy_River', 'ta-vchat'),
	},
	{
		value: 'America/Rankin_Inlet',
		label: __('America/Rankin_Inlet', 'ta-vchat'),
	},
	{
		value: 'America/Recife',
		label: __('America/Recife', 'ta-vchat'),
	},
	{
		value: 'America/Regina',
		label: __('America/Regina', 'ta-vchat'),
	},
	{
		value: 'America/Resolute',
		label: __('America/Resolute', 'ta-vchat'),
	},
	{
		value: 'America/Rio_Branco',
		label: __('America/Rio_Branco', 'ta-vchat'),
	},
	{
		value: 'America/Rosario',
		label: __('America/Rosario', 'ta-vchat'),
	},
	{
		value: 'America/Santa_Isabel',
		label: __('America/Santa_Isabel', 'ta-vchat'),
	},
	{
		value: 'America/Santarem',
		label: __('America/Santarem', 'ta-vchat'),
	},
	{
		value: 'America/Santiago',
		label: __('America/Santiago', 'ta-vchat'),
	},
	{
		value: 'America/Santo_Domingo',
		label: __('America/Santo_Domingo', 'ta-vchat'),
	},
	{
		value: 'America/Sao_Paulo',
		label: __('America/Sao_Paulo', 'ta-vchat'),
	},
	{
		value: 'America/Scoresbysund',
		label: __('America/Scoresbysund', 'ta-vchat'),
	},
	{
		value: 'America/Shiprock',
		label: __('America/Shiprock', 'ta-vchat'),
	},
	{
		value: 'America/Sitka',
		label: __('America/Sitka', 'ta-vchat'),
	},
	{
		value: 'America/St_Barthelemy',
		label: __('America/St_Barthelemy', 'ta-vchat'),
	},
	{
		value: 'America/St_Johns',
		label: __('America/St_Johns', 'ta-vchat'),
	},
	{
		value: 'America/St_Kitts',
		label: __('America/St_Kitts', 'ta-vchat'),
	},
	{
		value: 'America/St_Lucia',
		label: __('America/St_Lucia', 'ta-vchat'),
	},
	{
		value: 'America/St_Thomas',
		label: __('America/St_Thomas', 'ta-vchat'),
	},
	{
		value: 'America/St_Vincent',
		label: __('America/St_Vincent', 'ta-vchat'),
	},
	{
		value: 'America/Swift_Current',
		label: __('America/Swift_Current', 'ta-vchat'),
	},
	{
		value: 'America/Tegucigalpa',
		label: __('America/Tegucigalpa', 'ta-vchat'),
	},
	{
		value: 'America/Thule',
		label: __('America/Thule', 'ta-vchat'),
	},
	{
		value: 'America/Thunder_Bay',
		label: __('America/Thunder_Bay', 'ta-vchat'),
	},
	{
		value: 'America/Tijuana',
		label: __('America/Tijuana', 'ta-vchat'),
	},
	{
		value: 'America/Toronto',
		label: __('America/Toronto', 'ta-vchat'),
	},
	{
		value: 'America/Tortola',
		label: __('America/Tortola', 'ta-vchat'),
	},
	{
		value: 'America/Vancouver',
		label: __('America/Vancouver', 'ta-vchat'),
	},
	{
		value: 'America/Virgin',
		label: __('America/Virgin', 'ta-vchat'),
	},
	{
		value: 'America/Whitehorse',
		label: __('America/Whitehorse', 'ta-vchat'),
	},
	{
		value: 'America/Winnipeg',
		label: __('America/Winnipeg', 'ta-vchat'),
	},
	{
		value: 'America/Yakutat',
		label: __('America/Yakutat', 'ta-vchat'),
	},
	{
		value: 'America/Yellowknife',
		label: __('America/Yellowknife', 'ta-vchat'),
	},
	{
		value: 'Antarctica/Casey',
		label: __('Antarctica/Casey', 'ta-vchat'),
	},
	{
		value: 'Antarctica/Davis',
		label: __('Antarctica/Davis', 'ta-vchat'),
	},
	{
		value: 'Antarctica/DumontDUrville',
		label: __('Antarctica/DumontDUrville', 'ta-vchat'),
	},
	{
		value: 'Antarctica/Macquarie',
		label: __('Antarctica/Macquarie', 'ta-vchat'),
	},
	{
		value: 'Antarctica/Mawson',
		label: __('Antarctica/Mawson', 'ta-vchat'),
	},
	{
		value: 'Antarctica/McMurdo',
		label: __('Antarctica/McMurdo', 'ta-vchat'),
	},
	{
		value: 'Antarctica/Palmer',
		label: __('Antarctica/Palmer', 'ta-vchat'),
	},
	{
		value: 'Antarctica/Rothera',
		label: __('Antarctica/Rothera', 'ta-vchat'),
	},
	{
		value: 'Antarctica/South_Pole',
		label: __('Antarctica/South_Pole', 'ta-vchat'),
	},
	{
		value: 'Antarctica/Syowa',
		label: __('Antarctica/Syowa', 'ta-vchat'),
	},
	{
		value: 'Antarctica/Troll',
		label: __('Antarctica/Troll', 'ta-vchat'),
	},
	{
		value: 'Antarctica/Vostok',
		label: __('Antarctica/Vostok', 'ta-vchat'),
	},
	{
		value: 'Arctic/Longyearbyen',
		label: __('Arctic/Longyearbyen', 'ta-vchat'),
	},
	{
		value: 'Asia/Aden',
		label: __('Asia/Aden', 'ta-vchat'),
	},
	{
		value: 'Asia/Almaty',
		label: __('Asia/Almaty', 'ta-vchat'),
	},
	{
		value: 'Asia/Amman',
		label: __('Asia/Amman', 'ta-vchat'),
	},
	{
		value: 'Asia/Anadyr',
		label: __('Asia/Anadyr', 'ta-vchat'),
	},
	{
		value: 'Asia/Aqtau',
		label: __('Asia/Aqtau', 'ta-vchat'),
	},
	{
		value: 'Asia/Aqtobe',
		label: __('Asia/Aqtobe', 'ta-vchat'),
	},
	{
		value: 'Asia/Ashgabat',
		label: __('Asia/Ashgabat', 'ta-vchat'),
	},
	{
		value: 'Asia/Ashkhabad',
		label: __('Asia/Ashkhabad', 'ta-vchat'),
	},
	{
		value: 'Asia/Atyrau',
		label: __('Asia/Atyrau', 'ta-vchat'),
	},
	{
		value: 'Asia/Baghdad',
		label: __('Asia/Baghdad', 'ta-vchat'),
	},
	{
		value: 'Asia/Bahrain',
		label: __('Asia/Bahrain', 'ta-vchat'),
	},
	{
		value: 'Asia/Baku',
		label: __('Asia/Baku', 'ta-vchat'),
	},
	{
		value: 'Asia/Bangkok',
		label: __('Asia/Bangkok', 'ta-vchat'),
	},
	{
		value: 'Asia/Barnaul',
		label: __('Asia/Barnaul', 'ta-vchat'),
	},
	{
		value: 'Asia/Beirut',
		label: __('Asia/Beirut', 'ta-vchat'),
	},
	{
		value: 'Asia/Bishkek',
		label: __('Asia/Bishkek', 'ta-vchat'),
	},
	{
		value: 'Asia/Brunei',
		label: __('Asia/Brunei', 'ta-vchat'),
	},
	{
		value: 'Asia/Calcutta',
		label: __('Asia/Calcutta', 'ta-vchat'),
	},
	{
		value: 'Asia/Chita',
		label: __('Asia/Chita', 'ta-vchat'),
	},
	{
		value: 'Asia/Choibalsan',
		label: __('Asia/Choibalsan', 'ta-vchat'),
	},
	{
		value: 'Asia/Chongqing',
		label: __('Asia/Chongqing', 'ta-vchat'),
	},
	{
		value: 'Asia/Chungking',
		label: __('Asia/Chungking', 'ta-vchat'),
	},
	{
		value: 'Asia/Colombo',
		label: __('Asia/Colombo', 'ta-vchat'),
	},
	{
		value: 'Asia/Dacca',
		label: __('Asia/Dacca', 'ta-vchat'),
	},
	{
		value: 'Asia/Damascus',
		label: __('Asia/Damascus', 'ta-vchat'),
	},
	{
		value: 'Asia/Dhaka',
		label: __('Asia/Dhaka', 'ta-vchat'),
	},
	{
		value: 'Asia/Dili',
		label: __('Asia/Dili', 'ta-vchat'),
	},
	{
		value: 'Asia/Dubai',
		label: __('Asia/Dubai', 'ta-vchat'),
	},
	{
		value: 'Asia/Dushanbe',
		label: __('Asia/Dushanbe', 'ta-vchat'),
	},
	{
		value: 'Asia/Famagusta',
		label: __('Asia/Famagusta', 'ta-vchat'),
	},
	{
		value: 'Asia/Gaza',
		label: __('Asia/Gaza', 'ta-vchat'),
	},
	{
		value: 'Asia/Harbin',
		label: __('Asia/Harbin', 'ta-vchat'),
	},
	{
		value: 'Asia/Hebron',
		label: __('Asia/Hebron', 'ta-vchat'),
	},
	{
		value: 'Asia/Ho_Chi_Minh',
		label: __('Asia/Ho_Chi_Minh', 'ta-vchat'),
	},
	{
		value: 'Asia/Hong_Kong',
		label: __('Asia/Hong_Kong', 'ta-vchat'),
	},
	{
		value: 'Asia/Hovd',
		label: __('Asia/Hovd', 'ta-vchat'),
	},
	{
		value: 'Asia/Irkutsk',
		label: __('Asia/Irkutsk', 'ta-vchat'),
	},
	{
		value: 'Asia/Istanbul',
		label: __('Asia/Istanbul', 'ta-vchat'),
	},
	{
		value: 'Asia/Jakarta',
		label: __('Asia/Jakarta', 'ta-vchat'),
	},
	{
		value: 'Asia/Jayapura',
		label: __('Asia/Jayapura', 'ta-vchat'),
	},
	{
		value: 'Asia/Jerusalem',
		label: __('Asia/Jerusalem', 'ta-vchat'),
	},
	{
		value: 'Asia/Kabul',
		label: __('Asia/Kabul', 'ta-vchat'),
	},
	{
		value: 'Asia/Kamchatka',
		label: __('Asia/Kamchatka', 'ta-vchat'),
	},
	{
		value: 'Asia/Karachi',
		label: __('Asia/Karachi', 'ta-vchat'),
	},
	{
		value: 'Asia/Kashgar',
		label: __('Asia/Kashgar', 'ta-vchat'),
	},
	{
		value: 'Asia/Kathmandu',
		label: __('Asia/Kathmandu', 'ta-vchat'),
	},
	{
		value: 'Asia/Katmandu',
		label: __('Asia/Katmandu', 'ta-vchat'),
	},
	{
		value: 'Asia/Khandyga',
		label: __('Asia/Khandyga', 'ta-vchat'),
	},
	{
		value: 'Asia/Kolkata',
		label: __('Asia/Kolkata', 'ta-vchat'),
	},
	{
		value: 'Asia/Krasnoyarsk',
		label: __('Asia/Krasnoyarsk', 'ta-vchat'),
	},
	{
		value: 'Asia/Kuala_Lumpur',
		label: __('Asia/Kuala_Lumpur', 'ta-vchat'),
	},
	{
		value: 'Asia/Kuching',
		label: __('Asia/Kuching', 'ta-vchat'),
	},
	{
		value: 'Asia/Kuwait',
		label: __('Asia/Kuwait', 'ta-vchat'),
	},
	{
		value: 'Asia/Macao',
		label: __('Asia/Macao', 'ta-vchat'),
	},
	{
		value: 'Asia/Macau',
		label: __('Asia/Macau', 'ta-vchat'),
	},
	{
		value: 'Asia/Magadan',
		label: __('Asia/Magadan', 'ta-vchat'),
	},
	{
		value: 'Asia/Makassar',
		label: __('Asia/Makassar', 'ta-vchat'),
	},
	{
		value: 'Asia/Manila',
		label: __('Asia/Manila', 'ta-vchat'),
	},
	{
		value: 'Asia/Muscat',
		label: __('Asia/Muscat', 'ta-vchat'),
	},
	{
		value: 'Asia/Nicosia',
		label: __('Asia/Nicosia', 'ta-vchat'),
	},
	{
		value: 'Asia/Novokuznetsk',
		label: __('Asia/Novokuznetsk', 'ta-vchat'),
	},
	{
		value: 'Asia/Novosibirsk',
		label: __('Asia/Novosibirsk', 'ta-vchat'),
	},
	{
		value: 'Asia/Omsk',
		label: __('Asia/Omsk', 'ta-vchat'),
	},
	{
		value: 'Asia/Oral',
		label: __('Asia/Oral', 'ta-vchat'),
	},
	{
		value: 'Asia/Phnom_Penh',
		label: __('Asia/Phnom_Penh', 'ta-vchat'),
	},
	{
		value: 'Asia/Pontianak',
		label: __('Asia/Pontianak', 'ta-vchat'),
	},
	{
		value: 'Asia/Pyongyang',
		label: __('Asia/Pyongyang', 'ta-vchat'),
	},
	{
		value: 'Asia/Qatar',
		label: __('Asia/Qatar', 'ta-vchat'),
	},
	{
		value: 'Asia/Qyzylorda',
		label: __('Asia/Qyzylorda', 'ta-vchat'),
	},
	{
		value: 'Asia/Rangoon',
		label: __('Asia/Rangoon', 'ta-vchat'),
	},
	{
		value: 'Asia/Riyadh',
		label: __('Asia/Riyadh', 'ta-vchat'),
	},
	{
		value: 'Asia/Saigon',
		label: __('Asia/Saigon', 'ta-vchat'),
	},
	{
		value: 'Asia/Sakhalin',
		label: __('Asia/Sakhalin', 'ta-vchat'),
	},
	{
		value: 'Asia/Samarkand',
		label: __('Asia/Samarkand', 'ta-vchat'),
	},
	{
		value: 'Asia/Seoul',
		label: __('Asia/Seoul', 'ta-vchat'),
	},
	{
		value: 'Asia/Shanghai',
		label: __('Asia/Shanghai', 'ta-vchat'),
	},
	{
		value: 'Asia/Singapore',
		label: __('Asia/Singapore', 'ta-vchat'),
	},
	{
		value: 'Asia/Srednekolymsk',
		label: __('Asia/Srednekolymsk', 'ta-vchat'),
	},
	{
		value: 'Asia/Taipei',
		label: __('Asia/Taipei', 'ta-vchat'),
	},
	{
		value: 'Asia/Tashkent',
		label: __('Asia/Tashkent', 'ta-vchat'),
	},
	{
		value: 'Asia/Tbilisi',
		label: __('Asia/Tbilisi', 'ta-vchat'),
	},
	{
		value: 'Asia/Tehran',
		label: __('Asia/Tehran', 'ta-vchat'),
	},
	{
		value: 'Asia/Tel_Aviv',
		label: __('Asia/Tel_Aviv', 'ta-vchat'),
	},
	{
		value: 'Asia/Thimbu',
		label: __('Asia/Thimbu', 'ta-vchat'),
	},
	{
		value: 'Asia/Thimphu',
		label: __('Asia/Thimphu', 'ta-vchat'),
	},
	{
		value: 'Asia/Tokyo',
		label: __('Asia/Tokyo', 'ta-vchat'),
	},
	{
		value: 'Asia/Tomsk',
		label: __('Asia/Tomsk', 'ta-vchat'),
	},
	{
		value: 'Asia/Ujung_Pandang',
		label: __('Asia/Ujung_Pandang', 'ta-vchat'),
	},
	{
		value: 'Asia/Ulaanbaatar',
		label: __('Asia/Ulaanbaatar', 'ta-vchat'),
	},
	{
		value: 'Asia/Ulan_Bator',
		label: __('Asia/Ulan_Bator', 'ta-vchat'),
	},
	{
		value: 'Asia/Urumqi',
		label: __('Asia/Urumqi', 'ta-vchat'),
	},
	{
		value: 'Asia/Ust-Nera',
		label: __('Asia/Ust-Nera', 'ta-vchat'),
	},
	{
		value: 'Asia/Vientiane',
		label: __('Asia/Vientiane', 'ta-vchat'),
	},
	{
		value: 'Asia/Vladivostok',
		label: __('Asia/Vladivostok', 'ta-vchat'),
	},
	{
		value: 'Asia/Yakutsk',
		label: __('Asia/Yakutsk', 'ta-vchat'),
	},
	{
		value: 'Asia/Yangon',
		label: __('Asia/Yangon', 'ta-vchat'),
	},
	{
		value: 'Asia/Yekaterinburg',
		label: __('Asia/Yekaterinburg', 'ta-vchat'),
	},
	{
		value: 'Asia/Yerevan',
		label: __('Asia/Yerevan', 'ta-vchat'),
	},
	{
		value: 'Atlantic/Azores',
		label: __('Atlantic/Azores', 'ta-vchat'),
	},
	{
		value: 'Atlantic/Bermuda',
		label: __('Atlantic/Bermuda', 'ta-vchat'),
	},
	{
		value: 'Atlantic/Canary',
		label: __('Atlantic/Canary', 'ta-vchat'),
	},
	{
		value: 'Atlantic/Cape_Verde',
		label: __('Atlantic/Cape_Verde', 'ta-vchat'),
	},
	{
		value: 'Atlantic/Faeroe',
		label: __('Atlantic/Faeroe', 'ta-vchat'),
	},
	{
		value: 'Atlantic/Faroe',
		label: __('Atlantic/Faroe', 'ta-vchat'),
	},
	{
		value: 'Atlantic/Jan_Mayen',
		label: __('Atlantic/Jan_Mayen', 'ta-vchat'),
	},
	{
		value: 'Atlantic/Madeira',
		label: __('Atlantic/Madeira', 'ta-vchat'),
	},
	{
		value: 'Atlantic/Reykjavik',
		label: __('Atlantic/Reykjavik', 'ta-vchat'),
	},
	{
		value: 'Atlantic/South_Georgia',
		label: __('Atlantic/South_Georgia', 'ta-vchat'),
	},
	{
		value: 'Atlantic/St_Helena',
		label: __('Atlantic/St_Helena', 'ta-vchat'),
	},
	{
		value: 'Atlantic/Stanley',
		label: __('Atlantic/Stanley', 'ta-vchat'),
	},
	{
		value: 'Australia/ACT',
		label: __('Australia/ACT', 'ta-vchat'),
	},
	{
		value: 'Australia/Adelaide',
		label: __('Australia/Adelaide', 'ta-vchat'),
	},
	{
		value: 'Australia/Brisbane',
		label: __('Australia/Brisbane', 'ta-vchat'),
	},
	{
		value: 'Australia/Broken_Hill',
		label: __('Australia/Broken_Hill', 'ta-vchat'),
	},
	{
		value: 'Australia/Canberra',
		label: __('Australia/Canberra', 'ta-vchat'),
	},
	{
		value: 'Australia/Currie',
		label: __('Australia/Currie', 'ta-vchat'),
	},
	{
		value: 'Australia/Darwin',
		label: __('Australia/Darwin', 'ta-vchat'),
	},
	{
		value: 'Australia/Eucla',
		label: __('Australia/Eucla', 'ta-vchat'),
	},
	{
		value: 'Australia/Hobart',
		label: __('Australia/Hobart', 'ta-vchat'),
	},
	{
		value: 'Australia/LHI',
		label: __('Australia/LHI', 'ta-vchat'),
	},
	{
		value: 'Australia/Lindeman',
		label: __('Australia/Lindeman', 'ta-vchat'),
	},
	{
		value: 'Australia/Lord_Howe',
		label: __('Australia/Lord_Howe', 'ta-vchat'),
	},
	{
		value: 'Australia/Melbourne',
		label: __('Australia/Melbourne', 'ta-vchat'),
	},
	{
		value: 'Australia/NSW',
		label: __('Australia/NSW', 'ta-vchat'),
	},
	{
		value: 'Australia/North',
		label: __('Australia/North', 'ta-vchat'),
	},
	{
		value: 'Australia/Perth',
		label: __('Australia/Perth', 'ta-vchat'),
	},
	{
		value: 'Australia/Queensland',
		label: __('Australia/Queensland', 'ta-vchat'),
	},
	{
		value: 'Australia/South',
		label: __('Australia/South', 'ta-vchat'),
	},
	{
		value: 'Australia/Sydney',
		label: __('Australia/Sydney', 'ta-vchat'),
	},
	{
		value: 'Australia/Tasmania',
		label: __('Australia/Tasmania', 'ta-vchat'),
	},
	{
		value: 'Australia/Victoria',
		label: __('Australia/Victoria', 'ta-vchat'),
	},
	{
		value: 'Australia/West',
		label: __('Australia/West', 'ta-vchat'),
	},
	{
		value: 'Australia/Yancowinna',
		label: __('Australia/Yancowinna', 'ta-vchat'),
	},
	{
		value: 'Brazil/Acre',
		label: __('Brazil/Acre', 'ta-vchat'),
	},
	{
		value: 'Brazil/DeNoronha',
		label: __('Brazil/DeNoronha', 'ta-vchat'),
	},
	{
		value: 'Brazil/East',
		label: __('Brazil/East', 'ta-vchat'),
	},
	{
		value: 'Brazil/West',
		label: __('Brazil/West', 'ta-vchat'),
	},
	{
		value: 'CET',
		label: __('CET', 'ta-vchat'),
	},
	{
		value: 'CST6CDT',
		label: __('CST6CDT', 'ta-vchat'),
	},
	{
		value: 'Canada/Atlantic',
		label: __('Canada/Atlantic', 'ta-vchat'),
	},
	{
		value: 'Canada/Central',
		label: __('Canada/Central', 'ta-vchat'),
	},
	{
		value: 'Canada/Eastern',
		label: __('Canada/Eastern', 'ta-vchat'),
	},
	{
		value: 'Canada/Mountain',
		label: __('Canada/Mountain', 'ta-vchat'),
	},
	{
		value: 'Canada/Newfoundland',
		label: __('Canada/Newfoundland', 'ta-vchat'),
	},
	{
		value: 'Canada/Pacific',
		label: __('Canada/Pacific', 'ta-vchat'),
	},
	{
		value: 'Canada/Saskatchewan',
		label: __('Canada/Saskatchewan', 'ta-vchat'),
	},
	{
		value: 'Canada/Yukon',
		label: __('Canada/Yukon', 'ta-vchat'),
	},
	{
		value: 'Chile/Continental',
		label: __('Chile/Continental', 'ta-vchat'),
	},
	{
		value: 'Chile/EasterIsland',
		label: __('Chile/EasterIsland', 'ta-vchat'),
	},
	{
		value: 'Cuba',
		label: __('Cuba', 'ta-vchat'),
	},
	{
		value: 'EET',
		label: __('EET', 'ta-vchat'),
	},
	{
		value: 'EST',
		label: __('EST', 'ta-vchat'),
	},
	{
		value: 'EST5EDT',
		label: __('EST5EDT', 'ta-vchat'),
	},
	{
		value: 'Egypt',
		label: __('Egypt', 'ta-vchat'),
	},
	{
		value: 'Eire',
		label: __('Eire', 'ta-vchat'),
	},
	{
		value: 'Etc/GMT',
		label: __('Etc/GMT', 'ta-vchat'),
	},
	{
		value: 'Etc/GMT+0',
		label: __('Etc/GMT+0', 'ta-vchat'),
	},
	{
		value: 'Etc/GMT+1',
		label: __('Etc/GMT+1', 'ta-vchat'),
	},
	{
		value: 'Etc/GMT+10',
		label: __('Etc/GMT+10', 'ta-vchat'),
	},
	{
		value: 'Etc/GMT+11',
		label: __('Etc/GMT+11', 'ta-vchat'),
	},
	{
		value: 'Etc/GMT+12',
		label: __('Etc/GMT+12', 'ta-vchat'),
	},
	{
		value: 'Etc/GMT+2',
		label: __('Etc/GMT+2', 'ta-vchat'),
	},
	{
		value: 'Etc/GMT+3',
		label: __('Etc/GMT+3', 'ta-vchat'),
	},
	{
		value: 'Etc/GMT+4',
		label: __('Etc/GMT+4', 'ta-vchat'),
	},
	{
		value: 'Etc/GMT+5',
		label: __('Etc/GMT+5', 'ta-vchat'),
	},
	{
		value: 'Etc/GMT+6',
		label: __('Etc/GMT+6', 'ta-vchat'),
	},
	{
		value: 'Etc/GMT+7',
		label: __('Etc/GMT+7', 'ta-vchat'),
	},
	{
		value: 'Etc/GMT+8',
		label: __('Etc/GMT+8', 'ta-vchat'),
	},
	{
		value: 'Etc/GMT+9',
		label: __('Etc/GMT+9', 'ta-vchat'),
	},
	{
		value: 'Etc/GMT-0',
		label: __('Etc/GMT-0', 'ta-vchat'),
	},
	{
		value: 'Etc/GMT-1',
		label: __('Etc/GMT-1', 'ta-vchat'),
	},
	{
		value: 'Etc/GMT-10',
		label: __('Etc/GMT-10', 'ta-vchat'),
	},
	{
		value: 'Etc/GMT-11',
		label: __('Etc/GMT-11', 'ta-vchat'),
	},
	{
		value: 'Etc/GMT-12',
		label: __('Etc/GMT-12', 'ta-vchat'),
	},
	{
		value: 'Etc/GMT-13',
		label: __('Etc/GMT-13', 'ta-vchat'),
	},
	{
		value: 'Etc/GMT-14',
		label: __('Etc/GMT-14', 'ta-vchat'),
	},
	{
		value: 'Etc/GMT-2',
		label: __('Etc/GMT-2', 'ta-vchat'),
	},
	{
		value: 'Etc/GMT-3',
		label: __('Etc/GMT-3', 'ta-vchat'),
	},
	{
		value: 'Etc/GMT-4',
		label: __('Etc/GMT-4', 'ta-vchat'),
	},
	{
		value: 'Etc/GMT-5',
		label: __('Etc/GMT-5', 'ta-vchat'),
	},
	{
		value: 'Etc/GMT-6',
		label: __('Etc/GMT-6', 'ta-vchat'),
	},
	{
		value: 'Etc/GMT-7',
		label: __('Etc/GMT-7', 'ta-vchat'),
	},
	{
		value: 'Etc/GMT-8',
		label: __('Etc/GMT-8', 'ta-vchat'),
	},
	{
		value: 'Etc/GMT-9',
		label: __('Etc/GMT-9', 'ta-vchat'),
	},
	{
		value: 'Etc/GMT0',
		label: __('Etc/GMT0', 'ta-vchat'),
	},
	{
		value: 'Etc/Greenwich',
		label: __('Etc/Greenwich', 'ta-vchat'),
	},
	{
		value: 'Etc/UCT',
		label: __('Etc/UCT', 'ta-vchat'),
	},
	{
		value: 'Etc/UTC',
		label: __('Etc/UTC', 'ta-vchat'),
	},
	{
		value: 'Etc/Universal',
		label: __('Etc/Universal', 'ta-vchat'),
	},
	{
		value: 'Etc/Zulu',
		label: __('Etc/Zulu', 'ta-vchat'),
	},
	{
		value: 'Europe/Amsterdam',
		label: __('Europe/Amsterdam', 'ta-vchat'),
	},
	{
		value: 'Europe/Andorra',
		label: __('Europe/Andorra', 'ta-vchat'),
	},
	{
		value: 'Europe/Astrakhan',
		label: __('Europe/Astrakhan', 'ta-vchat'),
	},
	{
		value: 'Europe/Athens',
		label: __('Europe/Athens', 'ta-vchat'),
	},
	{
		value: 'Europe/Belfast',
		label: __('Europe/Belfast', 'ta-vchat'),
	},
	{
		value: 'Europe/Belgrade',
		label: __('Europe/Belgrade', 'ta-vchat'),
	},
	{
		value: 'Europe/Berlin',
		label: __('Europe/Berlin', 'ta-vchat'),
	},
	{
		value: 'Europe/Bratislava',
		label: __('Europe/Bratislava', 'ta-vchat'),
	},
	{
		value: 'Europe/Brussels',
		label: __('Europe/Brussels', 'ta-vchat'),
	},
	{
		value: 'Europe/Bucharest',
		label: __('Europe/Bucharest', 'ta-vchat'),
	},
	{
		value: 'Europe/Budapest',
		label: __('Europe/Budapest', 'ta-vchat'),
	},
	{
		value: 'Europe/Busingen',
		label: __('Europe/Busingen', 'ta-vchat'),
	},
	{
		value: 'Europe/Chisinau',
		label: __('Europe/Chisinau', 'ta-vchat'),
	},
	{
		value: 'Europe/Copenhagen',
		label: __('Europe/Copenhagen', 'ta-vchat'),
	},
	{
		value: 'Europe/Dublin',
		label: __('Europe/Dublin', 'ta-vchat'),
	},
	{
		value: 'Europe/Gibraltar',
		label: __('Europe/Gibraltar', 'ta-vchat'),
	},
	{
		value: 'Europe/Guernsey',
		label: __('Europe/Guernsey', 'ta-vchat'),
	},
	{
		value: 'Europe/Helsinki',
		label: __('Europe/Helsinki', 'ta-vchat'),
	},
	{
		value: 'Europe/Isle_of_Man',
		label: __('Europe/Isle_of_Man', 'ta-vchat'),
	},
	{
		value: 'Europe/Istanbul',
		label: __('Europe/Istanbul', 'ta-vchat'),
	},
	{
		value: 'Europe/Jersey',
		label: __('Europe/Jersey', 'ta-vchat'),
	},
	{
		value: 'Europe/Kaliningrad',
		label: __('Europe/Kaliningrad', 'ta-vchat'),
	},
	{
		value: 'Europe/Kiev',
		label: __('Europe/Kiev', 'ta-vchat'),
	},
	{
		value: 'Europe/Kirov',
		label: __('Europe/Kirov', 'ta-vchat'),
	},
	{
		value: 'Europe/Lisbon',
		label: __('Europe/Lisbon', 'ta-vchat'),
	},
	{
		value: 'Europe/Ljubljana',
		label: __('Europe/Ljubljana', 'ta-vchat'),
	},
	{
		value: 'Europe/London',
		label: __('Europe/London', 'ta-vchat'),
	},
	{
		value: 'Europe/Luxembourg',
		label: __('Europe/Luxembourg', 'ta-vchat'),
	},
	{
		value: 'Europe/Madrid',
		label: __('Europe/Madrid', 'ta-vchat'),
	},
	{
		value: 'Europe/Malta',
		label: __('Europe/Malta', 'ta-vchat'),
	},
	{
		value: 'Europe/Mariehamn',
		label: __('Europe/Mariehamn', 'ta-vchat'),
	},
	{
		value: 'Europe/Minsk',
		label: __('Europe/Minsk', 'ta-vchat'),
	},
	{
		value: 'Europe/Monaco',
		label: __('Europe/Monaco', 'ta-vchat'),
	},
	{
		value: 'Europe/Moscow',
		label: __('Europe/Moscow', 'ta-vchat'),
	},
	{
		value: 'Europe/Nicosia',
		label: __('Europe/Nicosia', 'ta-vchat'),
	},
	{
		value: 'Europe/Oslo',
		label: __('Europe/Oslo', 'ta-vchat'),
	},
	{
		value: 'Europe/Paris',
		label: __('Europe/Paris', 'ta-vchat'),
	},
	{
		value: 'Europe/Podgorica',
		label: __('Europe/Podgorica', 'ta-vchat'),
	},
	{
		value: 'Europe/Prague',
		label: __('Europe/Prague', 'ta-vchat'),
	},
	{
		value: 'Europe/Riga',
		label: __('Europe/Riga', 'ta-vchat'),
	},
	{
		value: 'Europe/Rome',
		label: __('Europe/Rome', 'ta-vchat'),
	},
	{
		value: 'Europe/Samara',
		label: __('Europe/Samara', 'ta-vchat'),
	},
	{
		value: 'Europe/San_Marino',
		label: __('Europe/San_Marino', 'ta-vchat'),
	},
	{
		value: 'Europe/Sarajevo',
		label: __('Europe/Sarajevo', 'ta-vchat'),
	},
	{
		value: 'Europe/Saratov',
		label: __('Europe/Saratov', 'ta-vchat'),
	},
	{
		value: 'Europe/Simferopol',
		label: __('Europe/Simferopol', 'ta-vchat'),
	},
	{
		value: 'Europe/Skopje',
		label: __('Europe/Skopje', 'ta-vchat'),
	},
	{
		value: 'Europe/Sofia',
		label: __('Europe/Sofia', 'ta-vchat'),
	},
	{
		value: 'Europe/Stockholm',
		label: __('Europe/Stockholm', 'ta-vchat'),
	},
	{
		value: 'Europe/Tallinn',
		label: __('Europe/Tallinn', 'ta-vchat'),
	},
	{
		value: 'Europe/Tirane',
		label: __('Europe/Tirane', 'ta-vchat'),
	},
	{
		value: 'Europe/Tiraspol',
		label: __('Europe/Tiraspol', 'ta-vchat'),
	},
	{
		value: 'Europe/Ulyanovsk',
		label: __('Europe/Ulyanovsk', 'ta-vchat'),
	},
	{
		value: 'Europe/Uzhgorod',
		label: __('Europe/Uzhgorod', 'ta-vchat'),
	},
	{
		value: 'Europe/Vaduz',
		label: __('Europe/Vaduz', 'ta-vchat'),
	},
	{
		value: 'Europe/Vatican',
		label: __('Europe/Vatican', 'ta-vchat'),
	},
	{
		value: 'Europe/Vienna',
		label: __('Europe/Vienna', 'ta-vchat'),
	},
	{
		value: 'Europe/Vilnius',
		label: __('Europe/Vilnius', 'ta-vchat'),
	},
	{
		value: 'Europe/Volgograd',
		label: __('Europe/Volgograd', 'ta-vchat'),
	},
	{
		value: 'Europe/Warsaw',
		label: __('Europe/Warsaw', 'ta-vchat'),
	},
	{
		value: 'Europe/Zagreb',
		label: __('Europe/Zagreb', 'ta-vchat'),
	},
	{
		value: 'Europe/Zaporozhye',
		label: __('Europe/Zaporozhye', 'ta-vchat'),
	},
	{
		value: 'Europe/Zurich',
		label: __('Europe/Zurich', 'ta-vchat'),
	},
	{
		value: 'GB',
		label: __('GB', 'ta-vchat'),
	},
	{
		value: 'GB-Eire',
		label: __('GB-Eire', 'ta-vchat'),
	},
	{
		value: 'GMT',
		label: __('GMT', 'ta-vchat'),
	},
	{
		value: 'GMT+0',
		label: __('GMT+0', 'ta-vchat'),
	},
	{
		value: 'GMT-0',
		label: __('GMT-0', 'ta-vchat'),
	},
	{
		value: 'GMT0',
		label: __('GMT0', 'ta-vchat'),
	},
	{
		value: 'Greenwich',
		label: __('Greenwich', 'ta-vchat'),
	},
	{
		value: 'HST',
		label: __('HST', 'ta-vchat'),
	},
	{
		value: 'Hongkong',
		label: __('Hongkong', 'ta-vchat'),
	},
	{
		value: 'Iceland',
		label: __('Iceland', 'ta-vchat'),
	},
	{
		value: 'Indian/Antananarivo',
		label: __('Indian/Antananarivo', 'ta-vchat'),
	},
	{
		value: 'Indian/Chagos',
		label: __('Indian/Chagos', 'ta-vchat'),
	},
	{
		value: 'Indian/Christmas',
		label: __('Indian/Christmas', 'ta-vchat'),
	},
	{
		value: 'Indian/Cocos',
		label: __('Indian/Cocos', 'ta-vchat'),
	},
	{
		value: 'Indian/Comoro',
		label: __('Indian/Comoro', 'ta-vchat'),
	},
	{
		value: 'Indian/Kerguelen',
		label: __('Indian/Kerguelen', 'ta-vchat'),
	},
	{
		value: 'Indian/Mahe',
		label: __('Indian/Mahe', 'ta-vchat'),
	},
	{
		value: 'Indian/Maldives',
		label: __('Indian/Maldives', 'ta-vchat'),
	},
	{
		value: 'Indian/Mauritius',
		label: __('Indian/Mauritius', 'ta-vchat'),
	},
	{
		value: 'Indian/Mayotte',
		label: __('Indian/Mayotte', 'ta-vchat'),
	},
	{
		value: 'Indian/Reunion',
		label: __('Indian/Reunion', 'ta-vchat'),
	},
	{
		value: 'Iran',
		label: __('Iran', 'ta-vchat'),
	},
	{
		value: 'Israel',
		label: __('Israel', 'ta-vchat'),
	},
	{
		value: 'Jamaica',
		label: __('Jamaica', 'ta-vchat'),
	},
	{
		value: 'Japan',
		label: __('Japan', 'ta-vchat'),
	},
	{
		value: 'Kwajalein',
		label: __('Kwajalein', 'ta-vchat'),
	},
	{
		value: 'Libya',
		label: __('Libya', 'ta-vchat'),
	},
	{
		value: 'MET',
		label: __('MET', 'ta-vchat'),
	},
	{
		value: 'MST',
		label: __('MST', 'ta-vchat'),
	},
	{
		value: 'MST7MDT',
		label: __('MST7MDT', 'ta-vchat'),
	},
	{
		value: 'Mexico/BajaNorte',
		label: __('Mexico/BajaNorte', 'ta-vchat'),
	},
	{
		value: 'Mexico/BajaSur',
		label: __('Mexico/BajaSur', 'ta-vchat'),
	},
	{
		value: 'Mexico/General',
		label: __('Mexico/General', 'ta-vchat'),
	},
	{
		value: 'NZ',
		label: __('NZ', 'ta-vchat'),
	},
	{
		value: 'NZ-CHAT',
		label: __('NZ-CHAT', 'ta-vchat'),
	},
	{
		value: 'Navajo',
		label: __('Navajo', 'ta-vchat'),
	},
	{
		value: 'PRC',
		label: __('PRC', 'ta-vchat'),
	},
	{
		value: 'PST8PDT',
		label: __('PST8PDT', 'ta-vchat'),
	},
	{
		value: 'Pacific/Apia',
		label: __('Pacific/Apia', 'ta-vchat'),
	},
	{
		value: 'Pacific/Auckland',
		label: __('Pacific/Auckland', 'ta-vchat'),
	},
	{
		value: 'Pacific/Bougainville',
		label: __('Pacific/Bougainville', 'ta-vchat'),
	},
	{
		value: 'Pacific/Chatham',
		label: __('Pacific/Chatham', 'ta-vchat'),
	},
	{
		value: 'Pacific/Chuuk',
		label: __('Pacific/Chuuk', 'ta-vchat'),
	},
	{
		value: 'Pacific/Easter',
		label: __('Pacific/Easter', 'ta-vchat'),
	},
	{
		value: 'Pacific/Efate',
		label: __('Pacific/Efate', 'ta-vchat'),
	},
	{
		value: 'Pacific/Enderbury',
		label: __('Pacific/Enderbury', 'ta-vchat'),
	},
	{
		value: 'Pacific/Fakaofo',
		label: __('Pacific/Fakaofo', 'ta-vchat'),
	},
	{
		value: 'Pacific/Fiji',
		label: __('Pacific/Fiji', 'ta-vchat'),
	},
	{
		value: 'Pacific/Funafuti',
		label: __('Pacific/Funafuti', 'ta-vchat'),
	},
	{
		value: 'Pacific/Galapagos',
		label: __('Pacific/Galapagos', 'ta-vchat'),
	},
	{
		value: 'Pacific/Gambier',
		label: __('Pacific/Gambier', 'ta-vchat'),
	},
	{
		value: 'Pacific/Guadalcanal',
		label: __('Pacific/Guadalcanal', 'ta-vchat'),
	},
	{
		value: 'Pacific/Guam',
		label: __('Pacific/Guam', 'ta-vchat'),
	},
	{
		value: 'Pacific/Honolulu',
		label: __('Pacific/Honolulu', 'ta-vchat'),
	},
	{
		value: 'Pacific/Johnston',
		label: __('Pacific/Johnston', 'ta-vchat'),
	},
	{
		value: 'Pacific/Kiritimati',
		label: __('Pacific/Kiritimati', 'ta-vchat'),
	},
	{
		value: 'Pacific/Kosrae',
		label: __('Pacific/Kosrae', 'ta-vchat'),
	},
	{
		value: 'Pacific/Kwajalein',
		label: __('Pacific/Kwajalein', 'ta-vchat'),
	},
	{
		value: 'Pacific/Majuro',
		label: __('Pacific/Majuro', 'ta-vchat'),
	},
	{
		value: 'Pacific/Marquesas',
		label: __('Pacific/Marquesas', 'ta-vchat'),
	},
	{
		value: 'Pacific/Midway',
		label: __('Pacific/Midway', 'ta-vchat'),
	},
	{
		value: 'Pacific/Nauru',
		label: __('Pacific/Nauru', 'ta-vchat'),
	},
	{
		value: 'Pacific/Niue',
		label: __('Pacific/Niue', 'ta-vchat'),
	},
	{
		value: 'Pacific/Norfolk',
		label: __('Pacific/Norfolk', 'ta-vchat'),
	},
	{
		value: 'Pacific/Noumea',
		label: __('Pacific/Noumea', 'ta-vchat'),
	},
	{
		value: 'Pacific/Pago_Pago',
		label: __('Pacific/Pago_Pago', 'ta-vchat'),
	},
	{
		value: 'Pacific/Palau',
		label: __('Pacific/Palau', 'ta-vchat'),
	},
	{
		value: 'Pacific/Pitcairn',
		label: __('Pacific/Pitcairn', 'ta-vchat'),
	},
	{
		value: 'Pacific/Pohnpei',
		label: __('Pacific/Pohnpei', 'ta-vchat'),
	},
	{
		value: 'Pacific/Ponape',
		label: __('Pacific/Ponape', 'ta-vchat'),
	},
	{
		value: 'Pacific/Port_Moresby',
		label: __('Pacific/Port_Moresby', 'ta-vchat'),
	},
	{
		value: 'Pacific/Rarotonga',
		label: __('Pacific/Rarotonga', 'ta-vchat'),
	},
	{
		value: 'Pacific/Saipan',
		label: __('Pacific/Saipan', 'ta-vchat'),
	},
	{
		value: 'Pacific/Samoa',
		label: __('Pacific/Samoa', 'ta-vchat'),
	},
	{
		value: 'Pacific/Tahiti',
		label: __('Pacific/Tahiti', 'ta-vchat'),
	},
	{
		value: 'Pacific/Tarawa',
		label: __('Pacific/Tarawa', 'ta-vchat'),
	},
	{
		value: 'Pacific/Tongatapu',
		label: __('Pacific/Tongatapu', 'ta-vchat'),
	},
	{
		value: 'Pacific/Truk',
		label: __('Pacific/Truk', 'ta-vchat'),
	},
	{
		value: 'Pacific/Wake',
		label: __('Pacific/Wake', 'ta-vchat'),
	},
	{
		value: 'Pacific/Wallis',
		label: __('Pacific/Wallis', 'ta-vchat'),
	},
	{
		value: 'Pacific/Yap',
		label: __('Pacific/Yap', 'ta-vchat'),
	},
	{
		value: 'Poland',
		label: __('Poland', 'ta-vchat'),
	},
	{
		value: 'Portugal',
		label: __('Portugal', 'ta-vchat'),
	},
	{
		value: 'ROC',
		label: __('ROC', 'ta-vchat'),
	},
	{
		value: 'ROK',
		label: __('ROK', 'ta-vchat'),
	},
	{
		value: 'Singapore',
		label: __('Singapore', 'ta-vchat'),
	},
	{
		value: 'Turkey',
		label: __('Turkey', 'ta-vchat'),
	},
	{
		value: 'UCT',
		label: __('UCT', 'ta-vchat'),
	},
	{
		value: 'US/Alaska',
		label: __('US/Alaska', 'ta-vchat'),
	},
	{
		value: 'US/Aleutian',
		label: __('US/Aleutian', 'ta-vchat'),
	},
	{
		value: 'US/Arizona',
		label: __('US/Arizona', 'ta-vchat'),
	},
	{
		value: 'US/Central',
		label: __('US/Central', 'ta-vchat'),
	},
	{
		value: 'US/East-Indiana',
		label: __('US/East-Indiana', 'ta-vchat'),
	},
	{
		value: 'US/Eastern',
		label: __('US/Eastern', 'ta-vchat'),
	},
	{
		value: 'US/Hawaii',
		label: __('US/Hawaii', 'ta-vchat'),
	},
	{
		value: 'US/Indiana-Starke',
		label: __('US/Indiana-Starke', 'ta-vchat'),
	},
	{
		value: 'US/Michigan',
		label: __('US/Michigan', 'ta-vchat'),
	},
	{
		value: 'US/Mountain',
		label: __('US/Mountain', 'ta-vchat'),
	},
	{
		value: 'US/Pacific',
		label: __('US/Pacific', 'ta-vchat'),
	},
	{
		value: 'US/Pacific-New',
		label: __('US/Pacific-New', 'ta-vchat'),
	},
	{
		value: 'US/Samoa',
		label: __('US/Samoa', 'ta-vchat'),
	},
	{
		value: 'UTC',
		label: __('UTC', 'ta-vchat'),
	},
	{
		value: 'Universal',
		label: __('Universal', 'ta-vchat'),
	},
	{
		value: 'W-SU',
		label: __('W-SU', 'ta-vchat'),
	},
	{
		value: 'WET',
		label: __('WET', 'ta-vchat'),
	},
	{
		value: 'Zulu',
		label: __('Zulu', 'ta-vchat'),
	},
];

export default function Edit(props) {
	const { attributes, setAttributes } = props;

	const {
		buttonSize,
		buttonType,
		borderRadius,
		text,
		info,
		title,
		online,
		offline,
		textAlignment,
		iconTarget,
		visibility,
		buttonLinkTarget,
		numberInput,
		imageUrl,
		timeZone,
		mondayStartTime,
		mondayEndTime,
		tuesdayStartTime,
		tuesdayEndTime,
		wednesdayStartTime,
		wednesdayEndTime,
		thursdayStartTime,
		thursdayEndTime,
		fridayStartTime,
		fridayEndTime,
		saturdayStartTime,
		saturdayEndTime,
		sundayStartTime,
		sundayEndTime,
	} = attributes;

	// Timezone select and filter //
	const [filteredOptions, setFilteredOptions] = useState(timezones);
	function onInputChange(value) {
		setFilteredOptions(
			timezones.filter((timezone) =>
				timezone.label.toLowerCase().includes(value.toLowerCase())
			)
		);
	}
	function onFontSizeChange(value) {
		setAttributes({ timeZone: value });
	}

	// Image upload  //
	const onSelectImage = (image) => {
		setAttributes({
			imageUrl: image.url,
		});
	};

	const onChangeAlignment = (newAlignment) => {
		setAttributes({ textAlignment: newAlignment });
	};
	const onChangeText = (newText) => {
		setAttributes({ text: newText });
	};
	const advancedBtnInfo = (newInfo) => {
		setAttributes({ info: newInfo });
	};
	const advancedBtnTitle = (newTitle) => {
		setAttributes({ title: newTitle });
	};
	const advancedBtnOnlineBadge = (newOnline) => {
		setAttributes({ online: newOnline });
	};
	const advancedBtnOfflineBadge = (newOnline) => {
		setAttributes({ offline: newOnline });
	};
	const onIconTarget = (iconTargets) => {
		setAttributes({ iconTarget: iconTargets });
	};
	const onButtonLinkTarget = (newLinkTarget) => {
		setAttributes({ buttonLinkTarget: newLinkTarget });
	};
	

	const textClasses = classnames(`text-box-align-${textAlignment}`);

	const classes = classnames(`vChat-button-4 vc-btn-bg`);

	const buttonSizeOptions = [
		{ value: 'size-small', label: __('Small', 'ta-vchat') },
		{ value: 'size-medium', label: __('Medium', 'ta-vchat') },
		{ value: 'size-large', label: __('Large', 'ta-vchat') },
	];
	const buttonTypeOptions = [
		{ value: 'basic-button', label: __('Basic Button', 'ta-vchat') },
		{ value: 'advance-button', label: __('Advance Button', 'ta-vchat') },
	];
	const borderRadiusOptions = [
		{ value: 'border-squared', label: __('Border Squared', 'ta-vchat') },
		{ value: 'border-rounded', label: __('Border Rounded', 'ta-vchat') },
	];
	const visibilityOn = [
		{ value: '', label: __('Everywhere', 'ta-vchat') },
		{ value: 'vc-desktop-only', label: __('Desktop only', 'ta-vchat') },
		{ value: 'vc-tablet-only', label: __('Tablets only', 'ta-vchat') },
		{
			value: 'vc-mobile-tablet-only',
			label: __('Mobile and tablets', 'ta-vchat'),
		},
		{ value: 'vc-mobile-only', label: __('Mobile only', 'ta-vchat') },
	];
	return (
		<>
			<InspectorControls>
				<PanelBody>
					<SelectControl
						label={__('Button Type', 'ta-vchat')}
						value={buttonType}
						options={buttonTypeOptions.map(({ value, label }) => ({
							value,
							label,
						}))}
						onChange={(newButton) => {
							setAttributes({ buttonType: newButton });
						}}
						help={__('Choose the type of button', 'ta-vchat')}
					/>
				</PanelBody>
			</InspectorControls>
			{buttonType === 'basic-button' ? (
				<>
					<InspectorControls>
						<PanelBody
							title={__('Ganerel settings', 'ta-vchat')}
							initialOpen={false}
						>
							<TextControl
								label={__('Number', 'ta-vchat')}
								value={numberInput}
								onChange={(value) =>
									setAttributes({ numberInput: value })
								}
								help={__('Add your viber number including country code. eg: +8801235445452', 'ta-vchat')}
							/>
							<ToggleControl
								label={__(
									'Open link in new window',
									'ta-vchat'
								)}
								checked={buttonLinkTarget}
								onChange={onButtonLinkTarget}
							/>
							<TextControl
								label={__('Button label', 'ta-vchat')}
								value={text}
								onChange={(value) =>
									setAttributes({ text: value })
								}
								help={__('Add Custom Button Label', 'ta-vchat')}
							/>
						</PanelBody>
						<PanelBody
							title={__('Appearance settings', 'ta-vchat')}
							initialOpen={false}
						>
							<SelectControl
								label={__('Visibility on', 'ta-vchat')}
								value={visibility}
								options={visibilityOn.map(
									({ value, label }) => ({
										value,
										label,
									})
								)}
								onChange={(newSize) => {
									setAttributes({ visibility: newSize });
								}}
							/>
							<SelectControl
								label={__('Size', 'ta-vchat')}
								value={buttonSize}
								options={buttonSizeOptions.map(
									({ value, label }) => ({
										value,
										label,
									})
								)}
								onChange={(newSize) => {
									setAttributes({ buttonSize: newSize });
								}}
							/>
							<ToggleControl
								label={__('Add Icon', 'ta-vchat')}
								checked={iconTarget}
								onChange={onIconTarget}
							/>
							<SelectControl
								label={__('Border Radius', 'ta-vchat')}
								value={borderRadius}
								options={borderRadiusOptions.map(
									({ value, label }) => ({
										value,
										label,
									})
								)}
								onChange={(newSize) => {
									setAttributes({ borderRadius: newSize });
								}}
							/>
							<AlignmentToolbar
							label={__('Allignment', 'ta-vchat')}
							value={textAlignment}
							onChange={onChangeAlignment}
						/>
						</PanelBody>
					</InspectorControls>
					<BlockControls>
						<AlignmentToolbar
							value={textAlignment}
							onChange={onChangeAlignment}
						/>
					</BlockControls>

					<div className={`button-wrapper ${textClasses}`}>
						<a
							{...useBlockProps({
								className: `${classes} ${buttonSize} ${borderRadius} ${visibility}`,
							})}
						>
							{iconTarget && (
								<span className="dashicons dashicons-share-alt"></span>
							)}
							<RichText
								onChange={onChangeText}
								value={text}
								placeholder={__(
									'How can I help you?',
									'ta-vchat'
								)}
								tagName="span"
								allowedFormats={[]}
							/>
						</a>
					</div>
				</>
			) : (
				<>
					<InspectorControls>
						<PanelBody
							title={__('Ganeral Setting', 'ta-vchat')}
							initialOpen={false}
						>
							<TextControl
								label={__('Number', 'ta-vchat')}
								value={numberInput}
								onChange={(value) =>
									setAttributes({ numberInput: value })
								}
								help={__('Add your viber number including country code. eg: +8801235445452', 'ta-vchat')}
							/>
							<ToggleControl
								label={__(
									'Open link in new window',
									'ta-vchat'
								)}
								checked={buttonLinkTarget}
								onChange={onButtonLinkTarget}
								help={__('Toggle this if you want the link to open in new tab', 'ta-vchat')}
							/>
							<MediaUpload
								label={__('Agent photo', 'ta-vchat')}
								onSelect={onSelectImage}
								allowedTypes={['image']}
								render={({ open }) => (
									<Button
										onClick={open}
										style={{
											marginBottom: '20px',
											fontSize: '16px',
										}}
									>
										<span className="dashicons dashicons-cloud-upload"></span>{' '}
										Upload Image
									</Button>
								)}
							/>
							<TextControl
								label={__('Agent Info', 'ta-vchat')}
								value={info}
								help={__('Add agent name and designation to show in button', 'ta-vchat')}
								onChange={(value) =>
									setAttributes({ info: value })
								}
							/>
							<TextControl
								label={__('Button label', 'ta-vchat')}
								value={title}
								onChange={(value) =>
									setAttributes({ title: value })
								}
								help={__('Add Custom Button Label', 'ta-vchat')}
							/>
							<TextControl
								label={__('Online badge text', 'ta-vchat')}
								value={online}
								help={__('Add Custom badge text when user in online', 'ta-vchat')}
								onChange={(value) =>
									setAttributes({ online: value })
								}
							/>
							<TextControl
								label={__('Offline badge text', 'ta-vchat')}
								value={offline}
								help={__('Add Custom badge text when user in offline', 'ta-vchat')}
								onChange={(value) =>
									setAttributes({ offline: value })
								}
							/>
						</PanelBody>
						<PanelBody
							title={__('Chat Settings', 'ta-vchat')}
							initialOpen={false}
						>
							<ComboboxControl
								label={__('Timezone', 'ta-vchat')}
								value={timeZone}
								options={filteredOptions}
								onChange={onFontSizeChange}
								onInputChange={onInputChange}
								help={__('When using the date and time from the user browser you can transform it to your current timezone (in case your user is in a different timezone)', 'ta-vchat')}
							/>
							<PanelBody
								title={__('Monday', 'ta-vchat')}
								initialOpen={false}
							>
								<TextControl
									label={__('Start Time:', 'ta-vchat')}
									value={mondayStartTime}
									onChange={(value) =>
										setAttributes({
											mondayStartTime: value,
										})
									}
									placeholder={__('00:01', 'ta-vchat')}
								/>
								<TextControl
									label={__('End Time:', 'ta-vchat')}
									value={mondayEndTime}
									onChange={(value) =>
										setAttributes({ mondayEndTime: value })
									}
									placeholder={__('23:59', 'ta-vchat')}
								/>
							</PanelBody>
							<PanelBody
								title={__('Tuesday', 'ta-vchat')}
								initialOpen={false}
							>
								<TextControl
									label={__('Start Time:', 'ta-vchat')}
									value={tuesdayStartTime}
									onChange={(value) =>
										setAttributes({
											tuesdayStartTime: value,
										})
									}
									placeholder={__('00:01', 'ta-vchat')}
								/>
								<TextControl
									label={__('End Time:', 'ta-vchat')}
									value={tuesdayEndTime}
									onChange={(value) =>
										setAttributes({ tuesdayEndTime: value })
									}
									placeholder={__('23:59', 'ta-vchat')}
								/>
							</PanelBody>
							<PanelBody
								title={__('Wednesday', 'ta-vchat')}
								initialOpen={false}
							>
								<TextControl
									label={__('Start Time:', 'ta-vchat')}
									value={wednesdayStartTime}
									onChange={(value) =>
										setAttributes({
											wednesdayStartTime: value,
										})
									}
									placeholder={__('00:01', 'ta-vchat')}
								/>
								<TextControl
									label={__('End Time:', 'ta-vchat')}
									value={wednesdayEndTime}
									onChange={(value) =>
										setAttributes({
											wednesdayEndTime: value,
										})
									}
									placeholder={__('23:59', 'ta-vchat')}
								/>
							</PanelBody>
							<PanelBody
								title={__('Thursday', 'ta-vchat')}
								initialOpen={false}
							>
								<TextControl
									label={__('Start Time:', 'ta-vchat')}
									value={thursdayStartTime}
									onChange={(value) =>
										setAttributes({
											thursdayStartTime: value,
										})
									}
									placeholder={__('00:01', 'ta-vchat')}
								/>
								<TextControl
									label={__('End Time:', 'ta-vchat')}
									value={thursdayEndTime}
									onChange={(value) =>
										setAttributes({
											thursdayEndTime: value,
										})
									}
									placeholder={__('23:59', 'ta-vchat')}
								/>
							</PanelBody>
							<PanelBody
								title={__('Friday', 'ta-vchat')}
								initialOpen={false}
							>
								<TextControl
									label={__('Start Time:', 'ta-vchat')}
									value={fridayStartTime}
									onChange={(value) =>
										setAttributes({
											fridayStartTime: value,
										})
									}
									placeholder={__('00:01', 'ta-vchat')}
								/>
								<TextControl
									label={__('End Time:', 'ta-vchat')}
									value={fridayEndTime}
									onChange={(value) =>
										setAttributes({ fridayEndTime: value })
									}
									placeholder={__('23:59', 'ta-vchat')}
								/>
							</PanelBody>
							<PanelBody
								title={__('Saturday', 'ta-vchat')}
								initialOpen={false}
							>
								<TextControl
									label={__('Start Time:', 'ta-vchat')}
									value={saturdayStartTime}
									onChange={(value) =>
										setAttributes({
											saturdayStartTime: value,
										})
									}
									placeholder={__('00:01', 'ta-vchat')}
								/>
								<TextControl
									label={__('End Time:', 'ta-vchat')}
									value={saturdayEndTime}
									onChange={(value) =>
										setAttributes({
											saturdayEndTime: value,
										})
									}
									placeholder={__('23:59', 'ta-vchat')}
								/>
							</PanelBody>
							<PanelBody
								title={__('Sunday', 'ta-vchat')}
								initialOpen={false}
							>
								<TextControl
									label={__('Start Time:', 'ta-vchat')}
									value={sundayStartTime}
									onChange={(value) =>
										setAttributes({
											sundayStartTime: value,
										})
									}
									placeholder={__('00:01', 'ta-vchat')}
								/>
								<TextControl
									label={__('End Time:', 'ta-vchat')}
									value={sundayEndTime}
									onChange={(value) =>
										setAttributes({ sundayEndTime: value })
									}
									placeholder={__('23:59', 'ta-vchat')}
								/>
							</PanelBody>
						</PanelBody>
						<PanelBody
							title={__('Appearence settings', 'ta-vchat')}
							initialOpen={false}
						>
							<SelectControl
								label={__('Visibility on', 'ta-vchat')}
								value={visibility}
								options={visibilityOn.map(
									({ value, label }) => ({
										value,
										label,
									})
								)}
								onChange={(newSize) => {
									setAttributes({ visibility: newSize });
								}}
							/>
							<SelectControl
								label={__('Size', 'ta-vchat')}
								value={buttonSize}
								options={buttonSizeOptions.map(
									({ value, label }) => ({
										value,
										label,
									})
								)}
								onChange={(newSize) => {
									setAttributes({ buttonSize: newSize });
								}}
							/>
							<SelectControl
								label={__('Border Radius', 'ta-vchat')}
								value={borderRadius}
								options={borderRadiusOptions.map(
									({ value, label }) => ({
										value,
										label,
									})
								)}
								onChange={(newSize) => {
									setAttributes({ borderRadius: newSize });
								}}
							/>
							<AlignmentToolbar
							label={__('Allignment', 'ta-vchat')}
							value={textAlignment}
							onChange={onChangeAlignment}
						/>
						</PanelBody>
					</InspectorControls>
					<BlockControls>
						<AlignmentToolbar
							value={textAlignment}
							onChange={onChangeAlignment}
						/>
					</BlockControls>
					<div className={`button-wrapper ${textClasses}`}>
						<a
							{...useBlockProps({
								className: `avatar-active vcButtons ${classes} ${buttonSize} ${borderRadius} ${visibility}`,
							})}
							data-timezone={timeZone}
							data-btnavailablety={`{ "monday":"${mondayStartTime}-${mondayEndTime}", "tuesday":"${tuesdayStartTime}-${tuesdayEndTime}", "wednesday":"${wednesdayStartTime}-${wednesdayEndTime}", "thursday":"${thursdayStartTime}-${thursdayEndTime}", "friday":"${fridayStartTime}-${fridayEndTime}", "saturday":"${saturdayStartTime}-${saturdayEndTime}", "sunday":"${sundayStartTime}-${sundayEndTime}" }`}
						>
							<img src={imageUrl} alt="agent" />
							<div className="info-wrapper">
								<RichText
									onChange={advancedBtnInfo}
									value={info}
									placeholder={__(
										'Robert / Sales Support',
										'ta-vchat'
									)}
									tagName="p"
									allowedFormats={[]}
									className="info"
								/>
								<RichText
									onChange={advancedBtnTitle}
									value={title}
									placeholder={__(
										'How can I help you?',
										'ta-vchat'
									)}
									tagName="p"
									allowedFormats={[]}
									className="title"
								/>
								<RichText
								onChange={advancedBtnOnlineBadge}
									value={online}
									placeholder={__("I'm available", 'ta-vchat')}
									tagName="p"
									allowedFormats={[]}
									className="online"
								/>
								<RichText
								onChange={advancedBtnOfflineBadge}
									value={offline}
									placeholder={__("I'm offline", 'ta-vchat')}
									tagName="p"
									allowedFormats={[]}
									className="offline"
								/>
							</div>
						</a>
					</div>
				</>
			)}
		</>
	);
}
