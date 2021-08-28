import React from 'react';
import loadable from 'react-loadable';
import CachedRoundedIcon from '@material-ui/icons/CachedRounded';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  colored: {
    color: props => props.color || theme.palette.divider,
  },
}));

const LoadingIcon = () => <CachedRoundedIcon />;
/**
 * @typedef {Object} Props
 * @property {string} color
 * @property {string} className
 * @property {any} Component
 */

/** @param {Props} props **/
const Renderer = ({ color, className, Component }) => {
  const classes = useStyles({ color });
  return <Component className={`${classes.colored} ${className}`}></Component>;
};

/**
 * Creates a react-loadable  Icon component.
 * @param {() => any} importFn
 */
function loadableIcon(importFn) {
  return loadable({
    loader: importFn,
    loading: LoadingIcon,
    render(loaded, props) {
      return <Renderer {...props} Component={loaded.default} />;
    },
  });
}

/* scrapped from material-ui gh repo with
`console.log([...document.getElementsByClassName('js-navigation-open')].map( x => x.title.split('.')[0]).filter(x=>x?.includes('Outline')))`
then templated with 
regex: '(\w+)',
export const $1 = () => import('@material-ui/icons/$1')
export const $1 = loadableIcon(() => import('@material-ui/icons/$1'))
*/
export const AcUnitOutlined = loadableIcon(() => import('@material-ui/icons/AcUnitOutlined'));
export const AccessAlarmOutlined = loadableIcon(() =>
  import('@material-ui/icons/AccessAlarmOutlined'),
);
export const AccessAlarmsOutlined = loadableIcon(() =>
  import('@material-ui/icons/AccessAlarmsOutlined'),
);
export const AccessTimeOutlined = loadableIcon(() =>
  import('@material-ui/icons/AccessTimeOutlined'),
);
export const AccessibilityNewOutlined = loadableIcon(() =>
  import('@material-ui/icons/AccessibilityNewOutlined'),
);
export const AccessibilityOutlined = loadableIcon(() =>
  import('@material-ui/icons/AccessibilityOutlined'),
);
export const AccessibleForwardOutlined = loadableIcon(() =>
  import('@material-ui/icons/AccessibleForwardOutlined'),
);
export const AccessibleOutlined = loadableIcon(() =>
  import('@material-ui/icons/AccessibleOutlined'),
);
export const AccountBalanceOutlined = loadableIcon(() =>
  import('@material-ui/icons/AccountBalanceOutlined'),
);
export const AccountBalanceWalletOutlined = loadableIcon(() =>
  import('@material-ui/icons/AccountBalanceWalletOutlined'),
);
export const AccountBoxOutlined = loadableIcon(() =>
  import('@material-ui/icons/AccountBoxOutlined'),
);
export const AccountCircleOutlined = loadableIcon(() =>
  import('@material-ui/icons/AccountCircleOutlined'),
);
export const AccountTreeOutlined = loadableIcon(() =>
  import('@material-ui/icons/AccountTreeOutlined'),
);
export const AdbOutlined = loadableIcon(() => import('@material-ui/icons/AdbOutlined'));
export const AddAPhotoOutlined = loadableIcon(() => import('@material-ui/icons/AddAPhotoOutlined'));
export const AddAlarmOutlined = loadableIcon(() => import('@material-ui/icons/AddAlarmOutlined'));
export const AddAlertOutlined = loadableIcon(() => import('@material-ui/icons/AddAlertOutlined'));
export const AddBoxOutlined = loadableIcon(() => import('@material-ui/icons/AddBoxOutlined'));
export const AddCircleOutline = loadableIcon(() => import('@material-ui/icons/AddCircleOutline'));
export const AddCircleOutlineOutlined = loadableIcon(() =>
  import('@material-ui/icons/AddCircleOutlineOutlined'),
);
export const AddCircleOutlineRounded = loadableIcon(() =>
  import('@material-ui/icons/AddCircleOutlineRounded'),
);
export const AddCircleOutlineSharp = loadableIcon(() =>
  import('@material-ui/icons/AddCircleOutlineSharp'),
);
export const AddCircleOutlineTwoTone = loadableIcon(() =>
  import('@material-ui/icons/AddCircleOutlineTwoTone'),
);
export const AddCircleOutlined = loadableIcon(() => import('@material-ui/icons/AddCircleOutlined'));
export const AddCommentOutlined = loadableIcon(() =>
  import('@material-ui/icons/AddCommentOutlined'),
);
export const AddIcCallOutlined = loadableIcon(() => import('@material-ui/icons/AddIcCallOutlined'));
export const AddLocationOutlined = loadableIcon(() =>
  import('@material-ui/icons/AddLocationOutlined'),
);
export const AddOutlined = loadableIcon(() => import('@material-ui/icons/AddOutlined'));
export const AddPhotoAlternateOutlined = loadableIcon(() =>
  import('@material-ui/icons/AddPhotoAlternateOutlined'),
);
export const AddShoppingCartOutlined = loadableIcon(() =>
  import('@material-ui/icons/AddShoppingCartOutlined'),
);
export const AddToHomeScreenOutlined = loadableIcon(() =>
  import('@material-ui/icons/AddToHomeScreenOutlined'),
);
export const AddToPhotosOutlined = loadableIcon(() =>
  import('@material-ui/icons/AddToPhotosOutlined'),
);
export const AddToQueueOutlined = loadableIcon(() =>
  import('@material-ui/icons/AddToQueueOutlined'),
);
export const AdjustOutlined = loadableIcon(() => import('@material-ui/icons/AdjustOutlined'));
export const AirlineSeatFlatAngledOutlined = loadableIcon(() =>
  import('@material-ui/icons/AirlineSeatFlatAngledOutlined'),
);
export const AirlineSeatFlatOutlined = loadableIcon(() =>
  import('@material-ui/icons/AirlineSeatFlatOutlined'),
);
export const AirlineSeatIndividualSuiteOutlined = loadableIcon(() =>
  import('@material-ui/icons/AirlineSeatIndividualSuiteOutlined'),
);
export const AirlineSeatLegroomExtraOutlined = loadableIcon(() =>
  import('@material-ui/icons/AirlineSeatLegroomExtraOutlined'),
);
export const AirlineSeatLegroomNormalOutlined = loadableIcon(() =>
  import('@material-ui/icons/AirlineSeatLegroomNormalOutlined'),
);
export const AirlineSeatLegroomReducedOutlined = loadableIcon(() =>
  import('@material-ui/icons/AirlineSeatLegroomReducedOutlined'),
);
export const AirlineSeatReclineExtraOutlined = loadableIcon(() =>
  import('@material-ui/icons/AirlineSeatReclineExtraOutlined'),
);
export const AirlineSeatReclineNormalOutlined = loadableIcon(() =>
  import('@material-ui/icons/AirlineSeatReclineNormalOutlined'),
);
export const AirplanemodeActiveOutlined = loadableIcon(() =>
  import('@material-ui/icons/AirplanemodeActiveOutlined'),
);
export const AirplanemodeInactiveOutlined = loadableIcon(() =>
  import('@material-ui/icons/AirplanemodeInactiveOutlined'),
);
export const AirplayOutlined = loadableIcon(() => import('@material-ui/icons/AirplayOutlined'));
export const AirportShuttleOutlined = loadableIcon(() =>
  import('@material-ui/icons/AirportShuttleOutlined'),
);
export const AlarmAddOutlined = loadableIcon(() => import('@material-ui/icons/AlarmAddOutlined'));
export const AlarmOffOutlined = loadableIcon(() => import('@material-ui/icons/AlarmOffOutlined'));
export const AlarmOnOutlined = loadableIcon(() => import('@material-ui/icons/AlarmOnOutlined'));
export const AlarmOutlined = loadableIcon(() => import('@material-ui/icons/AlarmOutlined'));
export const AlbumOutlined = loadableIcon(() => import('@material-ui/icons/AlbumOutlined'));
export const AllInboxOutlined = loadableIcon(() => import('@material-ui/icons/AllInboxOutlined'));
export const AllInclusiveOutlined = loadableIcon(() =>
  import('@material-ui/icons/AllInclusiveOutlined'),
);
export const AllOutOutlined = loadableIcon(() => import('@material-ui/icons/AllOutOutlined'));
export const AlternateEmailOutlined = loadableIcon(() =>
  import('@material-ui/icons/AlternateEmailOutlined'),
);
export const AmpStoriesOutlined = loadableIcon(() =>
  import('@material-ui/icons/AmpStoriesOutlined'),
);
export const AndroidOutlined = loadableIcon(() => import('@material-ui/icons/AndroidOutlined'));
export const AnnouncementOutlined = loadableIcon(() =>
  import('@material-ui/icons/AnnouncementOutlined'),
);
export const ApartmentOutlined = loadableIcon(() => import('@material-ui/icons/ApartmentOutlined'));
export const AppsOutlined = loadableIcon(() => import('@material-ui/icons/AppsOutlined'));
export const ArchiveOutlined = loadableIcon(() => import('@material-ui/icons/ArchiveOutlined'));
export const ArrowBackIosOutlined = loadableIcon(() =>
  import('@material-ui/icons/ArrowBackIosOutlined'),
);
export const ArrowBackOutlined = loadableIcon(() => import('@material-ui/icons/ArrowBackOutlined'));
export const ArrowDownwardOutlined = loadableIcon(() =>
  import('@material-ui/icons/ArrowDownwardOutlined'),
);
export const ArrowDropDownCircleOutlined = loadableIcon(() =>
  import('@material-ui/icons/ArrowDropDownCircleOutlined'),
);
export const ArrowDropDownOutlined = loadableIcon(() =>
  import('@material-ui/icons/ArrowDropDownOutlined'),
);
export const ArrowDropUpOutlined = loadableIcon(() =>
  import('@material-ui/icons/ArrowDropUpOutlined'),
);
export const ArrowForwardIosOutlined = loadableIcon(() =>
  import('@material-ui/icons/ArrowForwardIosOutlined'),
);
export const ArrowForwardOutlined = loadableIcon(() =>
  import('@material-ui/icons/ArrowForwardOutlined'),
);
export const ArrowLeftOutlined = loadableIcon(() => import('@material-ui/icons/ArrowLeftOutlined'));
export const ArrowRightAltOutlined = loadableIcon(() =>
  import('@material-ui/icons/ArrowRightAltOutlined'),
);
export const ArrowRightOutlined = loadableIcon(() =>
  import('@material-ui/icons/ArrowRightOutlined'),
);
export const ArrowUpwardOutlined = loadableIcon(() =>
  import('@material-ui/icons/ArrowUpwardOutlined'),
);
export const ArtTrackOutlined = loadableIcon(() => import('@material-ui/icons/ArtTrackOutlined'));
export const AspectRatioOutlined = loadableIcon(() =>
  import('@material-ui/icons/AspectRatioOutlined'),
);
export const AssessmentOutlined = loadableIcon(() =>
  import('@material-ui/icons/AssessmentOutlined'),
);
export const AssignmentIndOutlined = loadableIcon(() =>
  import('@material-ui/icons/AssignmentIndOutlined'),
);
export const AssignmentLateOutlined = loadableIcon(() =>
  import('@material-ui/icons/AssignmentLateOutlined'),
);
export const AssignmentOutlined = loadableIcon(() =>
  import('@material-ui/icons/AssignmentOutlined'),
);
export const AssignmentReturnOutlined = loadableIcon(() =>
  import('@material-ui/icons/AssignmentReturnOutlined'),
);
export const AssignmentReturnedOutlined = loadableIcon(() =>
  import('@material-ui/icons/AssignmentReturnedOutlined'),
);
export const AssignmentTurnedInOutlined = loadableIcon(() =>
  import('@material-ui/icons/AssignmentTurnedInOutlined'),
);
export const AssistantOutlined = loadableIcon(() => import('@material-ui/icons/AssistantOutlined'));
export const AssistantPhotoOutlined = loadableIcon(() =>
  import('@material-ui/icons/AssistantPhotoOutlined'),
);
export const AtmOutlined = loadableIcon(() => import('@material-ui/icons/AtmOutlined'));
export const AttachFileOutlined = loadableIcon(() =>
  import('@material-ui/icons/AttachFileOutlined'),
);
export const AttachMoneyOutlined = loadableIcon(() =>
  import('@material-ui/icons/AttachMoneyOutlined'),
);
export const AttachmentOutlined = loadableIcon(() =>
  import('@material-ui/icons/AttachmentOutlined'),
);
export const AudiotrackOutlined = loadableIcon(() =>
  import('@material-ui/icons/AudiotrackOutlined'),
);
export const AutorenewOutlined = loadableIcon(() => import('@material-ui/icons/AutorenewOutlined'));
export const AvTimerOutlined = loadableIcon(() => import('@material-ui/icons/AvTimerOutlined'));
export const BackspaceOutlined = loadableIcon(() => import('@material-ui/icons/BackspaceOutlined'));
export const BackupOutlined = loadableIcon(() => import('@material-ui/icons/BackupOutlined'));
export const BallotOutlined = loadableIcon(() => import('@material-ui/icons/BallotOutlined'));
export const BarChartOutlined = loadableIcon(() => import('@material-ui/icons/BarChartOutlined'));
export const BathtubOutlined = loadableIcon(() => import('@material-ui/icons/BathtubOutlined'));
export const Battery20Outlined = loadableIcon(() => import('@material-ui/icons/Battery20Outlined'));
export const Battery30Outlined = loadableIcon(() => import('@material-ui/icons/Battery30Outlined'));
export const Battery50Outlined = loadableIcon(() => import('@material-ui/icons/Battery50Outlined'));
export const Battery60Outlined = loadableIcon(() => import('@material-ui/icons/Battery60Outlined'));
export const Battery80Outlined = loadableIcon(() => import('@material-ui/icons/Battery80Outlined'));
export const Battery90Outlined = loadableIcon(() => import('@material-ui/icons/Battery90Outlined'));
export const BatteryAlertOutlined = loadableIcon(() =>
  import('@material-ui/icons/BatteryAlertOutlined'),
);
export const BatteryCharging20Outlined = loadableIcon(() =>
  import('@material-ui/icons/BatteryCharging20Outlined'),
);
export const BatteryCharging30Outlined = loadableIcon(() =>
  import('@material-ui/icons/BatteryCharging30Outlined'),
);
export const BatteryCharging50Outlined = loadableIcon(() =>
  import('@material-ui/icons/BatteryCharging50Outlined'),
);
export const BatteryCharging60Outlined = loadableIcon(() =>
  import('@material-ui/icons/BatteryCharging60Outlined'),
);
export const BatteryCharging80Outlined = loadableIcon(() =>
  import('@material-ui/icons/BatteryCharging80Outlined'),
);
export const BatteryCharging90Outlined = loadableIcon(() =>
  import('@material-ui/icons/BatteryCharging90Outlined'),
);
export const BatteryChargingFullOutlined = loadableIcon(() =>
  import('@material-ui/icons/BatteryChargingFullOutlined'),
);
export const BatteryFullOutlined = loadableIcon(() =>
  import('@material-ui/icons/BatteryFullOutlined'),
);
export const BatteryStdOutlined = loadableIcon(() =>
  import('@material-ui/icons/BatteryStdOutlined'),
);
export const BatteryUnknownOutlined = loadableIcon(() =>
  import('@material-ui/icons/BatteryUnknownOutlined'),
);
export const BeachAccessOutlined = loadableIcon(() =>
  import('@material-ui/icons/BeachAccessOutlined'),
);
export const BeenhereOutlined = loadableIcon(() => import('@material-ui/icons/BeenhereOutlined'));
export const BlockOutlined = loadableIcon(() => import('@material-ui/icons/BlockOutlined'));
export const BluetoothAudioOutlined = loadableIcon(() =>
  import('@material-ui/icons/BluetoothAudioOutlined'),
);
export const BluetoothConnectedOutlined = loadableIcon(() =>
  import('@material-ui/icons/BluetoothConnectedOutlined'),
);
export const BluetoothDisabledOutlined = loadableIcon(() =>
  import('@material-ui/icons/BluetoothDisabledOutlined'),
);
export const BluetoothOutlined = loadableIcon(() => import('@material-ui/icons/BluetoothOutlined'));
export const BluetoothSearchingOutlined = loadableIcon(() =>
  import('@material-ui/icons/BluetoothSearchingOutlined'),
);
export const BlurCircularOutlined = loadableIcon(() =>
  import('@material-ui/icons/BlurCircularOutlined'),
);
export const BlurLinearOutlined = loadableIcon(() =>
  import('@material-ui/icons/BlurLinearOutlined'),
);
export const BlurOffOutlined = loadableIcon(() => import('@material-ui/icons/BlurOffOutlined'));
export const BlurOnOutlined = loadableIcon(() => import('@material-ui/icons/BlurOnOutlined'));
export const BookOutlined = loadableIcon(() => import('@material-ui/icons/BookOutlined'));
export const BookmarkBorderOutlined = loadableIcon(() =>
  import('@material-ui/icons/BookmarkBorderOutlined'),
);
export const BookmarkOutlined = loadableIcon(() => import('@material-ui/icons/BookmarkOutlined'));
export const BookmarksOutlined = loadableIcon(() => import('@material-ui/icons/BookmarksOutlined'));
export const BorderAllOutlined = loadableIcon(() => import('@material-ui/icons/BorderAllOutlined'));
export const BorderBottomOutlined = loadableIcon(() =>
  import('@material-ui/icons/BorderBottomOutlined'),
);
export const BorderClearOutlined = loadableIcon(() =>
  import('@material-ui/icons/BorderClearOutlined'),
);
export const BorderColorOutlined = loadableIcon(() =>
  import('@material-ui/icons/BorderColorOutlined'),
);
export const BorderHorizontalOutlined = loadableIcon(() =>
  import('@material-ui/icons/BorderHorizontalOutlined'),
);
export const BorderInnerOutlined = loadableIcon(() =>
  import('@material-ui/icons/BorderInnerOutlined'),
);
export const BorderLeftOutlined = loadableIcon(() =>
  import('@material-ui/icons/BorderLeftOutlined'),
);
export const BorderOuterOutlined = loadableIcon(() =>
  import('@material-ui/icons/BorderOuterOutlined'),
);
export const BorderRightOutlined = loadableIcon(() =>
  import('@material-ui/icons/BorderRightOutlined'),
);
export const BorderStyleOutlined = loadableIcon(() =>
  import('@material-ui/icons/BorderStyleOutlined'),
);
export const BorderTopOutlined = loadableIcon(() => import('@material-ui/icons/BorderTopOutlined'));
export const BorderVerticalOutlined = loadableIcon(() =>
  import('@material-ui/icons/BorderVerticalOutlined'),
);
export const BrandingWatermarkOutlined = loadableIcon(() =>
  import('@material-ui/icons/BrandingWatermarkOutlined'),
);
export const Brightness1Outlined = loadableIcon(() =>
  import('@material-ui/icons/Brightness1Outlined'),
);
export const Brightness2Outlined = loadableIcon(() =>
  import('@material-ui/icons/Brightness2Outlined'),
);
export const Brightness3Outlined = loadableIcon(() =>
  import('@material-ui/icons/Brightness3Outlined'),
);
export const Brightness4Outlined = loadableIcon(() =>
  import('@material-ui/icons/Brightness4Outlined'),
);
export const Brightness5Outlined = loadableIcon(() =>
  import('@material-ui/icons/Brightness5Outlined'),
);
export const Brightness6Outlined = loadableIcon(() =>
  import('@material-ui/icons/Brightness6Outlined'),
);
export const Brightness7Outlined = loadableIcon(() =>
  import('@material-ui/icons/Brightness7Outlined'),
);
export const BrightnessAutoOutlined = loadableIcon(() =>
  import('@material-ui/icons/BrightnessAutoOutlined'),
);
export const BrightnessHighOutlined = loadableIcon(() =>
  import('@material-ui/icons/BrightnessHighOutlined'),
);
export const BrightnessLowOutlined = loadableIcon(() =>
  import('@material-ui/icons/BrightnessLowOutlined'),
);
export const BrightnessMediumOutlined = loadableIcon(() =>
  import('@material-ui/icons/BrightnessMediumOutlined'),
);
export const BrokenImageOutlined = loadableIcon(() =>
  import('@material-ui/icons/BrokenImageOutlined'),
);
export const BrushOutlined = loadableIcon(() => import('@material-ui/icons/BrushOutlined'));
export const BubbleChartOutlined = loadableIcon(() =>
  import('@material-ui/icons/BubbleChartOutlined'),
);
export const BugReportOutlined = loadableIcon(() => import('@material-ui/icons/BugReportOutlined'));
export const BuildOutlined = loadableIcon(() => import('@material-ui/icons/BuildOutlined'));
export const BurstModeOutlined = loadableIcon(() => import('@material-ui/icons/BurstModeOutlined'));
export const BusinessCenterOutlined = loadableIcon(() =>
  import('@material-ui/icons/BusinessCenterOutlined'),
);
export const BusinessOutlined = loadableIcon(() => import('@material-ui/icons/BusinessOutlined'));
export const CachedOutlined = loadableIcon(() => import('@material-ui/icons/CachedOutlined'));
export const CakeOutlined = loadableIcon(() => import('@material-ui/icons/CakeOutlined'));
export const CalendarTodayOutlined = loadableIcon(() =>
  import('@material-ui/icons/CalendarTodayOutlined'),
);
export const CalendarViewDayOutlined = loadableIcon(() =>
  import('@material-ui/icons/CalendarViewDayOutlined'),
);
export const CallEndOutlined = loadableIcon(() => import('@material-ui/icons/CallEndOutlined'));
export const CallMadeOutlined = loadableIcon(() => import('@material-ui/icons/CallMadeOutlined'));
export const CallMergeOutlined = loadableIcon(() => import('@material-ui/icons/CallMergeOutlined'));
export const CallMissedOutgoingOutlined = loadableIcon(() =>
  import('@material-ui/icons/CallMissedOutgoingOutlined'),
);
export const CallMissedOutlined = loadableIcon(() =>
  import('@material-ui/icons/CallMissedOutlined'),
);
export const CallOutlined = loadableIcon(() => import('@material-ui/icons/CallOutlined'));
export const CallReceivedOutlined = loadableIcon(() =>
  import('@material-ui/icons/CallReceivedOutlined'),
);
export const CallSplitOutlined = loadableIcon(() => import('@material-ui/icons/CallSplitOutlined'));
export const CallToActionOutlined = loadableIcon(() =>
  import('@material-ui/icons/CallToActionOutlined'),
);
export const CameraAltOutlined = loadableIcon(() => import('@material-ui/icons/CameraAltOutlined'));
export const CameraEnhanceOutlined = loadableIcon(() =>
  import('@material-ui/icons/CameraEnhanceOutlined'),
);
export const CameraFrontOutlined = loadableIcon(() =>
  import('@material-ui/icons/CameraFrontOutlined'),
);
export const CameraOutlined = loadableIcon(() => import('@material-ui/icons/CameraOutlined'));
export const CameraRearOutlined = loadableIcon(() =>
  import('@material-ui/icons/CameraRearOutlined'),
);
export const CameraRollOutlined = loadableIcon(() =>
  import('@material-ui/icons/CameraRollOutlined'),
);
export const CancelOutlined = loadableIcon(() => import('@material-ui/icons/CancelOutlined'));
export const CancelPresentationOutlined = loadableIcon(() =>
  import('@material-ui/icons/CancelPresentationOutlined'),
);
export const CancelScheduleSendOutlined = loadableIcon(() =>
  import('@material-ui/icons/CancelScheduleSendOutlined'),
);
export const CardGiftcardOutlined = loadableIcon(() =>
  import('@material-ui/icons/CardGiftcardOutlined'),
);
export const CardMembershipOutlined = loadableIcon(() =>
  import('@material-ui/icons/CardMembershipOutlined'),
);
export const CardTravelOutlined = loadableIcon(() =>
  import('@material-ui/icons/CardTravelOutlined'),
);
export const CasinoOutlined = loadableIcon(() => import('@material-ui/icons/CasinoOutlined'));
export const CastConnectedOutlined = loadableIcon(() =>
  import('@material-ui/icons/CastConnectedOutlined'),
);
export const CastForEducationOutlined = loadableIcon(() =>
  import('@material-ui/icons/CastForEducationOutlined'),
);
export const CastOutlined = loadableIcon(() => import('@material-ui/icons/CastOutlined'));
export const CategoryOutlined = loadableIcon(() => import('@material-ui/icons/CategoryOutlined'));
export const CellWifiOutlined = loadableIcon(() => import('@material-ui/icons/CellWifiOutlined'));
export const CenterFocusStrongOutlined = loadableIcon(() =>
  import('@material-ui/icons/CenterFocusStrongOutlined'),
);
export const CenterFocusWeakOutlined = loadableIcon(() =>
  import('@material-ui/icons/CenterFocusWeakOutlined'),
);
export const ChangeHistoryOutlined = loadableIcon(() =>
  import('@material-ui/icons/ChangeHistoryOutlined'),
);
export const ChatBubbleOutline = loadableIcon(() => import('@material-ui/icons/ChatBubbleOutline'));
export const ChatBubbleOutlineOutlined = loadableIcon(() =>
  import('@material-ui/icons/ChatBubbleOutlineOutlined'),
);
export const ChatBubbleOutlineRounded = loadableIcon(() =>
  import('@material-ui/icons/ChatBubbleOutlineRounded'),
);
export const ChatBubbleOutlineSharp = loadableIcon(() =>
  import('@material-ui/icons/ChatBubbleOutlineSharp'),
);
export const ChatBubbleOutlineTwoTone = loadableIcon(() =>
  import('@material-ui/icons/ChatBubbleOutlineTwoTone'),
);
export const ChatBubbleOutlined = loadableIcon(() =>
  import('@material-ui/icons/ChatBubbleOutlined'),
);
export const ChatOutlined = loadableIcon(() => import('@material-ui/icons/ChatOutlined'));
export const CheckBoxOutlineBlank = loadableIcon(() =>
  import('@material-ui/icons/CheckBoxOutlineBlank'),
);
export const CheckBoxOutlineBlankOutlined = loadableIcon(() =>
  import('@material-ui/icons/CheckBoxOutlineBlankOutlined'),
);
export const CheckBoxOutlineBlankRounded = loadableIcon(() =>
  import('@material-ui/icons/CheckBoxOutlineBlankRounded'),
);
export const CheckBoxOutlineBlankSharp = loadableIcon(() =>
  import('@material-ui/icons/CheckBoxOutlineBlankSharp'),
);
export const CheckBoxOutlineBlankTwoTone = loadableIcon(() =>
  import('@material-ui/icons/CheckBoxOutlineBlankTwoTone'),
);
export const CheckBoxOutlined = loadableIcon(() => import('@material-ui/icons/CheckBoxOutlined'));
export const CheckCircleOutline = loadableIcon(() =>
  import('@material-ui/icons/CheckCircleOutline'),
);
export const CheckCircleOutlineOutlined = loadableIcon(() =>
  import('@material-ui/icons/CheckCircleOutlineOutlined'),
);
export const CheckCircleOutlineRounded = loadableIcon(() =>
  import('@material-ui/icons/CheckCircleOutlineRounded'),
);
export const CheckCircleOutlineSharp = loadableIcon(() =>
  import('@material-ui/icons/CheckCircleOutlineSharp'),
);
export const CheckCircleOutlineTwoTone = loadableIcon(() =>
  import('@material-ui/icons/CheckCircleOutlineTwoTone'),
);
export const CheckCircleOutlined = loadableIcon(() =>
  import('@material-ui/icons/CheckCircleOutlined'),
);
export const CheckOutlined = loadableIcon(() => import('@material-ui/icons/CheckOutlined'));
export const Default = loadableIcon(() => import('@material-ui/icons/BlockOutlined'));
