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
  const SuspendedIcon = (props) => (
    <Suspense fallback={<LoadingIcon />}>
      <Inner {...props} />
    </Suspense>
  );
  return SuspendedIcon;
}

/* scrapped from material-ui gh repo with
`console.log([...document.getElementsByClassName('js-navigation-open')].map( x => x.title.split('.')[0]).filter(x=>x?.includes('Outline')))`
then templated with 
regex: '(\w+)',
export const $1 = () => import('@mui/icons-material/$1')
export const $1 = loadableIcon(() => import('@mui/icons-material/$1'))
*/
// prettier-ignore
export const Default = loadableIcon(() => import('@mui/icons-material/BlockOutlined'));
export const AcUnitOutlined = loadableIcon(() => import('@mui/icons-material/AcUnitOutlined'));
export const AccessTimeOutlined = loadableIcon(
  () => import('@mui/icons-material/AccessTimeOutlined'),
);
export const AccessibilityNewOutlined = loadableIcon(
  () => import('@mui/icons-material/AccessibilityNewOutlined'),
);
export const AccessibleOutlined = loadableIcon(
  () => import('@mui/icons-material/AccessibleOutlined'),
);
export const AccountBalanceOutlined = loadableIcon(
  () => import('@mui/icons-material/AccountBalanceOutlined'),
);
export const AccountBalanceWalletOutlined = loadableIcon(
  () => import('@mui/icons-material/AccountBalanceWalletOutlined'),
);
export const AccountCircleOutlined = loadableIcon(
  () => import('@mui/icons-material/AccountCircleOutlined'),
);
export const AccountTreeOutlined = loadableIcon(
  () => import('@mui/icons-material/AccountTreeOutlined'),
);
export const AdbOutlined = loadableIcon(() => import('@mui/icons-material/AdbOutlined'));
export const AddIcCallOutlined = loadableIcon(
  () => import('@mui/icons-material/AddIcCallOutlined'),
);
export const AirlineSeatFlatAngledOutlined = loadableIcon(
  () => import('@mui/icons-material/AirlineSeatFlatAngledOutlined'),
);
export const AirlineSeatFlatOutlined = loadableIcon(
  () => import('@mui/icons-material/AirlineSeatFlatOutlined'),
);
export const AirlineSeatIndividualSuiteOutlined = loadableIcon(
  () => import('@mui/icons-material/AirlineSeatIndividualSuiteOutlined'),
);
export const AirlineSeatReclineNormalOutlined = loadableIcon(
  () => import('@mui/icons-material/AirlineSeatReclineNormalOutlined'),
);
export const AirplanemodeActiveOutlined = loadableIcon(
  () => import('@mui/icons-material/AirplanemodeActiveOutlined'),
);
export const AirplanemodeInactiveOutlined = loadableIcon(
  () => import('@mui/icons-material/AirplanemodeInactiveOutlined'),
);
export const AirportShuttleOutlined = loadableIcon(
  () => import('@mui/icons-material/AirportShuttleOutlined'),
);
export const AlarmOnOutlined = loadableIcon(() => import('@mui/icons-material/AlarmOnOutlined'));
export const AllInboxOutlined = loadableIcon(() => import('@mui/icons-material/AllInboxOutlined'));
export const AndroidOutlined = loadableIcon(() => import('@mui/icons-material/AndroidOutlined'));
export const AnnouncementOutlined = loadableIcon(
  () => import('@mui/icons-material/AnnouncementOutlined'),
);
export const ApartmentOutlined = loadableIcon(
  () => import('@mui/icons-material/ApartmentOutlined'),
);
export const AssignmentIndOutlined = loadableIcon(
  () => import('@mui/icons-material/AssignmentIndOutlined'),
);
export const AssignmentOutlined = loadableIcon(
  () => import('@mui/icons-material/AssignmentOutlined'),
);
export const AssistantPhotoOutlined = loadableIcon(
  () => import('@mui/icons-material/AssistantPhotoOutlined'),
);
export const AttachFileOutlined = loadableIcon(
  () => import('@mui/icons-material/AttachFileOutlined'),
);
export const AttachMoneyOutlined = loadableIcon(
  () => import('@mui/icons-material/AttachMoneyOutlined'),
);
export const AttachmentOutlined = loadableIcon(
  () => import('@mui/icons-material/AttachmentOutlined'),
);
export const AudiotrackOutlined = loadableIcon(
  () => import('@mui/icons-material/AudiotrackOutlined'),
);
export const BackupOutlined = loadableIcon(() => import('@mui/icons-material/BackupOutlined'));
export const BallotOutlined = loadableIcon(() => import('@mui/icons-material/BallotOutlined'));
export const BathtubOutlined = loadableIcon(() => import('@mui/icons-material/BathtubOutlined'));
export const BatteryChargingFullOutlined = loadableIcon(
  () => import('@mui/icons-material/BatteryChargingFullOutlined'),
);
export const BatteryFullOutlined = loadableIcon(
  () => import('@mui/icons-material/BatteryFullOutlined'),
);
export const BeachAccessOutlined = loadableIcon(
  () => import('@mui/icons-material/BeachAccessOutlined'),
);
export const BeenhereOutlined = loadableIcon(() => import('@mui/icons-material/BeenhereOutlined'));
export const BlockOutlined = loadableIcon(() => import('@mui/icons-material/BlockOutlined'));
export const BookOutlined = loadableIcon(() => import('@mui/icons-material/BookOutlined'));
export const BookmarkBorderOutlined = loadableIcon(
  () => import('@mui/icons-material/BookmarkBorderOutlined'),
);
export const Brightness5Outlined = loadableIcon(
  () => import('@mui/icons-material/Brightness5Outlined'),
);
export const BrokenImageOutlined = loadableIcon(
  () => import('@mui/icons-material/BrokenImageOutlined'),
);
export const BugReportOutlined = loadableIcon(
  () => import('@mui/icons-material/BugReportOutlined'),
);
export const BuildOutlined = loadableIcon(() => import('@mui/icons-material/BuildOutlined'));
export const BusinessCenterOutlined = loadableIcon(
  () => import('@mui/icons-material/BusinessCenterOutlined'),
);
export const BusinessOutlined = loadableIcon(() => import('@mui/icons-material/BusinessOutlined'));
export const CakeOutlined = loadableIcon(() => import('@mui/icons-material/CakeOutlined'));
export const CalendarTodayOutlined = loadableIcon(
  () => import('@mui/icons-material/CalendarTodayOutlined'),
);
export const CameraAltOutlined = loadableIcon(
  () => import('@mui/icons-material/CameraAltOutlined'),
);
export const CameraOutlined = loadableIcon(() => import('@mui/icons-material/CameraOutlined'));
export const CameraRollOutlined = loadableIcon(
  () => import('@mui/icons-material/CameraRollOutlined'),
);
export const CancelOutlined = loadableIcon(() => import('@mui/icons-material/CancelOutlined'));
export const CasinoOutlined = loadableIcon(() => import('@mui/icons-material/CasinoOutlined'));
export const CategoryOutlined = loadableIcon(() => import('@mui/icons-material/CategoryOutlined'));
export const CheckCircleOutlined = loadableIcon(
  () => import('@mui/icons-material/CheckCircleOutlined'),
);
export const ChildCareOutlined = loadableIcon(
  () => import('@mui/icons-material/ChildCareOutlined'),
);
export const ChildFriendlyOutlined = loadableIcon(
  () => import('@mui/icons-material/ChildFriendlyOutlined'),
);
export const ChromeReaderModeOutlined = loadableIcon(
  () => import('@mui/icons-material/ChromeReaderModeOutlined'),
);
export const ClassOutlined = loadableIcon(() => import('@mui/icons-material/ClassOutlined'));

export const CloudCircleOutlined = loadableIcon(
  () => import('@mui/icons-material/CloudCircleOutlined'),
);
export const CloudOutlined = loadableIcon(() => import('@mui/icons-material/CloudOutlined'));

export const ColorizeOutlined = loadableIcon(() => import('@mui/icons-material/ColorizeOutlined'));
export const CommuteOutlined = loadableIcon(() => import('@mui/icons-material/CommuteOutlined'));

export const CompassCalibrationOutlined = loadableIcon(
  () => import('@mui/icons-material/CompassCalibrationOutlined'),
);
export const ConfirmationNumberOutlined = loadableIcon(
  () => import('@mui/icons-material/ConfirmationNumberOutlined'),
);
export const ContactlessOutlined = loadableIcon(
  () => import('@mui/icons-material/ContactlessOutlined'),
);
export const ContactMailOutlined = loadableIcon(
  () => import('@mui/icons-material/ContactMailOutlined'),
);

export const CopyrightOutlined = loadableIcon(
  () => import('@mui/icons-material/CopyrightOutlined'),
);
export const CreateOutlined = loadableIcon(() => import('@mui/icons-material/CreateOutlined'));
export const CreditCardOutlined = loadableIcon(
  () => import('@mui/icons-material/CreditCardOutlined'),
);

export const DashboardOutlined = loadableIcon(
  () => import('@mui/icons-material/DashboardOutlined'),
);
export const DateRangeOutlined = loadableIcon(
  () => import('@mui/icons-material/DateRangeOutlined'),
);
export const DeckOutlined = loadableIcon(() => import('@mui/icons-material/DeckOutlined'));
export const DeleteOutlineOutlined = loadableIcon(
  () => import('@mui/icons-material/DeleteOutlineOutlined'),
);
export const DepartureBoardOutlined = loadableIcon(
  () => import('@mui/icons-material/DepartureBoardOutlined'),
);
export const DescriptionOutlined = loadableIcon(
  () => import('@mui/icons-material/DescriptionOutlined'),
);
export const DesktopMacOutlined = loadableIcon(
  () => import('@mui/icons-material/DesktopMacOutlined'),
);
export const DesktopWindowsOutlined = loadableIcon(
  () => import('@mui/icons-material/DesktopWindowsOutlined'),
);
export const DeveloperBoardOutlined = loadableIcon(
  () => import('@mui/icons-material/DeveloperBoardOutlined'),
);
export const DevicesOtherOutlined = loadableIcon(
  () => import('@mui/icons-material/DevicesOtherOutlined'),
);
export const DevicesOutlined = loadableIcon(() => import('@mui/icons-material/DevicesOutlined'));
export const DirectionsBikeOutlined = loadableIcon(
  () => import('@mui/icons-material/DirectionsBikeOutlined'),
);
export const DirectionsBoatOutlined = loadableIcon(
  () => import('@mui/icons-material/DirectionsBoatOutlined'),
);
export const DirectionsBusOutlined = loadableIcon(
  () => import('@mui/icons-material/DirectionsBusOutlined'),
);
export const DirectionsCarOutlined = loadableIcon(
  () => import('@mui/icons-material/DirectionsCarOutlined'),
);
export const DirectionsRailwayOutlined = loadableIcon(
  () => import('@mui/icons-material/DirectionsRailwayOutlined'),
);
export const DirectionsRunOutlined = loadableIcon(
  () => import('@mui/icons-material/DirectionsRunOutlined'),
);
export const DirectionsSubwayOutlined = loadableIcon(
  () => import('@mui/icons-material/DirectionsSubwayOutlined'),
);
export const DirectionsWalkOutlined = loadableIcon(
  () => import('@mui/icons-material/DirectionsWalkOutlined'),
);
export const DnsOutlined = loadableIcon(() => import('@mui/icons-material/DnsOutlined'));
export const DoneOutlineOutlined = loadableIcon(
  () => import('@mui/icons-material/DoneOutlineOutlined'),
);
export const DonutLargeOutlined = loadableIcon(
  () => import('@mui/icons-material/DonutLargeOutlined'),
);
export const DonutSmallOutlined = loadableIcon(
  () => import('@mui/icons-material/DonutSmallOutlined'),
);
export const DoubleArrowOutlined = loadableIcon(
  () => import('@mui/icons-material/DoubleArrowOutlined'),
);
export const DraftsOutlined = loadableIcon(() => import('@mui/icons-material/DraftsOutlined'));
export const DuoOutlined = loadableIcon(() => import('@mui/icons-material/DuoOutlined'));
export const DvrOutlined = loadableIcon(() => import('@mui/icons-material/DvrOutlined'));
export const EmojiEmotionsOutlined = loadableIcon(
  () => import('@mui/icons-material/EmojiEmotionsOutlined'),
);
export const EmojiEventsOutlined = loadableIcon(
  () => import('@mui/icons-material/EmojiEventsOutlined'),
);
export const EmojiFlagsOutlined = loadableIcon(
  () => import('@mui/icons-material/EmojiFlagsOutlined'),
);
export const EmojiFoodBeverageOutlined = loadableIcon(
  () => import('@mui/icons-material/EmojiFoodBeverageOutlined'),
);
export const EmojiNatureOutlined = loadableIcon(
  () => import('@mui/icons-material/EmojiNatureOutlined'),
);
export const EmojiObjectsOutlined = loadableIcon(
  () => import('@mui/icons-material/EmojiObjectsOutlined'),
);
export const EmojiSymbolsOutlined = loadableIcon(
  () => import('@mui/icons-material/EmojiSymbolsOutlined'),
);
export const EmojiTransportationOutlined = loadableIcon(
  () => import('@mui/icons-material/EmojiTransportationOutlined'),
);
export const ErrorOutlineOutlined = loadableIcon(
  () => import('@mui/icons-material/ErrorOutlineOutlined'),
);
export const EuroSymbolOutlined = loadableIcon(
  () => import('@mui/icons-material/EuroSymbolOutlined'),
);
export const EventAvailableOutlined = loadableIcon(
  () => import('@mui/icons-material/EventAvailableOutlined'),
);
export const EventOutlined = loadableIcon(() => import('@mui/icons-material/EventOutlined'));
export const EvStationOutlined = loadableIcon(
  () => import('@mui/icons-material/EvStationOutlined'),
);
export const ExploreOutlined = loadableIcon(() => import('@mui/icons-material/ExploreOutlined'));
export const ExtensionOutlined = loadableIcon(
  () => import('@mui/icons-material/ExtensionOutlined'),
);
export const FaceOutlined = loadableIcon(() => import('@mui/icons-material/FaceOutlined'));
export const FastfoodOutlined = loadableIcon(() => import('@mui/icons-material/FastfoodOutlined'));
export const FavoriteBorderOutlined = loadableIcon(
  () => import('@mui/icons-material/FavoriteBorderOutlined'),
);
export const FavoriteOutlined = loadableIcon(() => import('@mui/icons-material/FavoriteOutlined'));
export const FeedbackOutlined = loadableIcon(() => import('@mui/icons-material/FeedbackOutlined'));
export const FilterDramaOutlined = loadableIcon(
  () => import('@mui/icons-material/FilterDramaOutlined'),
);
export const FilterVintageOutlined = loadableIcon(
  () => import('@mui/icons-material/FilterVintageOutlined'),
);
export const FindInPageOutlined = loadableIcon(
  () => import('@mui/icons-material/FindInPageOutlined'),
);
export const FingerprintOutlined = loadableIcon(
  () => import('@mui/icons-material/FingerprintOutlined'),
);
export const FireplaceOutlined = loadableIcon(
  () => import('@mui/icons-material/FireplaceOutlined'),
);
export const FitnessCenterOutlined = loadableIcon(
  () => import('@mui/icons-material/FitnessCenterOutlined'),
);
export const FlagOutlined = loadableIcon(() => import('@mui/icons-material/FlagOutlined'));
export const FlareOutlined = loadableIcon(() => import('@mui/icons-material/FlareOutlined'));
export const FlightLandOutlined = loadableIcon(
  () => import('@mui/icons-material/FlightLandOutlined'),
);
export const FlightTakeoffOutlined = loadableIcon(
  () => import('@mui/icons-material/FlightTakeoffOutlined'),
);
export const FolderOutlined = loadableIcon(() => import('@mui/icons-material/FolderOutlined'));
export const FolderSharedOutlined = loadableIcon(
  () => import('@mui/icons-material/FolderSharedOutlined'),
);
export const FolderSpecialOutlined = loadableIcon(
  () => import('@mui/icons-material/FolderSpecialOutlined'),
);
export const FormatPaintOutlined = loadableIcon(
  () => import('@mui/icons-material/FormatPaintOutlined'),
);
export const FormatQuoteOutlined = loadableIcon(
  () => import('@mui/icons-material/FormatQuoteOutlined'),
);
export const ForumOutlined = loadableIcon(() => import('@mui/icons-material/ForumOutlined'));
export const FreeBreakfastOutlined = loadableIcon(
  () => import('@mui/icons-material/FreeBreakfastOutlined'),
);
export const FunctionsOutlined = loadableIcon(
  () => import('@mui/icons-material/FunctionsOutlined'),
);
export const GamesOutlined = loadableIcon(() => import('@mui/icons-material/GamesOutlined'));
export const GavelOutlined = loadableIcon(() => import('@mui/icons-material/GavelOutlined'));
export const GolfCourseOutlined = loadableIcon(
  () => import('@mui/icons-material/GolfCourseOutlined'),
);
export const GpsFixedOutlined = loadableIcon(() => import('@mui/icons-material/GpsFixedOutlined'));
export const GradeOutlined = loadableIcon(() => import('@mui/icons-material/GradeOutlined'));
export const GradientOutlined = loadableIcon(() => import('@mui/icons-material/GradientOutlined'));
export const GroupWorkOutlined = loadableIcon(
  () => import('@mui/icons-material/GroupWorkOutlined'),
);
export const GTranslateOutlined = loadableIcon(
  () => import('@mui/icons-material/GTranslateOutlined'),
);
export const HeadsetOutlined = loadableIcon(() => import('@mui/icons-material/HeadsetOutlined'));
export const HealingOutlined = loadableIcon(() => import('@mui/icons-material/HealingOutlined'));
export const HearingOutlined = loadableIcon(() => import('@mui/icons-material/HearingOutlined'));
export const HelpOutlined = loadableIcon(() => import('@mui/icons-material/HelpOutlined'));
export const HelpOutlineOutlined = loadableIcon(
  () => import('@mui/icons-material/HelpOutlineOutlined'),
);
export const HomeOutlined = loadableIcon(() => import('@mui/icons-material/HomeOutlined'));
export const HomeWorkOutlined = loadableIcon(() => import('@mui/icons-material/HomeWorkOutlined'));
export const HotelOutlined = loadableIcon(() => import('@mui/icons-material/HotelOutlined'));
export const HotTubOutlined = loadableIcon(() => import('@mui/icons-material/HotTubOutlined'));
export const HouseOutlined = loadableIcon(() => import('@mui/icons-material/HouseOutlined'));
export const HowToVoteOutlined = loadableIcon(
  () => import('@mui/icons-material/HowToVoteOutlined'),
);
export const HttpsOutlined = loadableIcon(() => import('@mui/icons-material/HttpsOutlined'));
export const ImageOutlined = loadableIcon(() => import('@mui/icons-material/ImageOutlined'));
export const InboxOutlined = loadableIcon(() => import('@mui/icons-material/InboxOutlined'));
export const InfoOutlined = loadableIcon(() => import('@mui/icons-material/InfoOutlined'));
export const InsertChartOutlinedTwoTone = loadableIcon(
  () => import('@mui/icons-material/InsertChartOutlinedTwoTone'),
);
export const InsertDriveFileOutlined = loadableIcon(
  () => import('@mui/icons-material/InsertDriveFileOutlined'),
);
export const InsertEmoticonOutlined = loadableIcon(
  () => import('@mui/icons-material/InsertEmoticonOutlined'),
);
export const InvertColorsOutlined = loadableIcon(
  () => import('@mui/icons-material/InvertColorsOutlined'),
);
export const IsoOutlined = loadableIcon(() => import('@mui/icons-material/IsoOutlined'));
export const KeyboardOutlined = loadableIcon(() => import('@mui/icons-material/KeyboardOutlined'));
export const KingBedOutlined = loadableIcon(() => import('@mui/icons-material/KingBedOutlined'));
export const KitchenOutlined = loadableIcon(() => import('@mui/icons-material/KitchenOutlined'));
export const LandscapeOutlined = loadableIcon(
  () => import('@mui/icons-material/LandscapeOutlined'),
);
export const LanguageOutlined = loadableIcon(() => import('@mui/icons-material/LanguageOutlined'));
export const LaptopChromebookOutlined = loadableIcon(
  () => import('@mui/icons-material/LaptopChromebookOutlined'),
);
export const LinkedCameraOutlined = loadableIcon(
  () => import('@mui/icons-material/LinkedCameraOutlined'),
);
export const LocalActivityOutlined = loadableIcon(
  () => import('@mui/icons-material/LocalActivityOutlined'),
);
export const LocalAtmOutlined = loadableIcon(() => import('@mui/icons-material/LocalAtmOutlined'));
export const LocalBarOutlined = loadableIcon(() => import('@mui/icons-material/LocalBarOutlined'));
export const LocalCafeOutlined = loadableIcon(
  () => import('@mui/icons-material/LocalCafeOutlined'),
);
export const LocalCarWashOutlined = loadableIcon(
  () => import('@mui/icons-material/LocalCarWashOutlined'),
);
export const LocalDiningOutlined = loadableIcon(
  () => import('@mui/icons-material/LocalDiningOutlined'),
);
export const LocalDrinkOutlined = loadableIcon(
  () => import('@mui/icons-material/LocalDrinkOutlined'),
);
export const LocalFloristOutlined = loadableIcon(
  () => import('@mui/icons-material/LocalFloristOutlined'),
);
export const LocalGasStationOutlined = loadableIcon(
  () => import('@mui/icons-material/LocalGasStationOutlined'),
);
export const LocalLaundryServiceOutlined = loadableIcon(
  () => import('@mui/icons-material/LocalLaundryServiceOutlined'),
);
export const LocalLibraryOutlined = loadableIcon(
  () => import('@mui/icons-material/LocalLibraryOutlined'),
);
export const LocalMallOutlined = loadableIcon(
  () => import('@mui/icons-material/LocalMallOutlined'),
);
export const LocalMoviesOutlined = loadableIcon(
  () => import('@mui/icons-material/LocalMoviesOutlined'),
);
export const LocalOfferOutlined = loadableIcon(
  () => import('@mui/icons-material/LocalOfferOutlined'),
);
export const LocalParkingOutlined = loadableIcon(
  () => import('@mui/icons-material/LocalParkingOutlined'),
);
export const LocalPharmacyOutlined = loadableIcon(
  () => import('@mui/icons-material/LocalPharmacyOutlined'),
);
export const LocalPizzaOutlined = loadableIcon(
  () => import('@mui/icons-material/LocalPizzaOutlined'),
);
export const LocalPlayOutlined = loadableIcon(
  () => import('@mui/icons-material/LocalPlayOutlined'),
);
export const LocalShippingOutlined = loadableIcon(
  () => import('@mui/icons-material/LocalShippingOutlined'),
);
export const LocalTaxiOutlined = loadableIcon(
  () => import('@mui/icons-material/LocalTaxiOutlined'),
);
export const LocationCityOutlined = loadableIcon(
  () => import('@mui/icons-material/LocationCityOutlined'),
);
export const LocationOffOutlined = loadableIcon(
  () => import('@mui/icons-material/LocationOffOutlined'),
);
export const LocationOnOutlined = loadableIcon(
  () => import('@mui/icons-material/LocationOnOutlined'),
);
export const LockOpenOutlined = loadableIcon(() => import('@mui/icons-material/LockOpenOutlined'));
export const LockOutlined = loadableIcon(() => import('@mui/icons-material/LockOutlined'));
export const Looks3Outlined = loadableIcon(() => import('@mui/icons-material/Looks3Outlined'));
export const Looks4Outlined = loadableIcon(() => import('@mui/icons-material/Looks4Outlined'));
export const Looks5Outlined = loadableIcon(() => import('@mui/icons-material/Looks5Outlined'));
export const Looks6Outlined = loadableIcon(() => import('@mui/icons-material/Looks6Outlined'));
export const LooksOneOutlined = loadableIcon(() => import('@mui/icons-material/LooksOneOutlined'));
export const LooksOutlined = loadableIcon(() => import('@mui/icons-material/LooksOutlined'));
export const LooksTwoOutlined = loadableIcon(() => import('@mui/icons-material/LooksTwoOutlined'));
export const LoyaltyOutlined = loadableIcon(() => import('@mui/icons-material/LoyaltyOutlined'));
export const MailOutlined = loadableIcon(() => import('@mui/icons-material/MailOutlined'));
export const MapOutlined = loadableIcon(() => import('@mui/icons-material/MapOutlined'));
export const MarkunreadMailboxOutlined = loadableIcon(
  () => import('@mui/icons-material/MarkunreadMailboxOutlined'),
);
export const MeetingRoomOutlined = loadableIcon(
  () => import('@mui/icons-material/MeetingRoomOutlined'),
);
export const MemoryOutlined = loadableIcon(() => import('@mui/icons-material/MemoryOutlined'));
export const MenuBookOutlined = loadableIcon(() => import('@mui/icons-material/MenuBookOutlined'));
export const MessageOutlined = loadableIcon(() => import('@mui/icons-material/MessageOutlined'));
export const MicNoneOutlined = loadableIcon(() => import('@mui/icons-material/MicNoneOutlined'));
export const MmsOutlined = loadableIcon(() => import('@mui/icons-material/MmsOutlined'));
export const MonetizationOnOutlined = loadableIcon(
  () => import('@mui/icons-material/MonetizationOnOutlined'),
);
export const MoneyOutlined = loadableIcon(() => import('@mui/icons-material/MoneyOutlined'));
export const MonochromePhotosOutlined = loadableIcon(
  () => import('@mui/icons-material/MonochromePhotosOutlined'),
);
export const MoodBadOutlined = loadableIcon(() => import('@mui/icons-material/MoodBadOutlined'));
export const MoodOutlined = loadableIcon(() => import('@mui/icons-material/MoodOutlined'));
export const MouseOutlined = loadableIcon(() => import('@mui/icons-material/MouseOutlined'));
export const MovieCreationOutlined = loadableIcon(
  () => import('@mui/icons-material/MovieCreationOutlined'),
);
export const MuseumOutlined = loadableIcon(() => import('@mui/icons-material/MuseumOutlined'));
export const MusicVideoOutlined = loadableIcon(
  () => import('@mui/icons-material/MusicVideoOutlined'),
);
export const NatureOutlined = loadableIcon(() => import('@mui/icons-material/NatureOutlined'));
export const NavigationOutlined = loadableIcon(
  () => import('@mui/icons-material/NavigationOutlined'),
);
export const NetworkCellOutlined = loadableIcon(
  () => import('@mui/icons-material/NetworkCellOutlined'),
);
export const NetworkCheckOutlined = loadableIcon(
  () => import('@mui/icons-material/NetworkCheckOutlined'),
);
export const NetworkWifiOutlined = loadableIcon(
  () => import('@mui/icons-material/NetworkWifiOutlined'),
);
export const NewReleasesOutlined = loadableIcon(
  () => import('@mui/icons-material/NewReleasesOutlined'),
);
export const NfcOutlined = loadableIcon(() => import('@mui/icons-material/NfcOutlined'));
export const NightsStayOutlined = loadableIcon(
  () => import('@mui/icons-material/NightsStayOutlined'),
);
export const NotificationsActiveOutlined = loadableIcon(
  () => import('@mui/icons-material/NotificationsActiveOutlined'),
);
export const NotificationsNoneOutlined = loadableIcon(
  () => import('@mui/icons-material/NotificationsNoneOutlined'),
);
export const NotListedLocationOutlined = loadableIcon(
  () => import('@mui/icons-material/NotListedLocationOutlined'),
);
export const OfflineBoltOutlined = loadableIcon(
  () => import('@mui/icons-material/OfflineBoltOutlined'),
);
export const OndemandVideoOutlined = loadableIcon(
  () => import('@mui/icons-material/OndemandVideoOutlined'),
);
export const OpacityOutlined = loadableIcon(() => import('@mui/icons-material/OpacityOutlined'));
export const OpenWithOutlined = loadableIcon(() => import('@mui/icons-material/OpenWithOutlined'));
export const OutdoorGrillOutlined = loadableIcon(
  () => import('@mui/icons-material/OutdoorGrillOutlined'),
);
export const OutlinedFlag = loadableIcon(() => import('@mui/icons-material/OutlinedFlag'));
export const PagesOutlined = loadableIcon(() => import('@mui/icons-material/PagesOutlined'));
export const PageviewOutlined = loadableIcon(() => import('@mui/icons-material/PageviewOutlined'));
export const PaletteOutlined = loadableIcon(() => import('@mui/icons-material/PaletteOutlined'));
export const PanToolOutlined = loadableIcon(() => import('@mui/icons-material/PanToolOutlined'));
export const PeopleAltOutlined = loadableIcon(
  () => import('@mui/icons-material/PeopleAltOutlined'),
);
export const PermContactCalendarOutlined = loadableIcon(
  () => import('@mui/icons-material/PermContactCalendarOutlined'),
);
export const PermIdentityOutlined = loadableIcon(
  () => import('@mui/icons-material/PermIdentityOutlined'),
);
export const PersonOutlineOutlined = loadableIcon(
  () => import('@mui/icons-material/PersonOutlineOutlined'),
);
export const PersonPinCircleOutlined = loadableIcon(
  () => import('@mui/icons-material/PersonPinCircleOutlined'),
);
export const PersonPinOutlined = loadableIcon(
  () => import('@mui/icons-material/PersonPinOutlined'),
);
export const PetsOutlined = loadableIcon(() => import('@mui/icons-material/PetsOutlined'));
export const PhoneAndroidOutlined = loadableIcon(
  () => import('@mui/icons-material/PhoneAndroidOutlined'),
);
export const PhoneIphoneOutlined = loadableIcon(
  () => import('@mui/icons-material/PhoneIphoneOutlined'),
);
export const PhonelinkOffOutlined = loadableIcon(
  () => import('@mui/icons-material/PhonelinkOffOutlined'),
);
export const PhonelinkOutlined = loadableIcon(
  () => import('@mui/icons-material/PhonelinkOutlined'),
);
export const PhotoAlbumOutlined = loadableIcon(
  () => import('@mui/icons-material/PhotoAlbumOutlined'),
);
export const PhotoCameraOutlined = loadableIcon(
  () => import('@mui/icons-material/PhotoCameraOutlined'),
);
export const PhotoOutlined = loadableIcon(() => import('@mui/icons-material/PhotoOutlined'));
export const PieChartOutlined = loadableIcon(() => import('@mui/icons-material/PieChartOutlined'));
export const PolicyOutlined = loadableIcon(() => import('@mui/icons-material/PolicyOutlined'));
export const PollOutlined = loadableIcon(() => import('@mui/icons-material/PollOutlined'));
export const PoolOutlined = loadableIcon(() => import('@mui/icons-material/PoolOutlined'));
export const PortraitOutlined = loadableIcon(() => import('@mui/icons-material/PortraitOutlined'));
export const PowerOutlined = loadableIcon(() => import('@mui/icons-material/PowerOutlined'));
export const PowerSettingsNewOutlined = loadableIcon(
  () => import('@mui/icons-material/PowerSettingsNewOutlined'),
);
export const PregnantWomanOutlined = loadableIcon(
  () => import('@mui/icons-material/PregnantWomanOutlined'),
);
export const PresentToAllOutlined = loadableIcon(
  () => import('@mui/icons-material/PresentToAllOutlined'),
);
export const PrintOutlined = loadableIcon(() => import('@mui/icons-material/PrintOutlined'));
export const PriorityHighOutlined = loadableIcon(
  () => import('@mui/icons-material/PriorityHighOutlined'),
);
export const PublicOutlined = loadableIcon(() => import('@mui/icons-material/PublicOutlined'));
export const QueryBuilderOutlined = loadableIcon(
  () => import('@mui/icons-material/QueryBuilderOutlined'),
);
export const RadioOutlined = loadableIcon(() => import('@mui/icons-material/RadioOutlined'));
export const RateReviewOutlined = loadableIcon(
  () => import('@mui/icons-material/RateReviewOutlined'),
);
export const ReceiptOutlined = loadableIcon(() => import('@mui/icons-material/ReceiptOutlined'));
export const RecordVoiceOverOutlined = loadableIcon(
  () => import('@mui/icons-material/RecordVoiceOverOutlined'),
);
export const RemoveCircleOutlineOutlined = loadableIcon(
  () => import('@mui/icons-material/RemoveCircleOutlineOutlined'),
);
export const RemoveRedEyeOutlined = loadableIcon(
  () => import('@mui/icons-material/RemoveRedEyeOutlined'),
);
export const ReportOutlined = loadableIcon(() => import('@mui/icons-material/ReportOutlined'));
export const ReportProblemOutlined = loadableIcon(
  () => import('@mui/icons-material/ReportProblemOutlined'),
);
export const RestaurantOutlined = loadableIcon(
  () => import('@mui/icons-material/RestaurantOutlined'),
);
export const RingVolumeOutlined = loadableIcon(
  () => import('@mui/icons-material/RingVolumeOutlined'),
);
export const RoomOutlined = loadableIcon(() => import('@mui/icons-material/RoomOutlined'));
export const RoomServiceOutlined = loadableIcon(
  () => import('@mui/icons-material/RoomServiceOutlined'),
);
export const RouterOutlined = loadableIcon(() => import('@mui/icons-material/RouterOutlined'));
export const RowingOutlined = loadableIcon(() => import('@mui/icons-material/RowingOutlined'));
export const RssFeedOutlined = loadableIcon(() => import('@mui/icons-material/RssFeedOutlined'));
export const RvHookupOutlined = loadableIcon(() => import('@mui/icons-material/RvHookupOutlined'));
export const SatelliteOutlined = loadableIcon(
  () => import('@mui/icons-material/SatelliteOutlined'),
);
export const SaveOutlined = loadableIcon(() => import('@mui/icons-material/SaveOutlined'));
export const ScannerOutlined = loadableIcon(() => import('@mui/icons-material/ScannerOutlined'));
export const SchoolOutlined = loadableIcon(() => import('@mui/icons-material/SchoolOutlined'));
export const SdCardOutlined = loadableIcon(() => import('@mui/icons-material/SdCardOutlined'));
export const SecurityOutlined = loadableIcon(() => import('@mui/icons-material/SecurityOutlined'));
export const SentimentDissatisfiedOutlined = loadableIcon(
  () => import('@mui/icons-material/SentimentDissatisfiedOutlined'),
);
export const SentimentSatisfiedAltOutlined = loadableIcon(
  () => import('@mui/icons-material/SentimentSatisfiedAltOutlined'),
);
export const SentimentSatisfiedOutlined = loadableIcon(
  () => import('@mui/icons-material/SentimentSatisfiedOutlined'),
);
export const SentimentVeryDissatisfiedOutlined = loadableIcon(
  () => import('@mui/icons-material/SentimentVeryDissatisfiedOutlined'),
);
export const SentimentVerySatisfiedOutlined = loadableIcon(
  () => import('@mui/icons-material/SentimentVerySatisfiedOutlined'),
);
export const SettingsApplicationsOutlined = loadableIcon(
  () => import('@mui/icons-material/SettingsApplicationsOutlined'),
);
export const SettingsBrightnessOutlined = loadableIcon(
  () => import('@mui/icons-material/SettingsBrightnessOutlined'),
);
export const SettingsInputComponentOutlined = loadableIcon(
  () => import('@mui/icons-material/SettingsInputComponentOutlined'),
);
export const SettingsInputHdmiOutlined = loadableIcon(
  () => import('@mui/icons-material/SettingsInputHdmiOutlined'),
);
export const SettingsInputSvideoOutlined = loadableIcon(
  () => import('@mui/icons-material/SettingsInputSvideoOutlined'),
);
export const SettingsOutlined = loadableIcon(() => import('@mui/icons-material/SettingsOutlined'));
export const SettingsRemoteOutlined = loadableIcon(
  () => import('@mui/icons-material/SettingsRemoteOutlined'),
);
export const SettingsSystemDaydreamOutlined = loadableIcon(
  () => import('@mui/icons-material/SettingsSystemDaydreamOutlined'),
);
export const ShopOutlined = loadableIcon(() => import('@mui/icons-material/ShopOutlined'));
export const ShoppingBasketOutlined = loadableIcon(
  () => import('@mui/icons-material/ShoppingBasketOutlined'),
);
export const ShoppingCartOutlined = loadableIcon(
  () => import('@mui/icons-material/ShoppingCartOutlined'),
);
export const ShutterSpeedOutlined = loadableIcon(
  () => import('@mui/icons-material/ShutterSpeedOutlined'),
);
export const SimCardOutlined = loadableIcon(() => import('@mui/icons-material/SimCardOutlined'));
export const SingleBedOutlined = loadableIcon(
  () => import('@mui/icons-material/SingleBedOutlined'),
);
export const SmokingRoomsOutlined = loadableIcon(
  () => import('@mui/icons-material/SmokingRoomsOutlined'),
);
export const SmsOutlined = loadableIcon(() => import('@mui/icons-material/SmsOutlined'));
export const SpaOutlined = loadableIcon(() => import('@mui/icons-material/SpaOutlined'));
export const SpeakerOutlined = loadableIcon(() => import('@mui/icons-material/SpeakerOutlined'));
export const SpeedOutlined = loadableIcon(() => import('@mui/icons-material/SpeedOutlined'));
export const SportsBaseballOutlined = loadableIcon(
  () => import('@mui/icons-material/SportsBaseballOutlined'),
);
export const SportsBasketballOutlined = loadableIcon(
  () => import('@mui/icons-material/SportsBasketballOutlined'),
);
export const SportsCricketOutlined = loadableIcon(
  () => import('@mui/icons-material/SportsCricketOutlined'),
);
export const SportsEsportsOutlined = loadableIcon(
  () => import('@mui/icons-material/SportsEsportsOutlined'),
);
export const SportsFootballOutlined = loadableIcon(
  () => import('@mui/icons-material/SportsFootballOutlined'),
);
export const SportsGolfOutlined = loadableIcon(
  () => import('@mui/icons-material/SportsGolfOutlined'),
);
export const SportsHandballOutlined = loadableIcon(
  () => import('@mui/icons-material/SportsHandballOutlined'),
);
export const SportsHockeyOutlined = loadableIcon(
  () => import('@mui/icons-material/SportsHockeyOutlined'),
);
export const SportsKabaddiOutlined = loadableIcon(
  () => import('@mui/icons-material/SportsKabaddiOutlined'),
);
export const SportsMmaOutlined = loadableIcon(
  () => import('@mui/icons-material/SportsMmaOutlined'),
);
export const SportsMotorsportsOutlined = loadableIcon(
  () => import('@mui/icons-material/SportsMotorsportsOutlined'),
);
export const SportsOutlined = loadableIcon(() => import('@mui/icons-material/SportsOutlined'));
export const SportsRugbyOutlined = loadableIcon(
  () => import('@mui/icons-material/SportsRugbyOutlined'),
);
export const SportsSoccerOutlined = loadableIcon(
  () => import('@mui/icons-material/SportsSoccerOutlined'),
);
export const SportsTennisOutlined = loadableIcon(
  () => import('@mui/icons-material/SportsTennisOutlined'),
);
export const SportsVolleyballOutlined = loadableIcon(
  () => import('@mui/icons-material/SportsVolleyballOutlined'),
);
export const SquareFootOutlined = loadableIcon(
  () => import('@mui/icons-material/SquareFootOutlined'),
);
export const StarOutlined = loadableIcon(() => import('@mui/icons-material/StarOutlined'));
export const StarOutlineOutlined = loadableIcon(
  () => import('@mui/icons-material/StarOutlineOutlined'),
);
export const StarsOutlined = loadableIcon(() => import('@mui/icons-material/StarsOutlined'));
export const StorageOutlined = loadableIcon(() => import('@mui/icons-material/StorageOutlined'));
export const StorefrontOutlined = loadableIcon(
  () => import('@mui/icons-material/StorefrontOutlined'),
);
export const StoreMallDirectoryOutlined = loadableIcon(
  () => import('@mui/icons-material/StoreMallDirectoryOutlined'),
);
export const StraightenOutlined = loadableIcon(
  () => import('@mui/icons-material/StraightenOutlined'),
);
export const StyleOutlined = loadableIcon(() => import('@mui/icons-material/StyleOutlined'));
export const SubtitlesOutlined = loadableIcon(
  () => import('@mui/icons-material/SubtitlesOutlined'),
);
export const SubwayOutlined = loadableIcon(() => import('@mui/icons-material/SubwayOutlined'));
export const SupervisedUserCircleOutlined = loadableIcon(
  () => import('@mui/icons-material/SupervisedUserCircleOutlined'),
);
export const SupervisorAccountOutlined = loadableIcon(
  () => import('@mui/icons-material/SupervisorAccountOutlined'),
);
export const SurroundSoundOutlined = loadableIcon(
  () => import('@mui/icons-material/SurroundSoundOutlined'),
);
export const TableChartOutlined = loadableIcon(
  () => import('@mui/icons-material/TableChartOutlined'),
);
export const TabletAndroidOutlined = loadableIcon(
  () => import('@mui/icons-material/TabletAndroidOutlined'),
);
export const TabletMacOutlined = loadableIcon(
  () => import('@mui/icons-material/TabletMacOutlined'),
);
export const TabOutlined = loadableIcon(() => import('@mui/icons-material/TabOutlined'));
export const TagFacesOutlined = loadableIcon(() => import('@mui/icons-material/TagFacesOutlined'));
export const TerrainOutlined = loadableIcon(() => import('@mui/icons-material/TerrainOutlined'));
export const TextsmsOutlined = loadableIcon(() => import('@mui/icons-material/TextsmsOutlined'));
export const TheatersOutlined = loadableIcon(() => import('@mui/icons-material/TheatersOutlined'));
export const ThumbDownAltOutlined = loadableIcon(
  () => import('@mui/icons-material/ThumbDownAltOutlined'),
);
export const ThumbsUpDownOutlined = loadableIcon(
  () => import('@mui/icons-material/ThumbsUpDownOutlined'),
);
export const ThumbUpAltOutlined = loadableIcon(
  () => import('@mui/icons-material/ThumbUpAltOutlined'),
);
export const TimelapseOutlined = loadableIcon(
  () => import('@mui/icons-material/TimelapseOutlined'),
);
export const TimerOutlined = loadableIcon(() => import('@mui/icons-material/TimerOutlined'));
export const TimeToLeaveOutlined = loadableIcon(
  () => import('@mui/icons-material/TimeToLeaveOutlined'),
);
export const TodayOutlined = loadableIcon(() => import('@mui/icons-material/TodayOutlined'));
export const TonalityOutlined = loadableIcon(() => import('@mui/icons-material/TonalityOutlined'));
export const TouchAppOutlined = loadableIcon(() => import('@mui/icons-material/TouchAppOutlined'));
export const ToysOutlined = loadableIcon(() => import('@mui/icons-material/ToysOutlined'));
export const TrackChangesOutlined = loadableIcon(
  () => import('@mui/icons-material/TrackChangesOutlined'),
);
export const TrafficOutlined = loadableIcon(() => import('@mui/icons-material/TrafficOutlined'));
export const TrainOutlined = loadableIcon(() => import('@mui/icons-material/TrainOutlined'));
export const TramOutlined = loadableIcon(() => import('@mui/icons-material/TramOutlined'));
export const TransferWithinAStationOutlined = loadableIcon(
  () => import('@mui/icons-material/TransferWithinAStationOutlined'),
);
export const TranslateOutlined = loadableIcon(
  () => import('@mui/icons-material/TranslateOutlined'),
);
export const TurnedInNotOutlined = loadableIcon(
  () => import('@mui/icons-material/TurnedInNotOutlined'),
);
export const TurnedInOutlined = loadableIcon(() => import('@mui/icons-material/TurnedInOutlined'));
export const TvOutlined = loadableIcon(() => import('@mui/icons-material/TvOutlined'));
export const TwoWheelerOutlined = loadableIcon(
  () => import('@mui/icons-material/TwoWheelerOutlined'),
);
export const UnarchiveOutlined = loadableIcon(
  () => import('@mui/icons-material/UnarchiveOutlined'),
);
export const UsbOutlined = loadableIcon(() => import('@mui/icons-material/UsbOutlined'));
export const VerifiedUserOutlined = loadableIcon(
  () => import('@mui/icons-material/VerifiedUserOutlined'),
);
export const VideocamOutlined = loadableIcon(() => import('@mui/icons-material/VideocamOutlined'));
export const VideogameAssetOutlined = loadableIcon(
  () => import('@mui/icons-material/VideogameAssetOutlined'),
);
export const ViewQuiltOutlined = loadableIcon(
  () => import('@mui/icons-material/ViewQuiltOutlined'),
);
export const VisibilityOutlined = loadableIcon(
  () => import('@mui/icons-material/VisibilityOutlined'),
);
export const VoiceChatOutlined = loadableIcon(
  () => import('@mui/icons-material/VoiceChatOutlined'),
);
export const VpnKeyOutlined = loadableIcon(() => import('@mui/icons-material/VpnKeyOutlined'));
export const VpnLockOutlined = loadableIcon(() => import('@mui/icons-material/VpnLockOutlined'));
export const WarningOutlined = loadableIcon(() => import('@mui/icons-material/WarningOutlined'));
export const WatchLaterOutlined = loadableIcon(
  () => import('@mui/icons-material/WatchLaterOutlined'),
);
export const WatchOutlined = loadableIcon(() => import('@mui/icons-material/WatchOutlined'));
export const WavesOutlined = loadableIcon(() => import('@mui/icons-material/WavesOutlined'));
export const WbCloudyOutlined = loadableIcon(() => import('@mui/icons-material/WbCloudyOutlined'));
export const WbIncandescentOutlined = loadableIcon(
  () => import('@mui/icons-material/WbIncandescentOutlined'),
);
export const WbIridescentOutlined = loadableIcon(
  () => import('@mui/icons-material/WbIridescentOutlined'),
);
export const WbSunnyOutlined = loadableIcon(() => import('@mui/icons-material/WbSunnyOutlined'));
export const WcOutlined = loadableIcon(() => import('@mui/icons-material/WcOutlined'));
export const WebAssetOutlined = loadableIcon(() => import('@mui/icons-material/WebAssetOutlined'));
export const WebOutlined = loadableIcon(() => import('@mui/icons-material/WebOutlined'));
export const WeekendOutlined = loadableIcon(() => import('@mui/icons-material/WeekendOutlined'));
export const WhatshotOutlined = loadableIcon(() => import('@mui/icons-material/WhatshotOutlined'));
export const WhereToVoteOutlined = loadableIcon(
  () => import('@mui/icons-material/WhereToVoteOutlined'),
);
export const WifiOutlined = loadableIcon(() => import('@mui/icons-material/WifiOutlined'));
export const WorkOutlined = loadableIcon(() => import('@mui/icons-material/WorkOutlined'));
export const WorkOutlineOutlined = loadableIcon(
  () => import('@mui/icons-material/WorkOutlineOutlined'),
);
export const ZoomInOutlined = loadableIcon(() => import('@mui/icons-material/ZoomInOutlined'));
