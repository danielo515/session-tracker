import React, { Suspense } from 'react';
import CachedRoundedIcon from '@mui/icons-material/CachedRounded';
import { useTheme } from '@mui/material';

const LoadingIcon = () => <CachedRoundedIcon />;

type Props = {
  color: string;
  className: string;
  Component: any;
};

const Renderer = ({ color, className, Component }: Props) => {
  const { palette } = useTheme();
  return (
    <Component sx={{ color: color || palette.divider }} className={`${className}`}></Component>
  );
};

/**
 * Creates a react-loadable  Icon component.
 */
function loadableIcon(importFn: () => any) {
  const Inner = React.lazy(async () => {
    const component = await importFn();
    return {
      default(props) {
        return <Renderer {...props} Component={component.default} />;
      },
    };
  });
  const SuspendedIcon = (props: { color: string; className?: string }) => (
    <Suspense fallback={<LoadingIcon />}>
      <Inner {...props} />
    </Suspense>
  );
  return SuspendedIcon;
}

export type Icon = keyof typeof Icons;

/* scrapped from material-ui gh repo with
`console.log([...document.getElementsByClassName('js-navigation-open')].map( x => x.title.split('.')[0]).filter(x=>x?.includes('Outline')))`
then templated with 
regex: '(\w+)',
export const $1 = () => import('@mui/icons-material/$1')
export const $1 = loadableIcon(() => import('@mui/icons-material/$1'))
*/
// prettier-ignore
export const Icons = {
 Default:loadableIcon(() => import('@mui/icons-material/BlockOutlined')),
 AcUnitOutlined:loadableIcon(() => import('@mui/icons-material/AcUnitOutlined')),
 AccessTimeOutlined:loadableIcon(
  () => import('@mui/icons-material/AccessTimeOutlined'),
),
 AccessibilityNewOutlined:loadableIcon(
  () => import('@mui/icons-material/AccessibilityNewOutlined'),
),
 AccessibleOutlined:loadableIcon(
  () => import('@mui/icons-material/AccessibleOutlined'),
),
 AccountBalanceOutlined:loadableIcon(
  () => import('@mui/icons-material/AccountBalanceOutlined'),
),
 AccountBalanceWalletOutlined:loadableIcon(
  () => import('@mui/icons-material/AccountBalanceWalletOutlined'),
),
 AccountCircleOutlined:loadableIcon(
  () => import('@mui/icons-material/AccountCircleOutlined'),
),
 AccountTreeOutlined:loadableIcon(
  () => import('@mui/icons-material/AccountTreeOutlined'),
),
 AdbOutlined:loadableIcon(() => import('@mui/icons-material/AdbOutlined')),
 AddIcCallOutlined:loadableIcon(
  () => import('@mui/icons-material/AddIcCallOutlined'),
),
 AirlineSeatFlatAngledOutlined:loadableIcon(
  () => import('@mui/icons-material/AirlineSeatFlatAngledOutlined'),
),
 AirlineSeatFlatOutlined:loadableIcon(
  () => import('@mui/icons-material/AirlineSeatFlatOutlined'),
),
 AirlineSeatIndividualSuiteOutlined:loadableIcon(
  () => import('@mui/icons-material/AirlineSeatIndividualSuiteOutlined'),
),
 AirlineSeatReclineNormalOutlined:loadableIcon(
  () => import('@mui/icons-material/AirlineSeatReclineNormalOutlined'),
),
 AirplanemodeActiveOutlined:loadableIcon(
  () => import('@mui/icons-material/AirplanemodeActiveOutlined'),
),
 AirplanemodeInactiveOutlined:loadableIcon(
  () => import('@mui/icons-material/AirplanemodeInactiveOutlined'),
),
 AirportShuttleOutlined:loadableIcon(
  () => import('@mui/icons-material/AirportShuttleOutlined'),
),
 AlarmOnOutlined:loadableIcon(() => import('@mui/icons-material/AlarmOnOutlined')),
 AllInboxOutlined:loadableIcon(() => import('@mui/icons-material/AllInboxOutlined')),
 AndroidOutlined:loadableIcon(() => import('@mui/icons-material/AndroidOutlined')),
 AnnouncementOutlined:loadableIcon(
  () => import('@mui/icons-material/AnnouncementOutlined'),
),
 ApartmentOutlined:loadableIcon(
  () => import('@mui/icons-material/ApartmentOutlined'),
),
 AssignmentIndOutlined:loadableIcon(
  () => import('@mui/icons-material/AssignmentIndOutlined'),
),
 AssignmentOutlined:loadableIcon(
  () => import('@mui/icons-material/AssignmentOutlined'),
),
 AssistantPhotoOutlined:loadableIcon(
  () => import('@mui/icons-material/AssistantPhotoOutlined'),
),
 AttachFileOutlined:loadableIcon(
  () => import('@mui/icons-material/AttachFileOutlined'),
),
 AttachMoneyOutlined:loadableIcon(
  () => import('@mui/icons-material/AttachMoneyOutlined'),
),
 AttachmentOutlined:loadableIcon(
  () => import('@mui/icons-material/AttachmentOutlined'),
),
 AudiotrackOutlined:loadableIcon(
  () => import('@mui/icons-material/AudiotrackOutlined'),
),
 BackupOutlined:loadableIcon(() => import('@mui/icons-material/BackupOutlined')),
 BallotOutlined:loadableIcon(() => import('@mui/icons-material/BallotOutlined')),
 BathtubOutlined:loadableIcon(() => import('@mui/icons-material/BathtubOutlined')),
 BatteryChargingFullOutlined:loadableIcon(
  () => import('@mui/icons-material/BatteryChargingFullOutlined'),
),
 BatteryFullOutlined:loadableIcon(
  () => import('@mui/icons-material/BatteryFullOutlined'),
),
 BeachAccessOutlined:loadableIcon(
  () => import('@mui/icons-material/BeachAccessOutlined'),
),
 BeenhereOutlined:loadableIcon(() => import('@mui/icons-material/BeenhereOutlined')),
 BlockOutlined:loadableIcon(() => import('@mui/icons-material/BlockOutlined')),
 BookOutlined:loadableIcon(() => import('@mui/icons-material/BookOutlined')),
 BookmarkBorderOutlined:loadableIcon(
  () => import('@mui/icons-material/BookmarkBorderOutlined'),
),
 Brightness5Outlined:loadableIcon(
  () => import('@mui/icons-material/Brightness5Outlined'),
),
 BrokenImageOutlined:loadableIcon(
  () => import('@mui/icons-material/BrokenImageOutlined'),
),
 BugReportOutlined:loadableIcon(
  () => import('@mui/icons-material/BugReportOutlined'),
),
 BuildOutlined:loadableIcon(() => import('@mui/icons-material/BuildOutlined')),
 BusinessCenterOutlined:loadableIcon(
  () => import('@mui/icons-material/BusinessCenterOutlined'),
),
 BusinessOutlined:loadableIcon(() => import('@mui/icons-material/BusinessOutlined')),
 CakeOutlined:loadableIcon(() => import('@mui/icons-material/CakeOutlined')),
 CalendarTodayOutlined:loadableIcon(
  () => import('@mui/icons-material/CalendarTodayOutlined'),
),
 CameraAltOutlined:loadableIcon(
  () => import('@mui/icons-material/CameraAltOutlined'),
),
 CameraOutlined:loadableIcon(() => import('@mui/icons-material/CameraOutlined')),
 CameraRollOutlined:loadableIcon(
  () => import('@mui/icons-material/CameraRollOutlined'),
),
 CancelOutlined:loadableIcon(() => import('@mui/icons-material/CancelOutlined')),
 CasinoOutlined:loadableIcon(() => import('@mui/icons-material/CasinoOutlined')),
 CategoryOutlined:loadableIcon(() => import('@mui/icons-material/CategoryOutlined')),
 CheckCircleOutlined:loadableIcon(
  () => import('@mui/icons-material/CheckCircleOutlined'),
),
 ChildCareOutlined:loadableIcon(
  () => import('@mui/icons-material/ChildCareOutlined'),
),
 ChildFriendlyOutlined:loadableIcon(
  () => import('@mui/icons-material/ChildFriendlyOutlined'),
),
 ChromeReaderModeOutlined:loadableIcon(
  () => import('@mui/icons-material/ChromeReaderModeOutlined'),
),
 ClassOutlined:loadableIcon(() => import('@mui/icons-material/ClassOutlined')),

 CloudCircleOutlined:loadableIcon(
  () => import('@mui/icons-material/CloudCircleOutlined'),
),
 CloudOutlined:loadableIcon(() => import('@mui/icons-material/CloudOutlined')),

 ColorizeOutlined:loadableIcon(() => import('@mui/icons-material/ColorizeOutlined')),
 CommuteOutlined:loadableIcon(() => import('@mui/icons-material/CommuteOutlined')),

 CompassCalibrationOutlined:loadableIcon(
  () => import('@mui/icons-material/CompassCalibrationOutlined'),
),
 ConfirmationNumberOutlined:loadableIcon(
  () => import('@mui/icons-material/ConfirmationNumberOutlined'),
),
 ContactlessOutlined:loadableIcon(
  () => import('@mui/icons-material/ContactlessOutlined'),
),
 ContactMailOutlined:loadableIcon(
  () => import('@mui/icons-material/ContactMailOutlined'),
),

 CopyrightOutlined:loadableIcon(
  () => import('@mui/icons-material/CopyrightOutlined'),
),
 CreateOutlined:loadableIcon(() => import('@mui/icons-material/CreateOutlined')),
 CreditCardOutlined:loadableIcon(
  () => import('@mui/icons-material/CreditCardOutlined'),
),

 DashboardOutlined:loadableIcon(
  () => import('@mui/icons-material/DashboardOutlined'),
),
 DateRangeOutlined:loadableIcon(
  () => import('@mui/icons-material/DateRangeOutlined'),
),
 DeckOutlined:loadableIcon(() => import('@mui/icons-material/DeckOutlined')),
 DeleteOutlineOutlined:loadableIcon(
  () => import('@mui/icons-material/DeleteOutlineOutlined'),
),
 DepartureBoardOutlined:loadableIcon(
  () => import('@mui/icons-material/DepartureBoardOutlined'),
),
 DescriptionOutlined:loadableIcon(
  () => import('@mui/icons-material/DescriptionOutlined'),
),
 DesktopMacOutlined:loadableIcon(
  () => import('@mui/icons-material/DesktopMacOutlined'),
),
 DesktopWindowsOutlined:loadableIcon(
  () => import('@mui/icons-material/DesktopWindowsOutlined'),
),
 DeveloperBoardOutlined:loadableIcon(
  () => import('@mui/icons-material/DeveloperBoardOutlined'),
),
 DevicesOtherOutlined:loadableIcon(
  () => import('@mui/icons-material/DevicesOtherOutlined'),
),
 DevicesOutlined:loadableIcon(() => import('@mui/icons-material/DevicesOutlined')),
 DirectionsBikeOutlined:loadableIcon(
  () => import('@mui/icons-material/DirectionsBikeOutlined'),
),
 DirectionsBoatOutlined:loadableIcon(
  () => import('@mui/icons-material/DirectionsBoatOutlined'),
),
 DirectionsBusOutlined:loadableIcon(
  () => import('@mui/icons-material/DirectionsBusOutlined'),
),
 DirectionsCarOutlined:loadableIcon(
  () => import('@mui/icons-material/DirectionsCarOutlined'),
),
 DirectionsRailwayOutlined:loadableIcon(
  () => import('@mui/icons-material/DirectionsRailwayOutlined'),
),
 DirectionsRunOutlined:loadableIcon(
  () => import('@mui/icons-material/DirectionsRunOutlined'),
),
 DirectionsSubwayOutlined:loadableIcon(
  () => import('@mui/icons-material/DirectionsSubwayOutlined'),
),
 DirectionsWalkOutlined:loadableIcon(
  () => import('@mui/icons-material/DirectionsWalkOutlined'),
),
 DnsOutlined:loadableIcon(() => import('@mui/icons-material/DnsOutlined')),
 DoneOutlineOutlined:loadableIcon(
  () => import('@mui/icons-material/DoneOutlineOutlined'),
),
 DonutLargeOutlined:loadableIcon(
  () => import('@mui/icons-material/DonutLargeOutlined'),
),
 DonutSmallOutlined:loadableIcon(
  () => import('@mui/icons-material/DonutSmallOutlined'),
),
 DoubleArrowOutlined:loadableIcon(
  () => import('@mui/icons-material/DoubleArrowOutlined'),
),
 DraftsOutlined:loadableIcon(() => import('@mui/icons-material/DraftsOutlined')),
 DuoOutlined:loadableIcon(() => import('@mui/icons-material/DuoOutlined')),
 DvrOutlined:loadableIcon(() => import('@mui/icons-material/DvrOutlined')),
 EmojiEmotionsOutlined:loadableIcon(
  () => import('@mui/icons-material/EmojiEmotionsOutlined'),
),
 EmojiEventsOutlined:loadableIcon(
  () => import('@mui/icons-material/EmojiEventsOutlined'),
),
 EmojiFlagsOutlined:loadableIcon(
  () => import('@mui/icons-material/EmojiFlagsOutlined'),
),
 EmojiFoodBeverageOutlined:loadableIcon(
  () => import('@mui/icons-material/EmojiFoodBeverageOutlined'),
),
 EmojiNatureOutlined:loadableIcon(
  () => import('@mui/icons-material/EmojiNatureOutlined'),
),
 EmojiObjectsOutlined:loadableIcon(
  () => import('@mui/icons-material/EmojiObjectsOutlined'),
),
 EmojiSymbolsOutlined:loadableIcon(
  () => import('@mui/icons-material/EmojiSymbolsOutlined'),
),
 EmojiTransportationOutlined:loadableIcon(
  () => import('@mui/icons-material/EmojiTransportationOutlined'),
),
 ErrorOutlineOutlined:loadableIcon(
  () => import('@mui/icons-material/ErrorOutlineOutlined'),
),
 EuroSymbolOutlined:loadableIcon(
  () => import('@mui/icons-material/EuroSymbolOutlined'),
),
 EventAvailableOutlined:loadableIcon(
  () => import('@mui/icons-material/EventAvailableOutlined'),
),
 EventOutlined:loadableIcon(() => import('@mui/icons-material/EventOutlined')),
 EvStationOutlined:loadableIcon(
  () => import('@mui/icons-material/EvStationOutlined'),
),
 ExploreOutlined:loadableIcon(() => import('@mui/icons-material/ExploreOutlined')),
 ExtensionOutlined:loadableIcon(
  () => import('@mui/icons-material/ExtensionOutlined'),
),
 FaceOutlined:loadableIcon(() => import('@mui/icons-material/FaceOutlined')),
 FastfoodOutlined:loadableIcon(() => import('@mui/icons-material/FastfoodOutlined')),
 FavoriteBorderOutlined:loadableIcon(
  () => import('@mui/icons-material/FavoriteBorderOutlined'),
),
 FavoriteOutlined:loadableIcon(() => import('@mui/icons-material/FavoriteOutlined')),
 FeedbackOutlined:loadableIcon(() => import('@mui/icons-material/FeedbackOutlined')),
 FilterDramaOutlined:loadableIcon(
  () => import('@mui/icons-material/FilterDramaOutlined'),
),
 FilterVintageOutlined:loadableIcon(
  () => import('@mui/icons-material/FilterVintageOutlined'),
),
 FindInPageOutlined:loadableIcon(
  () => import('@mui/icons-material/FindInPageOutlined'),
),
 FingerprintOutlined:loadableIcon(
  () => import('@mui/icons-material/FingerprintOutlined'),
),
 FireplaceOutlined:loadableIcon(
  () => import('@mui/icons-material/FireplaceOutlined'),
),
 FitnessCenterOutlined:loadableIcon(
  () => import('@mui/icons-material/FitnessCenterOutlined'),
),
 FlagOutlined:loadableIcon(() => import('@mui/icons-material/FlagOutlined')),
 FlareOutlined:loadableIcon(() => import('@mui/icons-material/FlareOutlined')),
 FlightLandOutlined:loadableIcon(
  () => import('@mui/icons-material/FlightLandOutlined'),
),
 FlightTakeoffOutlined:loadableIcon(
  () => import('@mui/icons-material/FlightTakeoffOutlined'),
),
 FolderOutlined:loadableIcon(() => import('@mui/icons-material/FolderOutlined')),
 FolderSharedOutlined:loadableIcon(
  () => import('@mui/icons-material/FolderSharedOutlined'),
),
 FolderSpecialOutlined:loadableIcon(
  () => import('@mui/icons-material/FolderSpecialOutlined'),
),
 FormatPaintOutlined:loadableIcon(
  () => import('@mui/icons-material/FormatPaintOutlined'),
),
 FormatQuoteOutlined:loadableIcon(
  () => import('@mui/icons-material/FormatQuoteOutlined'),
),
 ForumOutlined:loadableIcon(() => import('@mui/icons-material/ForumOutlined')),
 FreeBreakfastOutlined:loadableIcon(
  () => import('@mui/icons-material/FreeBreakfastOutlined'),
),
 FunctionsOutlined:loadableIcon(
  () => import('@mui/icons-material/FunctionsOutlined'),
),
 GamesOutlined:loadableIcon(() => import('@mui/icons-material/GamesOutlined')),
 GavelOutlined:loadableIcon(() => import('@mui/icons-material/GavelOutlined')),
 GolfCourseOutlined:loadableIcon(
  () => import('@mui/icons-material/GolfCourseOutlined'),
),
 GpsFixedOutlined:loadableIcon(() => import('@mui/icons-material/GpsFixedOutlined')),
 GradeOutlined:loadableIcon(() => import('@mui/icons-material/GradeOutlined')),
 GradientOutlined:loadableIcon(() => import('@mui/icons-material/GradientOutlined')),
 GroupWorkOutlined:loadableIcon(
  () => import('@mui/icons-material/GroupWorkOutlined'),
),
 GTranslateOutlined:loadableIcon(
  () => import('@mui/icons-material/GTranslateOutlined'),
),
 HeadsetOutlined:loadableIcon(() => import('@mui/icons-material/HeadsetOutlined')),
 HealingOutlined:loadableIcon(() => import('@mui/icons-material/HealingOutlined')),
 HearingOutlined:loadableIcon(() => import('@mui/icons-material/HearingOutlined')),
 HelpOutlined:loadableIcon(() => import('@mui/icons-material/HelpOutlined')),
 HelpOutlineOutlined:loadableIcon(
  () => import('@mui/icons-material/HelpOutlineOutlined'),
),
 HomeOutlined:loadableIcon(() => import('@mui/icons-material/HomeOutlined')),
 HomeWorkOutlined:loadableIcon(() => import('@mui/icons-material/HomeWorkOutlined')),
 HotelOutlined:loadableIcon(() => import('@mui/icons-material/HotelOutlined')),
 HotTubOutlined:loadableIcon(() => import('@mui/icons-material/HotTubOutlined')),
 HouseOutlined:loadableIcon(() => import('@mui/icons-material/HouseOutlined')),
 HowToVoteOutlined:loadableIcon(
  () => import('@mui/icons-material/HowToVoteOutlined'),
),
 HttpsOutlined:loadableIcon(() => import('@mui/icons-material/HttpsOutlined')),
 ImageOutlined:loadableIcon(() => import('@mui/icons-material/ImageOutlined')),
 InboxOutlined:loadableIcon(() => import('@mui/icons-material/InboxOutlined')),
 InfoOutlined:loadableIcon(() => import('@mui/icons-material/InfoOutlined')),
 InsertChartOutlinedTwoTone:loadableIcon(
  () => import('@mui/icons-material/InsertChartOutlinedTwoTone'),
),
 InsertDriveFileOutlined:loadableIcon(
  () => import('@mui/icons-material/InsertDriveFileOutlined'),
),
 InsertEmoticonOutlined:loadableIcon(
  () => import('@mui/icons-material/InsertEmoticonOutlined'),
),
 InvertColorsOutlined:loadableIcon(
  () => import('@mui/icons-material/InvertColorsOutlined'),
),
 IsoOutlined:loadableIcon(() => import('@mui/icons-material/IsoOutlined')),
 KeyboardOutlined:loadableIcon(() => import('@mui/icons-material/KeyboardOutlined')),
 KingBedOutlined:loadableIcon(() => import('@mui/icons-material/KingBedOutlined')),
 KitchenOutlined:loadableIcon(() => import('@mui/icons-material/KitchenOutlined')),
 LandscapeOutlined:loadableIcon(
  () => import('@mui/icons-material/LandscapeOutlined'),
),
 LanguageOutlined:loadableIcon(() => import('@mui/icons-material/LanguageOutlined')),
 LaptopChromebookOutlined:loadableIcon(
  () => import('@mui/icons-material/LaptopChromebookOutlined'),
),
 LinkedCameraOutlined:loadableIcon(
  () => import('@mui/icons-material/LinkedCameraOutlined'),
),
 LocalActivityOutlined:loadableIcon(
  () => import('@mui/icons-material/LocalActivityOutlined'),
),
 LocalAtmOutlined:loadableIcon(() => import('@mui/icons-material/LocalAtmOutlined')),
 LocalBarOutlined:loadableIcon(() => import('@mui/icons-material/LocalBarOutlined')),
 LocalCafeOutlined:loadableIcon(
  () => import('@mui/icons-material/LocalCafeOutlined'),
),
 LocalCarWashOutlined:loadableIcon(
  () => import('@mui/icons-material/LocalCarWashOutlined'),
),
 LocalDiningOutlined:loadableIcon(
  () => import('@mui/icons-material/LocalDiningOutlined'),
),
 LocalDrinkOutlined:loadableIcon(
  () => import('@mui/icons-material/LocalDrinkOutlined'),
),
 LocalFloristOutlined:loadableIcon(
  () => import('@mui/icons-material/LocalFloristOutlined'),
),
 LocalGasStationOutlined:loadableIcon(
  () => import('@mui/icons-material/LocalGasStationOutlined'),
),
 LocalLaundryServiceOutlined:loadableIcon(
  () => import('@mui/icons-material/LocalLaundryServiceOutlined'),
),
 LocalLibraryOutlined:loadableIcon(
  () => import('@mui/icons-material/LocalLibraryOutlined'),
),
 LocalMallOutlined:loadableIcon(
  () => import('@mui/icons-material/LocalMallOutlined'),
),
 LocalMoviesOutlined:loadableIcon(
  () => import('@mui/icons-material/LocalMoviesOutlined'),
),
 LocalOfferOutlined:loadableIcon(
  () => import('@mui/icons-material/LocalOfferOutlined'),
),
 LocalParkingOutlined:loadableIcon(
  () => import('@mui/icons-material/LocalParkingOutlined'),
),
 LocalPharmacyOutlined:loadableIcon(
  () => import('@mui/icons-material/LocalPharmacyOutlined'),
),
 LocalPizzaOutlined:loadableIcon(
  () => import('@mui/icons-material/LocalPizzaOutlined'),
),
 LocalPlayOutlined:loadableIcon(
  () => import('@mui/icons-material/LocalPlayOutlined'),
),
 LocalShippingOutlined:loadableIcon(
  () => import('@mui/icons-material/LocalShippingOutlined'),
),
 LocalTaxiOutlined:loadableIcon(
  () => import('@mui/icons-material/LocalTaxiOutlined'),
),
 LocationCityOutlined:loadableIcon(
  () => import('@mui/icons-material/LocationCityOutlined'),
),
 LocationOffOutlined:loadableIcon(
  () => import('@mui/icons-material/LocationOffOutlined'),
),
 LocationOnOutlined:loadableIcon(
  () => import('@mui/icons-material/LocationOnOutlined'),
),
 LockOpenOutlined:loadableIcon(() => import('@mui/icons-material/LockOpenOutlined')),
 LockOutlined:loadableIcon(() => import('@mui/icons-material/LockOutlined')),
 Looks3Outlined:loadableIcon(() => import('@mui/icons-material/Looks3Outlined')),
 Looks4Outlined:loadableIcon(() => import('@mui/icons-material/Looks4Outlined')),
 Looks5Outlined:loadableIcon(() => import('@mui/icons-material/Looks5Outlined')),
 Looks6Outlined:loadableIcon(() => import('@mui/icons-material/Looks6Outlined')),
 LooksOneOutlined:loadableIcon(() => import('@mui/icons-material/LooksOneOutlined')),
 LooksOutlined:loadableIcon(() => import('@mui/icons-material/LooksOutlined')),
 LooksTwoOutlined:loadableIcon(() => import('@mui/icons-material/LooksTwoOutlined')),
 LoyaltyOutlined:loadableIcon(() => import('@mui/icons-material/LoyaltyOutlined')),
 MailOutlined:loadableIcon(() => import('@mui/icons-material/MailOutlined')),
 MapOutlined:loadableIcon(() => import('@mui/icons-material/MapOutlined')),
 MarkunreadMailboxOutlined:loadableIcon(
  () => import('@mui/icons-material/MarkunreadMailboxOutlined'),
),
 MeetingRoomOutlined:loadableIcon(
  () => import('@mui/icons-material/MeetingRoomOutlined'),
),
 MemoryOutlined:loadableIcon(() => import('@mui/icons-material/MemoryOutlined')),
 MenuBookOutlined:loadableIcon(() => import('@mui/icons-material/MenuBookOutlined')),
 MessageOutlined:loadableIcon(() => import('@mui/icons-material/MessageOutlined')),
 MicNoneOutlined:loadableIcon(() => import('@mui/icons-material/MicNoneOutlined')),
 MmsOutlined:loadableIcon(() => import('@mui/icons-material/MmsOutlined')),
 MonetizationOnOutlined:loadableIcon(
  () => import('@mui/icons-material/MonetizationOnOutlined'),
),
 MoneyOutlined:loadableIcon(() => import('@mui/icons-material/MoneyOutlined')),
 MonochromePhotosOutlined:loadableIcon(
  () => import('@mui/icons-material/MonochromePhotosOutlined'),
),
 MoodBadOutlined:loadableIcon(() => import('@mui/icons-material/MoodBadOutlined')),
 MoodOutlined:loadableIcon(() => import('@mui/icons-material/MoodOutlined')),
 MouseOutlined:loadableIcon(() => import('@mui/icons-material/MouseOutlined')),
 MovieCreationOutlined:loadableIcon(
  () => import('@mui/icons-material/MovieCreationOutlined'),
),
 MuseumOutlined:loadableIcon(() => import('@mui/icons-material/MuseumOutlined')),
 MusicVideoOutlined:loadableIcon(
  () => import('@mui/icons-material/MusicVideoOutlined'),
),
 NatureOutlined:loadableIcon(() => import('@mui/icons-material/NatureOutlined')),
 NavigationOutlined:loadableIcon(
  () => import('@mui/icons-material/NavigationOutlined'),
),
 NetworkCellOutlined:loadableIcon(
  () => import('@mui/icons-material/NetworkCellOutlined'),
),
 NetworkCheckOutlined:loadableIcon(
  () => import('@mui/icons-material/NetworkCheckOutlined'),
),
 NetworkWifiOutlined:loadableIcon(
  () => import('@mui/icons-material/NetworkWifiOutlined'),
),
 NewReleasesOutlined:loadableIcon(
  () => import('@mui/icons-material/NewReleasesOutlined'),
),
 NfcOutlined:loadableIcon(() => import('@mui/icons-material/NfcOutlined')),
 NightsStayOutlined:loadableIcon(
  () => import('@mui/icons-material/NightsStayOutlined'),
),
 NotificationsActiveOutlined:loadableIcon(
  () => import('@mui/icons-material/NotificationsActiveOutlined'),
),
 NotificationsNoneOutlined:loadableIcon(
  () => import('@mui/icons-material/NotificationsNoneOutlined'),
),
 NotListedLocationOutlined:loadableIcon(
  () => import('@mui/icons-material/NotListedLocationOutlined'),
),
 OfflineBoltOutlined:loadableIcon(
  () => import('@mui/icons-material/OfflineBoltOutlined'),
),
 OndemandVideoOutlined:loadableIcon(
  () => import('@mui/icons-material/OndemandVideoOutlined'),
),
 OpacityOutlined:loadableIcon(() => import('@mui/icons-material/OpacityOutlined')),
 OpenWithOutlined:loadableIcon(() => import('@mui/icons-material/OpenWithOutlined')),
 OutdoorGrillOutlined:loadableIcon(
  () => import('@mui/icons-material/OutdoorGrillOutlined'),
),
 OutlinedFlag:loadableIcon(() => import('@mui/icons-material/OutlinedFlag')),
 PagesOutlined:loadableIcon(() => import('@mui/icons-material/PagesOutlined')),
 PageviewOutlined:loadableIcon(() => import('@mui/icons-material/PageviewOutlined')),
 PaletteOutlined:loadableIcon(() => import('@mui/icons-material/PaletteOutlined')),
 PanToolOutlined:loadableIcon(() => import('@mui/icons-material/PanToolOutlined')),
 PeopleAltOutlined:loadableIcon(
  () => import('@mui/icons-material/PeopleAltOutlined'),
),
 PermContactCalendarOutlined:loadableIcon(
  () => import('@mui/icons-material/PermContactCalendarOutlined'),
),
 PermIdentityOutlined:loadableIcon(
  () => import('@mui/icons-material/PermIdentityOutlined'),
),
 PersonOutlineOutlined:loadableIcon(
  () => import('@mui/icons-material/PersonOutlineOutlined'),
),
 PersonPinCircleOutlined:loadableIcon(
  () => import('@mui/icons-material/PersonPinCircleOutlined'),
),
 PersonPinOutlined:loadableIcon(
  () => import('@mui/icons-material/PersonPinOutlined'),
),
 PetsOutlined:loadableIcon(() => import('@mui/icons-material/PetsOutlined')),
 PhoneAndroidOutlined:loadableIcon(
  () => import('@mui/icons-material/PhoneAndroidOutlined'),
),
 PhoneIphoneOutlined:loadableIcon(
  () => import('@mui/icons-material/PhoneIphoneOutlined'),
),
 PhonelinkOffOutlined:loadableIcon(
  () => import('@mui/icons-material/PhonelinkOffOutlined'),
),
 PhonelinkOutlined:loadableIcon(
  () => import('@mui/icons-material/PhonelinkOutlined'),
),
 PhotoAlbumOutlined:loadableIcon(
  () => import('@mui/icons-material/PhotoAlbumOutlined'),
),
 PhotoCameraOutlined:loadableIcon(
  () => import('@mui/icons-material/PhotoCameraOutlined'),
),
 PhotoOutlined:loadableIcon(() => import('@mui/icons-material/PhotoOutlined')),
 PieChartOutlined:loadableIcon(() => import('@mui/icons-material/PieChartOutlined')),
 PolicyOutlined:loadableIcon(() => import('@mui/icons-material/PolicyOutlined')),
 PollOutlined:loadableIcon(() => import('@mui/icons-material/PollOutlined')),
 PoolOutlined:loadableIcon(() => import('@mui/icons-material/PoolOutlined')),
 PortraitOutlined:loadableIcon(() => import('@mui/icons-material/PortraitOutlined')),
 PowerOutlined:loadableIcon(() => import('@mui/icons-material/PowerOutlined')),
 PowerSettingsNewOutlined:loadableIcon(
  () => import('@mui/icons-material/PowerSettingsNewOutlined'),
),
 PregnantWomanOutlined:loadableIcon(
  () => import('@mui/icons-material/PregnantWomanOutlined'),
),
 PresentToAllOutlined:loadableIcon(
  () => import('@mui/icons-material/PresentToAllOutlined'),
),
 PrintOutlined:loadableIcon(() => import('@mui/icons-material/PrintOutlined')),
 PriorityHighOutlined:loadableIcon(
  () => import('@mui/icons-material/PriorityHighOutlined'),
),
 PublicOutlined:loadableIcon(() => import('@mui/icons-material/PublicOutlined')),
 QueryBuilderOutlined:loadableIcon(
  () => import('@mui/icons-material/QueryBuilderOutlined'),
),
 RadioOutlined:loadableIcon(() => import('@mui/icons-material/RadioOutlined')),
 RateReviewOutlined:loadableIcon(
  () => import('@mui/icons-material/RateReviewOutlined'),
),
 ReceiptOutlined:loadableIcon(() => import('@mui/icons-material/ReceiptOutlined')),
 RecordVoiceOverOutlined:loadableIcon(
  () => import('@mui/icons-material/RecordVoiceOverOutlined'),
),
 RemoveCircleOutlineOutlined:loadableIcon(
  () => import('@mui/icons-material/RemoveCircleOutlineOutlined'),
),
 RemoveRedEyeOutlined:loadableIcon(
  () => import('@mui/icons-material/RemoveRedEyeOutlined'),
),
 ReportOutlined:loadableIcon(() => import('@mui/icons-material/ReportOutlined')),
 ReportProblemOutlined:loadableIcon(
  () => import('@mui/icons-material/ReportProblemOutlined'),
),
 RestaurantOutlined:loadableIcon(
  () => import('@mui/icons-material/RestaurantOutlined'),
),
 RingVolumeOutlined:loadableIcon(
  () => import('@mui/icons-material/RingVolumeOutlined'),
),
 RoomOutlined:loadableIcon(() => import('@mui/icons-material/RoomOutlined')),
 RoomServiceOutlined:loadableIcon(
  () => import('@mui/icons-material/RoomServiceOutlined'),
),
 RouterOutlined:loadableIcon(() => import('@mui/icons-material/RouterOutlined')),
 RowingOutlined:loadableIcon(() => import('@mui/icons-material/RowingOutlined')),
 RssFeedOutlined:loadableIcon(() => import('@mui/icons-material/RssFeedOutlined')),
 RvHookupOutlined:loadableIcon(() => import('@mui/icons-material/RvHookupOutlined')),
 SatelliteOutlined:loadableIcon(
  () => import('@mui/icons-material/SatelliteOutlined'),
),
 SaveOutlined:loadableIcon(() => import('@mui/icons-material/SaveOutlined')),
 ScannerOutlined:loadableIcon(() => import('@mui/icons-material/ScannerOutlined')),
 SchoolOutlined:loadableIcon(() => import('@mui/icons-material/SchoolOutlined')),
 SdCardOutlined:loadableIcon(() => import('@mui/icons-material/SdCardOutlined')),
 SecurityOutlined:loadableIcon(() => import('@mui/icons-material/SecurityOutlined')),
 SentimentDissatisfiedOutlined:loadableIcon(
  () => import('@mui/icons-material/SentimentDissatisfiedOutlined'),
),
 SentimentSatisfiedAltOutlined:loadableIcon(
  () => import('@mui/icons-material/SentimentSatisfiedAltOutlined'),
),
 SentimentSatisfiedOutlined:loadableIcon(
  () => import('@mui/icons-material/SentimentSatisfiedOutlined'),
),
 SentimentVeryDissatisfiedOutlined:loadableIcon(
  () => import('@mui/icons-material/SentimentVeryDissatisfiedOutlined'),
),
 SentimentVerySatisfiedOutlined:loadableIcon(
  () => import('@mui/icons-material/SentimentVerySatisfiedOutlined'),
),
 SettingsApplicationsOutlined:loadableIcon(
  () => import('@mui/icons-material/SettingsApplicationsOutlined'),
),
 SettingsBrightnessOutlined:loadableIcon(
  () => import('@mui/icons-material/SettingsBrightnessOutlined'),
),
 SettingsInputComponentOutlined:loadableIcon(
  () => import('@mui/icons-material/SettingsInputComponentOutlined'),
),
 SettingsInputHdmiOutlined:loadableIcon(
  () => import('@mui/icons-material/SettingsInputHdmiOutlined'),
),
 SettingsInputSvideoOutlined:loadableIcon(
  () => import('@mui/icons-material/SettingsInputSvideoOutlined'),
),
 SettingsOutlined:loadableIcon(() => import('@mui/icons-material/SettingsOutlined')),
 SettingsRemoteOutlined:loadableIcon(
  () => import('@mui/icons-material/SettingsRemoteOutlined'),
),
 SettingsSystemDaydreamOutlined:loadableIcon(
  () => import('@mui/icons-material/SettingsSystemDaydreamOutlined'),
),
 ShopOutlined:loadableIcon(() => import('@mui/icons-material/ShopOutlined')),
 ShoppingBasketOutlined:loadableIcon(
  () => import('@mui/icons-material/ShoppingBasketOutlined'),
),
 ShoppingCartOutlined:loadableIcon(
  () => import('@mui/icons-material/ShoppingCartOutlined'),
),
 ShutterSpeedOutlined:loadableIcon(
  () => import('@mui/icons-material/ShutterSpeedOutlined'),
),
 SimCardOutlined:loadableIcon(() => import('@mui/icons-material/SimCardOutlined')),
 SingleBedOutlined:loadableIcon(
  () => import('@mui/icons-material/SingleBedOutlined'),
),
 SmokingRoomsOutlined:loadableIcon(
  () => import('@mui/icons-material/SmokingRoomsOutlined'),
),
 SmsOutlined:loadableIcon(() => import('@mui/icons-material/SmsOutlined')),
 SpaOutlined:loadableIcon(() => import('@mui/icons-material/SpaOutlined')),
 SpeakerOutlined:loadableIcon(() => import('@mui/icons-material/SpeakerOutlined')),
 SpeedOutlined:loadableIcon(() => import('@mui/icons-material/SpeedOutlined')),
 SportsBaseballOutlined:loadableIcon(
  () => import('@mui/icons-material/SportsBaseballOutlined'),
),
 SportsBasketballOutlined:loadableIcon(
  () => import('@mui/icons-material/SportsBasketballOutlined'),
),
 SportsCricketOutlined:loadableIcon(
  () => import('@mui/icons-material/SportsCricketOutlined'),
),
 SportsEsportsOutlined:loadableIcon(
  () => import('@mui/icons-material/SportsEsportsOutlined'),
),
 SportsFootballOutlined:loadableIcon(
  () => import('@mui/icons-material/SportsFootballOutlined'),
),
 SportsGolfOutlined:loadableIcon(
  () => import('@mui/icons-material/SportsGolfOutlined'),
),
 SportsHandballOutlined:loadableIcon(
  () => import('@mui/icons-material/SportsHandballOutlined'),
),
 SportsHockeyOutlined:loadableIcon(
  () => import('@mui/icons-material/SportsHockeyOutlined'),
),
 SportsKabaddiOutlined:loadableIcon(
  () => import('@mui/icons-material/SportsKabaddiOutlined'),
),
 SportsMmaOutlined:loadableIcon(
  () => import('@mui/icons-material/SportsMmaOutlined'),
),
 SportsMotorsportsOutlined:loadableIcon(
  () => import('@mui/icons-material/SportsMotorsportsOutlined'),
),
 SportsOutlined:loadableIcon(() => import('@mui/icons-material/SportsOutlined')),
 SportsRugbyOutlined:loadableIcon(
  () => import('@mui/icons-material/SportsRugbyOutlined'),
),
 SportsSoccerOutlined:loadableIcon(
  () => import('@mui/icons-material/SportsSoccerOutlined'),
),
 SportsTennisOutlined:loadableIcon(
  () => import('@mui/icons-material/SportsTennisOutlined'),
),
 SportsVolleyballOutlined:loadableIcon(
  () => import('@mui/icons-material/SportsVolleyballOutlined'),
),
 SquareFootOutlined:loadableIcon(
  () => import('@mui/icons-material/SquareFootOutlined'),
),
 StarOutlined:loadableIcon(() => import('@mui/icons-material/StarOutlined')),
 StarOutlineOutlined:loadableIcon(
  () => import('@mui/icons-material/StarOutlineOutlined'),
),
 StarsOutlined:loadableIcon(() => import('@mui/icons-material/StarsOutlined')),
 StorageOutlined:loadableIcon(() => import('@mui/icons-material/StorageOutlined')),
 StorefrontOutlined:loadableIcon(
  () => import('@mui/icons-material/StorefrontOutlined'),
),
 StoreMallDirectoryOutlined:loadableIcon(
  () => import('@mui/icons-material/StoreMallDirectoryOutlined'),
),
 StraightenOutlined:loadableIcon(
  () => import('@mui/icons-material/StraightenOutlined'),
),
 StyleOutlined:loadableIcon(() => import('@mui/icons-material/StyleOutlined')),
 SubtitlesOutlined:loadableIcon(
  () => import('@mui/icons-material/SubtitlesOutlined'),
),
 SubwayOutlined:loadableIcon(() => import('@mui/icons-material/SubwayOutlined')),
 SupervisedUserCircleOutlined:loadableIcon(
  () => import('@mui/icons-material/SupervisedUserCircleOutlined'),
),
 SupervisorAccountOutlined:loadableIcon(
  () => import('@mui/icons-material/SupervisorAccountOutlined'),
),
 SurroundSoundOutlined:loadableIcon(
  () => import('@mui/icons-material/SurroundSoundOutlined'),
),
 TableChartOutlined:loadableIcon(
  () => import('@mui/icons-material/TableChartOutlined'),
),
 TabletAndroidOutlined:loadableIcon(
  () => import('@mui/icons-material/TabletAndroidOutlined'),
),
 TabletMacOutlined:loadableIcon(
  () => import('@mui/icons-material/TabletMacOutlined'),
),
 TabOutlined:loadableIcon(() => import('@mui/icons-material/TabOutlined')),
 TagFacesOutlined:loadableIcon(() => import('@mui/icons-material/TagFacesOutlined')),
 TerrainOutlined:loadableIcon(() => import('@mui/icons-material/TerrainOutlined')),
 TextsmsOutlined:loadableIcon(() => import('@mui/icons-material/TextsmsOutlined')),
 TheatersOutlined:loadableIcon(() => import('@mui/icons-material/TheatersOutlined')),
 ThumbDownAltOutlined:loadableIcon(
  () => import('@mui/icons-material/ThumbDownAltOutlined'),
),
 ThumbsUpDownOutlined:loadableIcon(
  () => import('@mui/icons-material/ThumbsUpDownOutlined'),
),
 ThumbUpAltOutlined:loadableIcon(
  () => import('@mui/icons-material/ThumbUpAltOutlined'),
),
 TimelapseOutlined:loadableIcon(
  () => import('@mui/icons-material/TimelapseOutlined'),
),
 TimerOutlined:loadableIcon(() => import('@mui/icons-material/TimerOutlined')),
 AlarmOffOutlined:loadableIcon(() => import('@mui/icons-material/AlarmOffOutlined')),
 TimeToLeaveOutlined:loadableIcon(
  () => import('@mui/icons-material/TimeToLeaveOutlined'),
),
 TodayOutlined:loadableIcon(() => import('@mui/icons-material/TodayOutlined')),
 AirplayOutlined:loadableIcon(() => import('@mui/icons-material/AirplayOutlined')),
 MovieOutlined:loadableIcon(() => import('@mui/icons-material/MovieOutlined')),
 LocalGroceryStoreOutlined:loadableIcon(
  () => import('@mui/icons-material/LocalGroceryStoreOutlined'),
),
 RestaurantMenuOutlined:loadableIcon(
  () => import('@mui/icons-material/RestaurantMenuOutlined'),
),
 TonalityOutlined:loadableIcon(() => import('@mui/icons-material/TonalityOutlined')),
 TouchAppOutlined:loadableIcon(() => import('@mui/icons-material/TouchAppOutlined')),
 ToysOutlined:loadableIcon(() => import('@mui/icons-material/ToysOutlined')),
 TrackChangesOutlined:loadableIcon(
  () => import('@mui/icons-material/TrackChangesOutlined'),
),
 TrafficOutlined:loadableIcon(() => import('@mui/icons-material/TrafficOutlined')),
 TrainOutlined:loadableIcon(() => import('@mui/icons-material/TrainOutlined')),
 TramOutlined:loadableIcon(() => import('@mui/icons-material/TramOutlined')),
 TransferWithinAStationOutlined:loadableIcon(
  () => import('@mui/icons-material/TransferWithinAStationOutlined'),
),
 TranslateOutlined:loadableIcon(
  () => import('@mui/icons-material/TranslateOutlined'),
),
 TurnedInNotOutlined:loadableIcon(
  () => import('@mui/icons-material/TurnedInNotOutlined'),
),
 TurnedInOutlined:loadableIcon(() => import('@mui/icons-material/TurnedInOutlined')),
 TvOutlined:loadableIcon(() => import('@mui/icons-material/TvOutlined')),
 TwoWheelerOutlined:loadableIcon(
  () => import('@mui/icons-material/TwoWheelerOutlined'),
),
 UnarchiveOutlined:loadableIcon(
  () => import('@mui/icons-material/UnarchiveOutlined'),
),
 UsbOutlined:loadableIcon(() => import('@mui/icons-material/UsbOutlined')),
 VerifiedUserOutlined:loadableIcon(
  () => import('@mui/icons-material/VerifiedUserOutlined'),
),
 VideocamOutlined:loadableIcon(() => import('@mui/icons-material/VideocamOutlined')),
 VideogameAssetOutlined:loadableIcon(
  () => import('@mui/icons-material/VideogameAssetOutlined'),
),
 ViewQuiltOutlined:loadableIcon(
  () => import('@mui/icons-material/ViewQuiltOutlined'),
),
 VisibilityOutlined:loadableIcon(
  () => import('@mui/icons-material/VisibilityOutlined'),
),
 VoiceChatOutlined:loadableIcon(
  () => import('@mui/icons-material/VoiceChatOutlined'),
),
 VpnKeyOutlined:loadableIcon(() => import('@mui/icons-material/VpnKeyOutlined')),
 VpnLockOutlined:loadableIcon(() => import('@mui/icons-material/VpnLockOutlined')),
 WarningOutlined:loadableIcon(() => import('@mui/icons-material/WarningOutlined')),
 WatchLaterOutlined:loadableIcon(
  () => import('@mui/icons-material/WatchLaterOutlined'),
),
 WatchOutlined:loadableIcon(() => import('@mui/icons-material/WatchOutlined')),
 WavesOutlined:loadableIcon(() => import('@mui/icons-material/WavesOutlined')),
 WbCloudyOutlined:loadableIcon(() => import('@mui/icons-material/WbCloudyOutlined')),
 WbIncandescentOutlined:loadableIcon(
  () => import('@mui/icons-material/WbIncandescentOutlined'),
),
 WbIridescentOutlined:loadableIcon(
  () => import('@mui/icons-material/WbIridescentOutlined'),
),
 WbSunnyOutlined:loadableIcon(() => import('@mui/icons-material/WbSunnyOutlined')),
 WcOutlined:loadableIcon(() => import('@mui/icons-material/WcOutlined')),
 WebAssetOutlined:loadableIcon(() => import('@mui/icons-material/WebAssetOutlined')),
 WebOutlined:loadableIcon(() => import('@mui/icons-material/WebOutlined')),
 WeekendOutlined:loadableIcon(() => import('@mui/icons-material/WeekendOutlined')),
 WhatshotOutlined:loadableIcon(() => import('@mui/icons-material/WhatshotOutlined')),
 WhereToVoteOutlined:loadableIcon(
  () => import('@mui/icons-material/WhereToVoteOutlined'),
),
 WifiOutlined:loadableIcon(() => import('@mui/icons-material/WifiOutlined')),
 WorkOutlined:loadableIcon(() => import('@mui/icons-material/WorkOutlined')),
 WorkOutlineOutlined:loadableIcon(
  () => import('@mui/icons-material/WorkOutlineOutlined'),
),
 ZoomInOutlined:loadableIcon(() => import('@mui/icons-material/ZoomInOutlined')),

}
