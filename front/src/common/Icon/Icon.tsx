import React, { Suspense } from 'react';
import CachedRoundedIcon from '@material-ui/icons/CachedRounded';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  colored: {
    color: ({ color }) => color || theme.palette.divider,
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
const Renderer = ({ color, className, Component }: Props) => {
  const classes = useStyles({ color });
  return <Component className={`${classes.colored} ${className}`}></Component>;
};

/**
 * Creates a react-loadable  Icon component.
 * @param {() => any} importFn
 */
function loadableIcon(importFn: () => any) {
  const Inner = React.lazy(async () => {
    const component = await importFn();
    return {
      default: props => {
        return <Renderer {...props} Component={component.default} />;
      },
    };
  });
  return props => (
    <Suspense fallback={<LoadingIcon />}>
      <Inner {...props} />
    </Suspense>
  );
}

/* scrapped from material-ui gh repo with
`console.log([...document.getElementsByClassName('js-navigation-open')].map( x => x.title.split('.')[0]).filter(x=>x?.includes('Outline')))`
then templated with 
regex: '(\w+)',
export const $1 = () => import('@material-ui/icons/$1')
export const $1 = loadableIcon(() => import('@material-ui/icons/$1'))
*/
export const Default = loadableIcon(() => import('@material-ui/icons/BlockOutlined'));
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
export const ChevronLeftOutlined = loadableIcon(() =>
  import('@material-ui/icons/ChevronLeftOutlined'),
);
export const ChevronRightOutlined = loadableIcon(() =>
  import('@material-ui/icons/ChevronRightOutlined'),
);
export const ChildCareOutlined = loadableIcon(() => import('@material-ui/icons/ChildCareOutlined'));
export const ChildFriendlyOutlined = loadableIcon(() =>
  import('@material-ui/icons/ChildFriendlyOutlined'),
);
export const ChromeReaderModeOutlined = loadableIcon(() =>
  import('@material-ui/icons/ChromeReaderModeOutlined'),
);
export const ClassOutlined = loadableIcon(() => import('@material-ui/icons/ClassOutlined'));
export const ClearAllOutlined = loadableIcon(() => import('@material-ui/icons/ClearAllOutlined'));
export const ClearOutlined = loadableIcon(() => import('@material-ui/icons/ClearOutlined'));
export const ClosedCaptionOutlined = loadableIcon(() =>
  import('@material-ui/icons/ClosedCaptionOutlined'),
);
export const CloseOutlined = loadableIcon(() => import('@material-ui/icons/CloseOutlined'));
export const CloudCircleOutlined = loadableIcon(() =>
  import('@material-ui/icons/CloudCircleOutlined'),
);
export const CloudDoneOutlined = loadableIcon(() => import('@material-ui/icons/CloudDoneOutlined'));
export const CloudDownloadOutlined = loadableIcon(() =>
  import('@material-ui/icons/CloudDownloadOutlined'),
);
export const CloudOffOutlined = loadableIcon(() => import('@material-ui/icons/CloudOffOutlined'));
export const CloudOutlined = loadableIcon(() => import('@material-ui/icons/CloudOutlined'));
export const CloudQueueOutlined = loadableIcon(() =>
  import('@material-ui/icons/CloudQueueOutlined'),
);
export const CloudUploadOutlined = loadableIcon(() =>
  import('@material-ui/icons/CloudUploadOutlined'),
);
export const CodeOutlined = loadableIcon(() => import('@material-ui/icons/CodeOutlined'));
export const CollectionsBookmarkOutlined = loadableIcon(() =>
  import('@material-ui/icons/CollectionsBookmarkOutlined'),
);
export const CollectionsOutlined = loadableIcon(() =>
  import('@material-ui/icons/CollectionsOutlined'),
);
export const ColorizeOutlined = loadableIcon(() => import('@material-ui/icons/ColorizeOutlined'));
export const ColorLensOutlined = loadableIcon(() => import('@material-ui/icons/ColorLensOutlined'));
export const CommentOutlined = loadableIcon(() => import('@material-ui/icons/CommentOutlined'));
export const CommuteOutlined = loadableIcon(() => import('@material-ui/icons/CommuteOutlined'));
export const CompareArrowsOutlined = loadableIcon(() =>
  import('@material-ui/icons/CompareArrowsOutlined'),
);
export const CompareOutlined = loadableIcon(() => import('@material-ui/icons/CompareOutlined'));
export const CompassCalibrationOutlined = loadableIcon(() =>
  import('@material-ui/icons/CompassCalibrationOutlined'),
);
export const ComputerOutlined = loadableIcon(() => import('@material-ui/icons/ComputerOutlined'));
export const ConfirmationNumberOutlined = loadableIcon(() =>
  import('@material-ui/icons/ConfirmationNumberOutlined'),
);
export const ContactlessOutlined = loadableIcon(() =>
  import('@material-ui/icons/ContactlessOutlined'),
);
export const ContactMailOutlined = loadableIcon(() =>
  import('@material-ui/icons/ContactMailOutlined'),
);
export const ContactPhoneOutlined = loadableIcon(() =>
  import('@material-ui/icons/ContactPhoneOutlined'),
);
export const ContactsOutlined = loadableIcon(() => import('@material-ui/icons/ContactsOutlined'));
export const ContactSupportOutlined = loadableIcon(() =>
  import('@material-ui/icons/ContactSupportOutlined'),
);
export const ControlCameraOutlined = loadableIcon(() =>
  import('@material-ui/icons/ControlCameraOutlined'),
);
export const ControlPointDuplicateOutlined = loadableIcon(() =>
  import('@material-ui/icons/ControlPointDuplicateOutlined'),
);
export const ControlPointOutlined = loadableIcon(() =>
  import('@material-ui/icons/ControlPointOutlined'),
);
export const CopyrightOutlined = loadableIcon(() => import('@material-ui/icons/CopyrightOutlined'));
export const CreateNewFolderOutlined = loadableIcon(() =>
  import('@material-ui/icons/CreateNewFolderOutlined'),
);
export const CreateOutlined = loadableIcon(() => import('@material-ui/icons/CreateOutlined'));
export const CreditCardOutlined = loadableIcon(() =>
  import('@material-ui/icons/CreditCardOutlined'),
);
export const Crop169Outlined = loadableIcon(() => import('@material-ui/icons/Crop169Outlined'));
export const Crop32Outlined = loadableIcon(() => import('@material-ui/icons/Crop32Outlined'));
export const Crop54Outlined = loadableIcon(() => import('@material-ui/icons/Crop54Outlined'));
export const Crop75Outlined = loadableIcon(() => import('@material-ui/icons/Crop75Outlined'));
export const CropDinOutlined = loadableIcon(() => import('@material-ui/icons/CropDinOutlined'));
export const CropFreeOutlined = loadableIcon(() => import('@material-ui/icons/CropFreeOutlined'));
export const CropLandscapeOutlined = loadableIcon(() =>
  import('@material-ui/icons/CropLandscapeOutlined'),
);
export const CropOriginalOutlined = loadableIcon(() =>
  import('@material-ui/icons/CropOriginalOutlined'),
);
export const CropOutlined = loadableIcon(() => import('@material-ui/icons/CropOutlined'));
export const CropPortraitOutlined = loadableIcon(() =>
  import('@material-ui/icons/CropPortraitOutlined'),
);
export const CropRotateOutlined = loadableIcon(() =>
  import('@material-ui/icons/CropRotateOutlined'),
);
export const CropSquareOutlined = loadableIcon(() =>
  import('@material-ui/icons/CropSquareOutlined'),
);
export const DashboardOutlined = loadableIcon(() => import('@material-ui/icons/DashboardOutlined'));
export const DataUsageOutlined = loadableIcon(() => import('@material-ui/icons/DataUsageOutlined'));
export const DateRangeOutlined = loadableIcon(() => import('@material-ui/icons/DateRangeOutlined'));
export const DeckOutlined = loadableIcon(() => import('@material-ui/icons/DeckOutlined'));
export const DehazeOutlined = loadableIcon(() => import('@material-ui/icons/DehazeOutlined'));
export const DeleteForeverOutlined = loadableIcon(() =>
  import('@material-ui/icons/DeleteForeverOutlined'),
);
export const DeleteOutlined = loadableIcon(() => import('@material-ui/icons/DeleteOutlined'));
export const DeleteOutlineOutlined = loadableIcon(() =>
  import('@material-ui/icons/DeleteOutlineOutlined'),
);
export const DeleteSweepOutlined = loadableIcon(() =>
  import('@material-ui/icons/DeleteSweepOutlined'),
);
export const DepartureBoardOutlined = loadableIcon(() =>
  import('@material-ui/icons/DepartureBoardOutlined'),
);
export const DescriptionOutlined = loadableIcon(() =>
  import('@material-ui/icons/DescriptionOutlined'),
);
export const DesktopAccessDisabledOutlined = loadableIcon(() =>
  import('@material-ui/icons/DesktopAccessDisabledOutlined'),
);
export const DesktopMacOutlined = loadableIcon(() =>
  import('@material-ui/icons/DesktopMacOutlined'),
);
export const DesktopWindowsOutlined = loadableIcon(() =>
  import('@material-ui/icons/DesktopWindowsOutlined'),
);
export const DetailsOutlined = loadableIcon(() => import('@material-ui/icons/DetailsOutlined'));
export const DeveloperBoardOutlined = loadableIcon(() =>
  import('@material-ui/icons/DeveloperBoardOutlined'),
);
export const DeveloperModeOutlined = loadableIcon(() =>
  import('@material-ui/icons/DeveloperModeOutlined'),
);
export const DeviceHubOutlined = loadableIcon(() => import('@material-ui/icons/DeviceHubOutlined'));
export const DevicesOtherOutlined = loadableIcon(() =>
  import('@material-ui/icons/DevicesOtherOutlined'),
);
export const DevicesOutlined = loadableIcon(() => import('@material-ui/icons/DevicesOutlined'));
export const DeviceUnknownOutlined = loadableIcon(() =>
  import('@material-ui/icons/DeviceUnknownOutlined'),
);
export const DialerSipOutlined = loadableIcon(() => import('@material-ui/icons/DialerSipOutlined'));
export const DialpadOutlined = loadableIcon(() => import('@material-ui/icons/DialpadOutlined'));
export const DirectionsBikeOutlined = loadableIcon(() =>
  import('@material-ui/icons/DirectionsBikeOutlined'),
);
export const DirectionsBoatOutlined = loadableIcon(() =>
  import('@material-ui/icons/DirectionsBoatOutlined'),
);
export const DirectionsBusOutlined = loadableIcon(() =>
  import('@material-ui/icons/DirectionsBusOutlined'),
);
export const DirectionsCarOutlined = loadableIcon(() =>
  import('@material-ui/icons/DirectionsCarOutlined'),
);
export const DirectionsOutlined = loadableIcon(() =>
  import('@material-ui/icons/DirectionsOutlined'),
);
export const DirectionsRailwayOutlined = loadableIcon(() =>
  import('@material-ui/icons/DirectionsRailwayOutlined'),
);
export const DirectionsRunOutlined = loadableIcon(() =>
  import('@material-ui/icons/DirectionsRunOutlined'),
);
export const DirectionsSubwayOutlined = loadableIcon(() =>
  import('@material-ui/icons/DirectionsSubwayOutlined'),
);
export const DirectionsTransitOutlined = loadableIcon(() =>
  import('@material-ui/icons/DirectionsTransitOutlined'),
);
export const DirectionsWalkOutlined = loadableIcon(() =>
  import('@material-ui/icons/DirectionsWalkOutlined'),
);
export const DiscFullOutlined = loadableIcon(() => import('@material-ui/icons/DiscFullOutlined'));
export const DnsOutlined = loadableIcon(() => import('@material-ui/icons/DnsOutlined'));
export const DockOutlined = loadableIcon(() => import('@material-ui/icons/DockOutlined'));
export const DomainDisabledOutlined = loadableIcon(() =>
  import('@material-ui/icons/DomainDisabledOutlined'),
);
export const DomainOutlined = loadableIcon(() => import('@material-ui/icons/DomainOutlined'));
export const DoneAllOutlined = loadableIcon(() => import('@material-ui/icons/DoneAllOutlined'));
export const DoneOutlined = loadableIcon(() => import('@material-ui/icons/DoneOutlined'));
export const DoneOutlineOutlined = loadableIcon(() =>
  import('@material-ui/icons/DoneOutlineOutlined'),
);
export const DonutLargeOutlined = loadableIcon(() =>
  import('@material-ui/icons/DonutLargeOutlined'),
);
export const DonutSmallOutlined = loadableIcon(() =>
  import('@material-ui/icons/DonutSmallOutlined'),
);
export const DoubleArrowOutlined = loadableIcon(() =>
  import('@material-ui/icons/DoubleArrowOutlined'),
);
export const DraftsOutlined = loadableIcon(() => import('@material-ui/icons/DraftsOutlined'));
export const DragHandleOutlined = loadableIcon(() =>
  import('@material-ui/icons/DragHandleOutlined'),
);
export const DragIndicatorOutlined = loadableIcon(() =>
  import('@material-ui/icons/DragIndicatorOutlined'),
);
export const DriveEtaOutlined = loadableIcon(() => import('@material-ui/icons/DriveEtaOutlined'));
export const DuoOutlined = loadableIcon(() => import('@material-ui/icons/DuoOutlined'));
export const DvrOutlined = loadableIcon(() => import('@material-ui/icons/DvrOutlined'));
export const DynamicFeedOutlined = loadableIcon(() =>
  import('@material-ui/icons/DynamicFeedOutlined'),
);
export const EcoOutlined = loadableIcon(() => import('@material-ui/icons/EcoOutlined'));
export const EditAttributesOutlined = loadableIcon(() =>
  import('@material-ui/icons/EditAttributesOutlined'),
);
export const EditLocationOutlined = loadableIcon(() =>
  import('@material-ui/icons/EditLocationOutlined'),
);
export const EditOutlined = loadableIcon(() => import('@material-ui/icons/EditOutlined'));
export const EjectOutlined = loadableIcon(() => import('@material-ui/icons/EjectOutlined'));
export const EmailOutlined = loadableIcon(() => import('@material-ui/icons/EmailOutlined'));
export const EmojiEmotionsOutlined = loadableIcon(() =>
  import('@material-ui/icons/EmojiEmotionsOutlined'),
);
export const EmojiEventsOutlined = loadableIcon(() =>
  import('@material-ui/icons/EmojiEventsOutlined'),
);
export const EmojiFlagsOutlined = loadableIcon(() =>
  import('@material-ui/icons/EmojiFlagsOutlined'),
);
export const EmojiFoodBeverageOutlined = loadableIcon(() =>
  import('@material-ui/icons/EmojiFoodBeverageOutlined'),
);
export const EmojiNatureOutlined = loadableIcon(() =>
  import('@material-ui/icons/EmojiNatureOutlined'),
);
export const EmojiObjectsOutlined = loadableIcon(() =>
  import('@material-ui/icons/EmojiObjectsOutlined'),
);
export const EmojiPeopleOutlined = loadableIcon(() =>
  import('@material-ui/icons/EmojiPeopleOutlined'),
);
export const EmojiSymbolsOutlined = loadableIcon(() =>
  import('@material-ui/icons/EmojiSymbolsOutlined'),
);
export const EmojiTransportationOutlined = loadableIcon(() =>
  import('@material-ui/icons/EmojiTransportationOutlined'),
);
export const EnhancedEncryptionOutlined = loadableIcon(() =>
  import('@material-ui/icons/EnhancedEncryptionOutlined'),
);
export const EqualizerOutlined = loadableIcon(() => import('@material-ui/icons/EqualizerOutlined'));
export const ErrorOutlined = loadableIcon(() => import('@material-ui/icons/ErrorOutlined'));
export const ErrorOutlineOutlined = loadableIcon(() =>
  import('@material-ui/icons/ErrorOutlineOutlined'),
);
export const EuroOutlined = loadableIcon(() => import('@material-ui/icons/EuroOutlined'));
export const EuroSymbolOutlined = loadableIcon(() =>
  import('@material-ui/icons/EuroSymbolOutlined'),
);
export const EventAvailableOutlined = loadableIcon(() =>
  import('@material-ui/icons/EventAvailableOutlined'),
);
export const EventBusyOutlined = loadableIcon(() => import('@material-ui/icons/EventBusyOutlined'));
export const EventNoteOutlined = loadableIcon(() => import('@material-ui/icons/EventNoteOutlined'));
export const EventOutlined = loadableIcon(() => import('@material-ui/icons/EventOutlined'));
export const EventSeatOutlined = loadableIcon(() => import('@material-ui/icons/EventSeatOutlined'));
export const EvStationOutlined = loadableIcon(() => import('@material-ui/icons/EvStationOutlined'));
export const ExitToAppOutlined = loadableIcon(() => import('@material-ui/icons/ExitToAppOutlined'));
export const ExpandLessOutlined = loadableIcon(() =>
  import('@material-ui/icons/ExpandLessOutlined'),
);
export const ExpandMoreOutlined = loadableIcon(() =>
  import('@material-ui/icons/ExpandMoreOutlined'),
);
export const ExplicitOutlined = loadableIcon(() => import('@material-ui/icons/ExplicitOutlined'));
export const ExploreOffOutlined = loadableIcon(() =>
  import('@material-ui/icons/ExploreOffOutlined'),
);
export const ExploreOutlined = loadableIcon(() => import('@material-ui/icons/ExploreOutlined'));
export const ExposureNeg1Outlined = loadableIcon(() =>
  import('@material-ui/icons/ExposureNeg1Outlined'),
);
export const ExposureNeg2Outlined = loadableIcon(() =>
  import('@material-ui/icons/ExposureNeg2Outlined'),
);
export const ExposureOutlined = loadableIcon(() => import('@material-ui/icons/ExposureOutlined'));
export const ExposurePlus1Outlined = loadableIcon(() =>
  import('@material-ui/icons/ExposurePlus1Outlined'),
);
export const ExposurePlus2Outlined = loadableIcon(() =>
  import('@material-ui/icons/ExposurePlus2Outlined'),
);
export const ExposureZeroOutlined = loadableIcon(() =>
  import('@material-ui/icons/ExposureZeroOutlined'),
);
export const ExtensionOutlined = loadableIcon(() => import('@material-ui/icons/ExtensionOutlined'));
export const FaceOutlined = loadableIcon(() => import('@material-ui/icons/FaceOutlined'));
export const FastfoodOutlined = loadableIcon(() => import('@material-ui/icons/FastfoodOutlined'));
export const FastForwardOutlined = loadableIcon(() =>
  import('@material-ui/icons/FastForwardOutlined'),
);
export const FastRewindOutlined = loadableIcon(() =>
  import('@material-ui/icons/FastRewindOutlined'),
);
export const FavoriteBorderOutlined = loadableIcon(() =>
  import('@material-ui/icons/FavoriteBorderOutlined'),
);
export const FavoriteOutlined = loadableIcon(() => import('@material-ui/icons/FavoriteOutlined'));
export const FeaturedPlayListOutlined = loadableIcon(() =>
  import('@material-ui/icons/FeaturedPlayListOutlined'),
);
export const FeaturedVideoOutlined = loadableIcon(() =>
  import('@material-ui/icons/FeaturedVideoOutlined'),
);
export const FeedbackOutlined = loadableIcon(() => import('@material-ui/icons/FeedbackOutlined'));
export const FiberDvrOutlined = loadableIcon(() => import('@material-ui/icons/FiberDvrOutlined'));
export const FiberManualRecordOutlined = loadableIcon(() =>
  import('@material-ui/icons/FiberManualRecordOutlined'),
);
export const FiberNewOutlined = loadableIcon(() => import('@material-ui/icons/FiberNewOutlined'));
export const FiberPinOutlined = loadableIcon(() => import('@material-ui/icons/FiberPinOutlined'));
export const FiberSmartRecordOutlined = loadableIcon(() =>
  import('@material-ui/icons/FiberSmartRecordOutlined'),
);
export const FileCopyOutlined = loadableIcon(() => import('@material-ui/icons/FileCopyOutlined'));
export const Filter1Outlined = loadableIcon(() => import('@material-ui/icons/Filter1Outlined'));
export const Filter2Outlined = loadableIcon(() => import('@material-ui/icons/Filter2Outlined'));
export const Filter3Outlined = loadableIcon(() => import('@material-ui/icons/Filter3Outlined'));
export const Filter4Outlined = loadableIcon(() => import('@material-ui/icons/Filter4Outlined'));
export const Filter5Outlined = loadableIcon(() => import('@material-ui/icons/Filter5Outlined'));
export const Filter6Outlined = loadableIcon(() => import('@material-ui/icons/Filter6Outlined'));
export const Filter7Outlined = loadableIcon(() => import('@material-ui/icons/Filter7Outlined'));
export const Filter8Outlined = loadableIcon(() => import('@material-ui/icons/Filter8Outlined'));
export const Filter9Outlined = loadableIcon(() => import('@material-ui/icons/Filter9Outlined'));
export const Filter9PlusOutlined = loadableIcon(() =>
  import('@material-ui/icons/Filter9PlusOutlined'),
);
export const FilterBAndWOutlined = loadableIcon(() =>
  import('@material-ui/icons/FilterBAndWOutlined'),
);
export const FilterCenterFocusOutlined = loadableIcon(() =>
  import('@material-ui/icons/FilterCenterFocusOutlined'),
);
export const FilterDramaOutlined = loadableIcon(() =>
  import('@material-ui/icons/FilterDramaOutlined'),
);
export const FilterFramesOutlined = loadableIcon(() =>
  import('@material-ui/icons/FilterFramesOutlined'),
);
export const FilterHdrOutlined = loadableIcon(() => import('@material-ui/icons/FilterHdrOutlined'));
export const FilterListOutlined = loadableIcon(() =>
  import('@material-ui/icons/FilterListOutlined'),
);
export const FilterNoneOutlined = loadableIcon(() =>
  import('@material-ui/icons/FilterNoneOutlined'),
);
export const FilterOutlined = loadableIcon(() => import('@material-ui/icons/FilterOutlined'));
export const FilterTiltShiftOutlined = loadableIcon(() =>
  import('@material-ui/icons/FilterTiltShiftOutlined'),
);
export const FilterVintageOutlined = loadableIcon(() =>
  import('@material-ui/icons/FilterVintageOutlined'),
);
export const FindInPageOutlined = loadableIcon(() =>
  import('@material-ui/icons/FindInPageOutlined'),
);
export const FindReplaceOutlined = loadableIcon(() =>
  import('@material-ui/icons/FindReplaceOutlined'),
);
export const FingerprintOutlined = loadableIcon(() =>
  import('@material-ui/icons/FingerprintOutlined'),
);
export const FireplaceOutlined = loadableIcon(() => import('@material-ui/icons/FireplaceOutlined'));
export const FirstPageOutlined = loadableIcon(() => import('@material-ui/icons/FirstPageOutlined'));
export const FitnessCenterOutlined = loadableIcon(() =>
  import('@material-ui/icons/FitnessCenterOutlined'),
);
export const FlagOutlined = loadableIcon(() => import('@material-ui/icons/FlagOutlined'));
export const FlareOutlined = loadableIcon(() => import('@material-ui/icons/FlareOutlined'));
export const FlashAutoOutlined = loadableIcon(() => import('@material-ui/icons/FlashAutoOutlined'));
export const FlashOffOutlined = loadableIcon(() => import('@material-ui/icons/FlashOffOutlined'));
export const FlashOnOutlined = loadableIcon(() => import('@material-ui/icons/FlashOnOutlined'));
export const FlightLandOutlined = loadableIcon(() =>
  import('@material-ui/icons/FlightLandOutlined'),
);
export const FlightOutlined = loadableIcon(() => import('@material-ui/icons/FlightOutlined'));
export const FlightTakeoffOutlined = loadableIcon(() =>
  import('@material-ui/icons/FlightTakeoffOutlined'),
);
export const FlipCameraAndroidOutlined = loadableIcon(() =>
  import('@material-ui/icons/FlipCameraAndroidOutlined'),
);
export const FlipCameraIosOutlined = loadableIcon(() =>
  import('@material-ui/icons/FlipCameraIosOutlined'),
);
export const FlipOutlined = loadableIcon(() => import('@material-ui/icons/FlipOutlined'));
export const FlipToBackOutlined = loadableIcon(() =>
  import('@material-ui/icons/FlipToBackOutlined'),
);
export const FlipToFrontOutlined = loadableIcon(() =>
  import('@material-ui/icons/FlipToFrontOutlined'),
);
export const FolderOpenOutlined = loadableIcon(() =>
  import('@material-ui/icons/FolderOpenOutlined'),
);
export const FolderOutlined = loadableIcon(() => import('@material-ui/icons/FolderOutlined'));
export const FolderSharedOutlined = loadableIcon(() =>
  import('@material-ui/icons/FolderSharedOutlined'),
);
export const FolderSpecialOutlined = loadableIcon(() =>
  import('@material-ui/icons/FolderSpecialOutlined'),
);
export const FontDownloadOutlined = loadableIcon(() =>
  import('@material-ui/icons/FontDownloadOutlined'),
);
export const FormatAlignCenterOutlined = loadableIcon(() =>
  import('@material-ui/icons/FormatAlignCenterOutlined'),
);
export const FormatAlignJustifyOutlined = loadableIcon(() =>
  import('@material-ui/icons/FormatAlignJustifyOutlined'),
);
export const FormatAlignLeftOutlined = loadableIcon(() =>
  import('@material-ui/icons/FormatAlignLeftOutlined'),
);
export const FormatAlignRightOutlined = loadableIcon(() =>
  import('@material-ui/icons/FormatAlignRightOutlined'),
);
export const FormatBoldOutlined = loadableIcon(() =>
  import('@material-ui/icons/FormatBoldOutlined'),
);
export const FormatClearOutlined = loadableIcon(() =>
  import('@material-ui/icons/FormatClearOutlined'),
);
export const FormatColorFillOutlined = loadableIcon(() =>
  import('@material-ui/icons/FormatColorFillOutlined'),
);
export const FormatColorResetOutlined = loadableIcon(() =>
  import('@material-ui/icons/FormatColorResetOutlined'),
);
export const FormatColorTextOutlined = loadableIcon(() =>
  import('@material-ui/icons/FormatColorTextOutlined'),
);
export const FormatIndentDecreaseOutlined = loadableIcon(() =>
  import('@material-ui/icons/FormatIndentDecreaseOutlined'),
);
export const FormatIndentIncreaseOutlined = loadableIcon(() =>
  import('@material-ui/icons/FormatIndentIncreaseOutlined'),
);
export const FormatItalicOutlined = loadableIcon(() =>
  import('@material-ui/icons/FormatItalicOutlined'),
);
export const FormatLineSpacingOutlined = loadableIcon(() =>
  import('@material-ui/icons/FormatLineSpacingOutlined'),
);
export const FormatListBulletedOutlined = loadableIcon(() =>
  import('@material-ui/icons/FormatListBulletedOutlined'),
);
export const FormatListNumberedOutlined = loadableIcon(() =>
  import('@material-ui/icons/FormatListNumberedOutlined'),
);
export const FormatListNumberedRtlOutlined = loadableIcon(() =>
  import('@material-ui/icons/FormatListNumberedRtlOutlined'),
);
export const FormatPaintOutlined = loadableIcon(() =>
  import('@material-ui/icons/FormatPaintOutlined'),
);
export const FormatQuoteOutlined = loadableIcon(() =>
  import('@material-ui/icons/FormatQuoteOutlined'),
);
export const FormatShapesOutlined = loadableIcon(() =>
  import('@material-ui/icons/FormatShapesOutlined'),
);
export const FormatSizeOutlined = loadableIcon(() =>
  import('@material-ui/icons/FormatSizeOutlined'),
);
export const FormatStrikethroughOutlined = loadableIcon(() =>
  import('@material-ui/icons/FormatStrikethroughOutlined'),
);
export const FormatTextdirectionLToROutlined = loadableIcon(() =>
  import('@material-ui/icons/FormatTextdirectionLToROutlined'),
);
export const FormatTextdirectionRToLOutlined = loadableIcon(() =>
  import('@material-ui/icons/FormatTextdirectionRToLOutlined'),
);
export const FormatUnderlinedOutlined = loadableIcon(() =>
  import('@material-ui/icons/FormatUnderlinedOutlined'),
);
export const ForumOutlined = loadableIcon(() => import('@material-ui/icons/ForumOutlined'));
export const Forward10Outlined = loadableIcon(() => import('@material-ui/icons/Forward10Outlined'));
export const Forward30Outlined = loadableIcon(() => import('@material-ui/icons/Forward30Outlined'));
export const Forward5Outlined = loadableIcon(() => import('@material-ui/icons/Forward5Outlined'));
export const ForwardOutlined = loadableIcon(() => import('@material-ui/icons/ForwardOutlined'));
export const FourKOutlined = loadableIcon(() => import('@material-ui/icons/FourKOutlined'));
export const FreeBreakfastOutlined = loadableIcon(() =>
  import('@material-ui/icons/FreeBreakfastOutlined'),
);
export const FullscreenExitOutlined = loadableIcon(() =>
  import('@material-ui/icons/FullscreenExitOutlined'),
);
export const FullscreenOutlined = loadableIcon(() =>
  import('@material-ui/icons/FullscreenOutlined'),
);
export const FunctionsOutlined = loadableIcon(() => import('@material-ui/icons/FunctionsOutlined'));
export const GamepadOutlined = loadableIcon(() => import('@material-ui/icons/GamepadOutlined'));
export const GamesOutlined = loadableIcon(() => import('@material-ui/icons/GamesOutlined'));
export const GavelOutlined = loadableIcon(() => import('@material-ui/icons/GavelOutlined'));
export const GestureOutlined = loadableIcon(() => import('@material-ui/icons/GestureOutlined'));
export const GetAppOutlined = loadableIcon(() => import('@material-ui/icons/GetAppOutlined'));
export const GifOutlined = loadableIcon(() => import('@material-ui/icons/GifOutlined'));
export const GolfCourseOutlined = loadableIcon(() =>
  import('@material-ui/icons/GolfCourseOutlined'),
);
export const GpsFixedOutlined = loadableIcon(() => import('@material-ui/icons/GpsFixedOutlined'));
export const GpsNotFixedOutlined = loadableIcon(() =>
  import('@material-ui/icons/GpsNotFixedOutlined'),
);
export const GpsOffOutlined = loadableIcon(() => import('@material-ui/icons/GpsOffOutlined'));
export const GradeOutlined = loadableIcon(() => import('@material-ui/icons/GradeOutlined'));
export const GradientOutlined = loadableIcon(() => import('@material-ui/icons/GradientOutlined'));
export const GrainOutlined = loadableIcon(() => import('@material-ui/icons/GrainOutlined'));
export const GraphicEqOutlined = loadableIcon(() => import('@material-ui/icons/GraphicEqOutlined'));
export const GridOffOutlined = loadableIcon(() => import('@material-ui/icons/GridOffOutlined'));
export const GridOnOutlined = loadableIcon(() => import('@material-ui/icons/GridOnOutlined'));
export const GroupAddOutlined = loadableIcon(() => import('@material-ui/icons/GroupAddOutlined'));
export const GroupOutlined = loadableIcon(() => import('@material-ui/icons/GroupOutlined'));
export const GroupWorkOutlined = loadableIcon(() => import('@material-ui/icons/GroupWorkOutlined'));
export const GTranslateOutlined = loadableIcon(() =>
  import('@material-ui/icons/GTranslateOutlined'),
);
export const HdOutlined = loadableIcon(() => import('@material-ui/icons/HdOutlined'));
export const HdrOffOutlined = loadableIcon(() => import('@material-ui/icons/HdrOffOutlined'));
export const HdrOnOutlined = loadableIcon(() => import('@material-ui/icons/HdrOnOutlined'));
export const HdrStrongOutlined = loadableIcon(() => import('@material-ui/icons/HdrStrongOutlined'));
export const HdrWeakOutlined = loadableIcon(() => import('@material-ui/icons/HdrWeakOutlined'));
export const HeadsetMicOutlined = loadableIcon(() =>
  import('@material-ui/icons/HeadsetMicOutlined'),
);
export const HeadsetOutlined = loadableIcon(() => import('@material-ui/icons/HeadsetOutlined'));
export const HealingOutlined = loadableIcon(() => import('@material-ui/icons/HealingOutlined'));
export const HearingOutlined = loadableIcon(() => import('@material-ui/icons/HearingOutlined'));
export const HeightOutlined = loadableIcon(() => import('@material-ui/icons/HeightOutlined'));
export const HelpOutlined = loadableIcon(() => import('@material-ui/icons/HelpOutlined'));
export const HelpOutlineOutlined = loadableIcon(() =>
  import('@material-ui/icons/HelpOutlineOutlined'),
);
export const HighlightOffOutlined = loadableIcon(() =>
  import('@material-ui/icons/HighlightOffOutlined'),
);
export const HighlightOutlined = loadableIcon(() => import('@material-ui/icons/HighlightOutlined'));
export const HighQualityOutlined = loadableIcon(() =>
  import('@material-ui/icons/HighQualityOutlined'),
);
export const HistoryOutlined = loadableIcon(() => import('@material-ui/icons/HistoryOutlined'));
export const HomeOutlined = loadableIcon(() => import('@material-ui/icons/HomeOutlined'));
export const HomeWorkOutlined = loadableIcon(() => import('@material-ui/icons/HomeWorkOutlined'));
export const HorizontalSplitOutlined = loadableIcon(() =>
  import('@material-ui/icons/HorizontalSplitOutlined'),
);
export const HotelOutlined = loadableIcon(() => import('@material-ui/icons/HotelOutlined'));
export const HotTubOutlined = loadableIcon(() => import('@material-ui/icons/HotTubOutlined'));
export const HourglassEmptyOutlined = loadableIcon(() =>
  import('@material-ui/icons/HourglassEmptyOutlined'),
);
export const HourglassFullOutlined = loadableIcon(() =>
  import('@material-ui/icons/HourglassFullOutlined'),
);
export const HouseOutlined = loadableIcon(() => import('@material-ui/icons/HouseOutlined'));
export const HowToRegOutlined = loadableIcon(() => import('@material-ui/icons/HowToRegOutlined'));
export const HowToVoteOutlined = loadableIcon(() => import('@material-ui/icons/HowToVoteOutlined'));
export const HttpOutlined = loadableIcon(() => import('@material-ui/icons/HttpOutlined'));
export const HttpsOutlined = loadableIcon(() => import('@material-ui/icons/HttpsOutlined'));
export const ImageAspectRatioOutlined = loadableIcon(() =>
  import('@material-ui/icons/ImageAspectRatioOutlined'),
);
export const ImageOutlined = loadableIcon(() => import('@material-ui/icons/ImageOutlined'));
export const ImageSearchOutlined = loadableIcon(() =>
  import('@material-ui/icons/ImageSearchOutlined'),
);
export const ImportantDevicesOutlined = loadableIcon(() =>
  import('@material-ui/icons/ImportantDevicesOutlined'),
);
export const ImportContactsOutlined = loadableIcon(() =>
  import('@material-ui/icons/ImportContactsOutlined'),
);
export const ImportExportOutlined = loadableIcon(() =>
  import('@material-ui/icons/ImportExportOutlined'),
);
export const InboxOutlined = loadableIcon(() => import('@material-ui/icons/InboxOutlined'));
export const IndeterminateCheckBoxOutlined = loadableIcon(() =>
  import('@material-ui/icons/IndeterminateCheckBoxOutlined'),
);
export const InfoOutlined = loadableIcon(() => import('@material-ui/icons/InfoOutlined'));
export const InputOutlined = loadableIcon(() => import('@material-ui/icons/InputOutlined'));
export const InsertChartOutlined = loadableIcon(() =>
  import('@material-ui/icons/InsertChartOutlined'),
);
export const InsertChartOutlinedOutlined = loadableIcon(() =>
  import('@material-ui/icons/InsertChartOutlinedOutlined'),
);
export const InsertChartOutlinedRounded = loadableIcon(() =>
  import('@material-ui/icons/InsertChartOutlinedRounded'),
);
export const InsertChartOutlinedSharp = loadableIcon(() =>
  import('@material-ui/icons/InsertChartOutlinedSharp'),
);
export const InsertChartOutlinedTwoTone = loadableIcon(() =>
  import('@material-ui/icons/InsertChartOutlinedTwoTone'),
);
export const InsertCommentOutlined = loadableIcon(() =>
  import('@material-ui/icons/InsertCommentOutlined'),
);
export const InsertDriveFileOutlined = loadableIcon(() =>
  import('@material-ui/icons/InsertDriveFileOutlined'),
);
export const InsertEmoticonOutlined = loadableIcon(() =>
  import('@material-ui/icons/InsertEmoticonOutlined'),
);
export const InsertInvitationOutlined = loadableIcon(() =>
  import('@material-ui/icons/InsertInvitationOutlined'),
);
export const InsertLinkOutlined = loadableIcon(() =>
  import('@material-ui/icons/InsertLinkOutlined'),
);
export const InsertPhotoOutlined = loadableIcon(() =>
  import('@material-ui/icons/InsertPhotoOutlined'),
);
export const InvertColorsOffOutlined = loadableIcon(() =>
  import('@material-ui/icons/InvertColorsOffOutlined'),
);
export const InvertColorsOutlined = loadableIcon(() =>
  import('@material-ui/icons/InvertColorsOutlined'),
);
export const IsoOutlined = loadableIcon(() => import('@material-ui/icons/IsoOutlined'));
export const KeyboardArrowDownOutlined = loadableIcon(() =>
  import('@material-ui/icons/KeyboardArrowDownOutlined'),
);
export const KeyboardArrowLeftOutlined = loadableIcon(() =>
  import('@material-ui/icons/KeyboardArrowLeftOutlined'),
);
export const KeyboardArrowRightOutlined = loadableIcon(() =>
  import('@material-ui/icons/KeyboardArrowRightOutlined'),
);
export const KeyboardArrowUpOutlined = loadableIcon(() =>
  import('@material-ui/icons/KeyboardArrowUpOutlined'),
);
export const KeyboardBackspaceOutlined = loadableIcon(() =>
  import('@material-ui/icons/KeyboardBackspaceOutlined'),
);
export const KeyboardCapslockOutlined = loadableIcon(() =>
  import('@material-ui/icons/KeyboardCapslockOutlined'),
);
export const KeyboardHideOutlined = loadableIcon(() =>
  import('@material-ui/icons/KeyboardHideOutlined'),
);
export const KeyboardOutlined = loadableIcon(() => import('@material-ui/icons/KeyboardOutlined'));
export const KeyboardReturnOutlined = loadableIcon(() =>
  import('@material-ui/icons/KeyboardReturnOutlined'),
);
export const KeyboardTabOutlined = loadableIcon(() =>
  import('@material-ui/icons/KeyboardTabOutlined'),
);
export const KeyboardVoiceOutlined = loadableIcon(() =>
  import('@material-ui/icons/KeyboardVoiceOutlined'),
);
export const KingBedOutlined = loadableIcon(() => import('@material-ui/icons/KingBedOutlined'));
export const KitchenOutlined = loadableIcon(() => import('@material-ui/icons/KitchenOutlined'));
export const LabelImportantOutlined = loadableIcon(() =>
  import('@material-ui/icons/LabelImportantOutlined'),
);
export const LabelOffOutlined = loadableIcon(() => import('@material-ui/icons/LabelOffOutlined'));
export const LabelOutlined = loadableIcon(() => import('@material-ui/icons/LabelOutlined'));
export const LandscapeOutlined = loadableIcon(() => import('@material-ui/icons/LandscapeOutlined'));
export const LanguageOutlined = loadableIcon(() => import('@material-ui/icons/LanguageOutlined'));
export const LaptopChromebookOutlined = loadableIcon(() =>
  import('@material-ui/icons/LaptopChromebookOutlined'),
);
export const LaptopMacOutlined = loadableIcon(() => import('@material-ui/icons/LaptopMacOutlined'));
export const LaptopOutlined = loadableIcon(() => import('@material-ui/icons/LaptopOutlined'));
export const LaptopWindowsOutlined = loadableIcon(() =>
  import('@material-ui/icons/LaptopWindowsOutlined'),
);
export const LastPageOutlined = loadableIcon(() => import('@material-ui/icons/LastPageOutlined'));
export const LaunchOutlined = loadableIcon(() => import('@material-ui/icons/LaunchOutlined'));
export const LayersClearOutlined = loadableIcon(() =>
  import('@material-ui/icons/LayersClearOutlined'),
);
export const LayersOutlined = loadableIcon(() => import('@material-ui/icons/LayersOutlined'));
export const LeakAddOutlined = loadableIcon(() => import('@material-ui/icons/LeakAddOutlined'));
export const LeakRemoveOutlined = loadableIcon(() =>
  import('@material-ui/icons/LeakRemoveOutlined'),
);
export const LensOutlined = loadableIcon(() => import('@material-ui/icons/LensOutlined'));
export const LibraryAddCheckOutlined = loadableIcon(() =>
  import('@material-ui/icons/LibraryAddCheckOutlined'),
);
export const LibraryAddOutlined = loadableIcon(() =>
  import('@material-ui/icons/LibraryAddOutlined'),
);
export const LibraryBooksOutlined = loadableIcon(() =>
  import('@material-ui/icons/LibraryBooksOutlined'),
);
export const LibraryMusicOutlined = loadableIcon(() =>
  import('@material-ui/icons/LibraryMusicOutlined'),
);
export const LinearScaleOutlined = loadableIcon(() =>
  import('@material-ui/icons/LinearScaleOutlined'),
);
export const LineStyleOutlined = loadableIcon(() => import('@material-ui/icons/LineStyleOutlined'));
export const LineWeightOutlined = loadableIcon(() =>
  import('@material-ui/icons/LineWeightOutlined'),
);
export const LinkedCameraOutlined = loadableIcon(() =>
  import('@material-ui/icons/LinkedCameraOutlined'),
);
export const LinkOffOutlined = loadableIcon(() => import('@material-ui/icons/LinkOffOutlined'));
export const LinkOutlined = loadableIcon(() => import('@material-ui/icons/LinkOutlined'));
export const ListAltOutlined = loadableIcon(() => import('@material-ui/icons/ListAltOutlined'));
export const ListOutlined = loadableIcon(() => import('@material-ui/icons/ListOutlined'));
export const LiveHelpOutlined = loadableIcon(() => import('@material-ui/icons/LiveHelpOutlined'));
export const LiveTvOutlined = loadableIcon(() => import('@material-ui/icons/LiveTvOutlined'));
export const LocalActivityOutlined = loadableIcon(() =>
  import('@material-ui/icons/LocalActivityOutlined'),
);
export const LocalAirportOutlined = loadableIcon(() =>
  import('@material-ui/icons/LocalAirportOutlined'),
);
export const LocalAtmOutlined = loadableIcon(() => import('@material-ui/icons/LocalAtmOutlined'));
export const LocalBarOutlined = loadableIcon(() => import('@material-ui/icons/LocalBarOutlined'));
export const LocalCafeOutlined = loadableIcon(() => import('@material-ui/icons/LocalCafeOutlined'));
export const LocalCarWashOutlined = loadableIcon(() =>
  import('@material-ui/icons/LocalCarWashOutlined'),
);
export const LocalConvenienceStoreOutlined = loadableIcon(() =>
  import('@material-ui/icons/LocalConvenienceStoreOutlined'),
);
export const LocalDiningOutlined = loadableIcon(() =>
  import('@material-ui/icons/LocalDiningOutlined'),
);
export const LocalDrinkOutlined = loadableIcon(() =>
  import('@material-ui/icons/LocalDrinkOutlined'),
);
export const LocalFloristOutlined = loadableIcon(() =>
  import('@material-ui/icons/LocalFloristOutlined'),
);
export const LocalGasStationOutlined = loadableIcon(() =>
  import('@material-ui/icons/LocalGasStationOutlined'),
);
export const LocalGroceryStoreOutlined = loadableIcon(() =>
  import('@material-ui/icons/LocalGroceryStoreOutlined'),
);
export const LocalHospitalOutlined = loadableIcon(() =>
  import('@material-ui/icons/LocalHospitalOutlined'),
);
export const LocalHotelOutlined = loadableIcon(() =>
  import('@material-ui/icons/LocalHotelOutlined'),
);
export const LocalLaundryServiceOutlined = loadableIcon(() =>
  import('@material-ui/icons/LocalLaundryServiceOutlined'),
);
export const LocalLibraryOutlined = loadableIcon(() =>
  import('@material-ui/icons/LocalLibraryOutlined'),
);
export const LocalMallOutlined = loadableIcon(() => import('@material-ui/icons/LocalMallOutlined'));
export const LocalMoviesOutlined = loadableIcon(() =>
  import('@material-ui/icons/LocalMoviesOutlined'),
);
export const LocalOfferOutlined = loadableIcon(() =>
  import('@material-ui/icons/LocalOfferOutlined'),
);
export const LocalParkingOutlined = loadableIcon(() =>
  import('@material-ui/icons/LocalParkingOutlined'),
);
export const LocalPharmacyOutlined = loadableIcon(() =>
  import('@material-ui/icons/LocalPharmacyOutlined'),
);
export const LocalPhoneOutlined = loadableIcon(() =>
  import('@material-ui/icons/LocalPhoneOutlined'),
);
export const LocalPizzaOutlined = loadableIcon(() =>
  import('@material-ui/icons/LocalPizzaOutlined'),
);
export const LocalPlayOutlined = loadableIcon(() => import('@material-ui/icons/LocalPlayOutlined'));
export const LocalPostOfficeOutlined = loadableIcon(() =>
  import('@material-ui/icons/LocalPostOfficeOutlined'),
);
export const LocalPrintshopOutlined = loadableIcon(() =>
  import('@material-ui/icons/LocalPrintshopOutlined'),
);
export const LocalSeeOutlined = loadableIcon(() => import('@material-ui/icons/LocalSeeOutlined'));
export const LocalShippingOutlined = loadableIcon(() =>
  import('@material-ui/icons/LocalShippingOutlined'),
);
export const LocalTaxiOutlined = loadableIcon(() => import('@material-ui/icons/LocalTaxiOutlined'));
export const LocationCityOutlined = loadableIcon(() =>
  import('@material-ui/icons/LocationCityOutlined'),
);
export const LocationDisabledOutlined = loadableIcon(() =>
  import('@material-ui/icons/LocationDisabledOutlined'),
);
export const LocationOffOutlined = loadableIcon(() =>
  import('@material-ui/icons/LocationOffOutlined'),
);
export const LocationOnOutlined = loadableIcon(() =>
  import('@material-ui/icons/LocationOnOutlined'),
);
export const LocationSearchingOutlined = loadableIcon(() =>
  import('@material-ui/icons/LocationSearchingOutlined'),
);
export const LockOpenOutlined = loadableIcon(() => import('@material-ui/icons/LockOpenOutlined'));
export const LockOutlined = loadableIcon(() => import('@material-ui/icons/LockOutlined'));
export const Looks3Outlined = loadableIcon(() => import('@material-ui/icons/Looks3Outlined'));
export const Looks4Outlined = loadableIcon(() => import('@material-ui/icons/Looks4Outlined'));
export const Looks5Outlined = loadableIcon(() => import('@material-ui/icons/Looks5Outlined'));
export const Looks6Outlined = loadableIcon(() => import('@material-ui/icons/Looks6Outlined'));
export const LooksOneOutlined = loadableIcon(() => import('@material-ui/icons/LooksOneOutlined'));
export const LooksOutlined = loadableIcon(() => import('@material-ui/icons/LooksOutlined'));
export const LooksTwoOutlined = loadableIcon(() => import('@material-ui/icons/LooksTwoOutlined'));
export const LoopOutlined = loadableIcon(() => import('@material-ui/icons/LoopOutlined'));
export const LoupeOutlined = loadableIcon(() => import('@material-ui/icons/LoupeOutlined'));
export const LowPriorityOutlined = loadableIcon(() =>
  import('@material-ui/icons/LowPriorityOutlined'),
);
export const LoyaltyOutlined = loadableIcon(() => import('@material-ui/icons/LoyaltyOutlined'));
export const MailOutlined = loadableIcon(() => import('@material-ui/icons/MailOutlined'));
export const MailOutlineOutlined = loadableIcon(() =>
  import('@material-ui/icons/MailOutlineOutlined'),
);
export const MapOutlined = loadableIcon(() => import('@material-ui/icons/MapOutlined'));
export const MarkunreadMailboxOutlined = loadableIcon(() =>
  import('@material-ui/icons/MarkunreadMailboxOutlined'),
);
export const MarkunreadOutlined = loadableIcon(() =>
  import('@material-ui/icons/MarkunreadOutlined'),
);
export const MaximizeOutlined = loadableIcon(() => import('@material-ui/icons/MaximizeOutlined'));
export const MeetingRoomOutlined = loadableIcon(() =>
  import('@material-ui/icons/MeetingRoomOutlined'),
);
export const MemoryOutlined = loadableIcon(() => import('@material-ui/icons/MemoryOutlined'));
export const MenuBookOutlined = loadableIcon(() => import('@material-ui/icons/MenuBookOutlined'));
export const MenuOpenOutlined = loadableIcon(() => import('@material-ui/icons/MenuOpenOutlined'));
export const MenuOutlined = loadableIcon(() => import('@material-ui/icons/MenuOutlined'));
export const MergeTypeOutlined = loadableIcon(() => import('@material-ui/icons/MergeTypeOutlined'));
export const MessageOutlined = loadableIcon(() => import('@material-ui/icons/MessageOutlined'));
export const MicNoneOutlined = loadableIcon(() => import('@material-ui/icons/MicNoneOutlined'));
export const MicOffOutlined = loadableIcon(() => import('@material-ui/icons/MicOffOutlined'));
export const MicOutlined = loadableIcon(() => import('@material-ui/icons/MicOutlined'));
export const MinimizeOutlined = loadableIcon(() => import('@material-ui/icons/MinimizeOutlined'));
export const MissedVideoCallOutlined = loadableIcon(() =>
  import('@material-ui/icons/MissedVideoCallOutlined'),
);
export const MmsOutlined = loadableIcon(() => import('@material-ui/icons/MmsOutlined'));
export const MobileFriendlyOutlined = loadableIcon(() =>
  import('@material-ui/icons/MobileFriendlyOutlined'),
);
export const MobileOffOutlined = loadableIcon(() => import('@material-ui/icons/MobileOffOutlined'));
export const MobileScreenShareOutlined = loadableIcon(() =>
  import('@material-ui/icons/MobileScreenShareOutlined'),
);
export const ModeCommentOutlined = loadableIcon(() =>
  import('@material-ui/icons/ModeCommentOutlined'),
);
export const MonetizationOnOutlined = loadableIcon(() =>
  import('@material-ui/icons/MonetizationOnOutlined'),
);
export const MoneyOffOutlined = loadableIcon(() => import('@material-ui/icons/MoneyOffOutlined'));
export const MoneyOutlined = loadableIcon(() => import('@material-ui/icons/MoneyOutlined'));
export const MonochromePhotosOutlined = loadableIcon(() =>
  import('@material-ui/icons/MonochromePhotosOutlined'),
);
export const MoodBadOutlined = loadableIcon(() => import('@material-ui/icons/MoodBadOutlined'));
export const MoodOutlined = loadableIcon(() => import('@material-ui/icons/MoodOutlined'));
export const MoreHorizOutlined = loadableIcon(() => import('@material-ui/icons/MoreHorizOutlined'));
export const MoreOutlined = loadableIcon(() => import('@material-ui/icons/MoreOutlined'));
export const MoreVertOutlined = loadableIcon(() => import('@material-ui/icons/MoreVertOutlined'));
export const MotorcycleOutlined = loadableIcon(() =>
  import('@material-ui/icons/MotorcycleOutlined'),
);
export const MouseOutlined = loadableIcon(() => import('@material-ui/icons/MouseOutlined'));
export const MoveToInboxOutlined = loadableIcon(() =>
  import('@material-ui/icons/MoveToInboxOutlined'),
);
export const MovieCreationOutlined = loadableIcon(() =>
  import('@material-ui/icons/MovieCreationOutlined'),
);
export const MovieFilterOutlined = loadableIcon(() =>
  import('@material-ui/icons/MovieFilterOutlined'),
);
export const MovieOutlined = loadableIcon(() => import('@material-ui/icons/MovieOutlined'));
export const MultilineChartOutlined = loadableIcon(() =>
  import('@material-ui/icons/MultilineChartOutlined'),
);
export const MuseumOutlined = loadableIcon(() => import('@material-ui/icons/MuseumOutlined'));
export const MusicNoteOutlined = loadableIcon(() => import('@material-ui/icons/MusicNoteOutlined'));
export const MusicOffOutlined = loadableIcon(() => import('@material-ui/icons/MusicOffOutlined'));
export const MusicVideoOutlined = loadableIcon(() =>
  import('@material-ui/icons/MusicVideoOutlined'),
);
export const MyLocationOutlined = loadableIcon(() =>
  import('@material-ui/icons/MyLocationOutlined'),
);
export const NatureOutlined = loadableIcon(() => import('@material-ui/icons/NatureOutlined'));
export const NaturePeopleOutlined = loadableIcon(() =>
  import('@material-ui/icons/NaturePeopleOutlined'),
);
export const NavigateBeforeOutlined = loadableIcon(() =>
  import('@material-ui/icons/NavigateBeforeOutlined'),
);
export const NavigateNextOutlined = loadableIcon(() =>
  import('@material-ui/icons/NavigateNextOutlined'),
);
export const NavigationOutlined = loadableIcon(() =>
  import('@material-ui/icons/NavigationOutlined'),
);
export const NearMeOutlined = loadableIcon(() => import('@material-ui/icons/NearMeOutlined'));
export const NetworkCellOutlined = loadableIcon(() =>
  import('@material-ui/icons/NetworkCellOutlined'),
);
export const NetworkCheckOutlined = loadableIcon(() =>
  import('@material-ui/icons/NetworkCheckOutlined'),
);
export const NetworkLockedOutlined = loadableIcon(() =>
  import('@material-ui/icons/NetworkLockedOutlined'),
);
export const NetworkWifiOutlined = loadableIcon(() =>
  import('@material-ui/icons/NetworkWifiOutlined'),
);
export const NewReleasesOutlined = loadableIcon(() =>
  import('@material-ui/icons/NewReleasesOutlined'),
);
export const NextWeekOutlined = loadableIcon(() => import('@material-ui/icons/NextWeekOutlined'));
export const NfcOutlined = loadableIcon(() => import('@material-ui/icons/NfcOutlined'));
export const NightsStayOutlined = loadableIcon(() =>
  import('@material-ui/icons/NightsStayOutlined'),
);
export const NoEncryptionOutlined = loadableIcon(() =>
  import('@material-ui/icons/NoEncryptionOutlined'),
);
export const NoMeetingRoomOutlined = loadableIcon(() =>
  import('@material-ui/icons/NoMeetingRoomOutlined'),
);
export const NoSimOutlined = loadableIcon(() => import('@material-ui/icons/NoSimOutlined'));
export const NoteAddOutlined = loadableIcon(() => import('@material-ui/icons/NoteAddOutlined'));
export const NoteOutlined = loadableIcon(() => import('@material-ui/icons/NoteOutlined'));
export const NotesOutlined = loadableIcon(() => import('@material-ui/icons/NotesOutlined'));
export const NotificationImportantOutlined = loadableIcon(() =>
  import('@material-ui/icons/NotificationImportantOutlined'),
);
export const NotificationsActiveOutlined = loadableIcon(() =>
  import('@material-ui/icons/NotificationsActiveOutlined'),
);
export const NotificationsNoneOutlined = loadableIcon(() =>
  import('@material-ui/icons/NotificationsNoneOutlined'),
);
export const NotificationsOffOutlined = loadableIcon(() =>
  import('@material-ui/icons/NotificationsOffOutlined'),
);
export const NotificationsOutlined = loadableIcon(() =>
  import('@material-ui/icons/NotificationsOutlined'),
);
export const NotificationsPausedOutlined = loadableIcon(() =>
  import('@material-ui/icons/NotificationsPausedOutlined'),
);
export const NotInterestedOutlined = loadableIcon(() =>
  import('@material-ui/icons/NotInterestedOutlined'),
);
export const NotListedLocationOutlined = loadableIcon(() =>
  import('@material-ui/icons/NotListedLocationOutlined'),
);
export const OfflineBoltOutlined = loadableIcon(() =>
  import('@material-ui/icons/OfflineBoltOutlined'),
);
export const OfflinePinOutlined = loadableIcon(() =>
  import('@material-ui/icons/OfflinePinOutlined'),
);
export const OndemandVideoOutlined = loadableIcon(() =>
  import('@material-ui/icons/OndemandVideoOutlined'),
);
export const OpacityOutlined = loadableIcon(() => import('@material-ui/icons/OpacityOutlined'));
export const OpenInBrowserOutlined = loadableIcon(() =>
  import('@material-ui/icons/OpenInBrowserOutlined'),
);
export const OpenInNewOutlined = loadableIcon(() => import('@material-ui/icons/OpenInNewOutlined'));
export const OpenWithOutlined = loadableIcon(() => import('@material-ui/icons/OpenWithOutlined'));
export const OutdoorGrillOutlined = loadableIcon(() =>
  import('@material-ui/icons/OutdoorGrillOutlined'),
);
export const OutlinedFlag = loadableIcon(() => import('@material-ui/icons/OutlinedFlag'));
export const OutlinedFlagOutlined = loadableIcon(() =>
  import('@material-ui/icons/OutlinedFlagOutlined'),
);
export const OutlinedFlagRounded = loadableIcon(() =>
  import('@material-ui/icons/OutlinedFlagRounded'),
);
export const OutlinedFlagSharp = loadableIcon(() => import('@material-ui/icons/OutlinedFlagSharp'));
export const OutlinedFlagTwoTone = loadableIcon(() =>
  import('@material-ui/icons/OutlinedFlagTwoTone'),
);
export const PagesOutlined = loadableIcon(() => import('@material-ui/icons/PagesOutlined'));
export const PageviewOutlined = loadableIcon(() => import('@material-ui/icons/PageviewOutlined'));
export const PaletteOutlined = loadableIcon(() => import('@material-ui/icons/PaletteOutlined'));
export const PanoramaFishEyeOutlined = loadableIcon(() =>
  import('@material-ui/icons/PanoramaFishEyeOutlined'),
);
export const PanoramaHorizontalOutlined = loadableIcon(() =>
  import('@material-ui/icons/PanoramaHorizontalOutlined'),
);
export const PanoramaOutlined = loadableIcon(() => import('@material-ui/icons/PanoramaOutlined'));
export const PanoramaVerticalOutlined = loadableIcon(() =>
  import('@material-ui/icons/PanoramaVerticalOutlined'),
);
export const PanoramaWideAngleOutlined = loadableIcon(() =>
  import('@material-ui/icons/PanoramaWideAngleOutlined'),
);
export const PanToolOutlined = loadableIcon(() => import('@material-ui/icons/PanToolOutlined'));
export const PartyModeOutlined = loadableIcon(() => import('@material-ui/icons/PartyModeOutlined'));
export const PauseCircleFilledOutlined = loadableIcon(() =>
  import('@material-ui/icons/PauseCircleFilledOutlined'),
);
export const PauseCircleOutlineOutlined = loadableIcon(() =>
  import('@material-ui/icons/PauseCircleOutlineOutlined'),
);
export const PauseOutlined = loadableIcon(() => import('@material-ui/icons/PauseOutlined'));
export const PausePresentationOutlined = loadableIcon(() =>
  import('@material-ui/icons/PausePresentationOutlined'),
);
export const PaymentOutlined = loadableIcon(() => import('@material-ui/icons/PaymentOutlined'));
export const PeopleAltOutlined = loadableIcon(() => import('@material-ui/icons/PeopleAltOutlined'));
export const PeopleOutlined = loadableIcon(() => import('@material-ui/icons/PeopleOutlined'));
export const PeopleOutlineOutlined = loadableIcon(() =>
  import('@material-ui/icons/PeopleOutlineOutlined'),
);
export const PermCameraMicOutlined = loadableIcon(() =>
  import('@material-ui/icons/PermCameraMicOutlined'),
);
export const PermContactCalendarOutlined = loadableIcon(() =>
  import('@material-ui/icons/PermContactCalendarOutlined'),
);
export const PermDataSettingOutlined = loadableIcon(() =>
  import('@material-ui/icons/PermDataSettingOutlined'),
);
export const PermDeviceInformationOutlined = loadableIcon(() =>
  import('@material-ui/icons/PermDeviceInformationOutlined'),
);
export const PermIdentityOutlined = loadableIcon(() =>
  import('@material-ui/icons/PermIdentityOutlined'),
);
export const PermMediaOutlined = loadableIcon(() => import('@material-ui/icons/PermMediaOutlined'));
export const PermPhoneMsgOutlined = loadableIcon(() =>
  import('@material-ui/icons/PermPhoneMsgOutlined'),
);
export const PermScanWifiOutlined = loadableIcon(() =>
  import('@material-ui/icons/PermScanWifiOutlined'),
);
export const PersonAddDisabledOutlined = loadableIcon(() =>
  import('@material-ui/icons/PersonAddDisabledOutlined'),
);
export const PersonAddOutlined = loadableIcon(() => import('@material-ui/icons/PersonAddOutlined'));
export const PersonalVideoOutlined = loadableIcon(() =>
  import('@material-ui/icons/PersonalVideoOutlined'),
);
export const PersonOutlined = loadableIcon(() => import('@material-ui/icons/PersonOutlined'));
export const PersonOutlineOutlined = loadableIcon(() =>
  import('@material-ui/icons/PersonOutlineOutlined'),
);
export const PersonPinCircleOutlined = loadableIcon(() =>
  import('@material-ui/icons/PersonPinCircleOutlined'),
);
export const PersonPinOutlined = loadableIcon(() => import('@material-ui/icons/PersonPinOutlined'));
export const PetsOutlined = loadableIcon(() => import('@material-ui/icons/PetsOutlined'));
export const PhoneAndroidOutlined = loadableIcon(() =>
  import('@material-ui/icons/PhoneAndroidOutlined'),
);
export const PhoneBluetoothSpeakerOutlined = loadableIcon(() =>
  import('@material-ui/icons/PhoneBluetoothSpeakerOutlined'),
);
export const PhoneCallbackOutlined = loadableIcon(() =>
  import('@material-ui/icons/PhoneCallbackOutlined'),
);
export const PhoneDisabledOutlined = loadableIcon(() =>
  import('@material-ui/icons/PhoneDisabledOutlined'),
);
export const PhoneEnabledOutlined = loadableIcon(() =>
  import('@material-ui/icons/PhoneEnabledOutlined'),
);
export const PhoneForwardedOutlined = loadableIcon(() =>
  import('@material-ui/icons/PhoneForwardedOutlined'),
);
export const PhoneInTalkOutlined = loadableIcon(() =>
  import('@material-ui/icons/PhoneInTalkOutlined'),
);
export const PhoneIphoneOutlined = loadableIcon(() =>
  import('@material-ui/icons/PhoneIphoneOutlined'),
);
export const PhonelinkEraseOutlined = loadableIcon(() =>
  import('@material-ui/icons/PhonelinkEraseOutlined'),
);
export const PhonelinkLockOutlined = loadableIcon(() =>
  import('@material-ui/icons/PhonelinkLockOutlined'),
);
export const PhonelinkOffOutlined = loadableIcon(() =>
  import('@material-ui/icons/PhonelinkOffOutlined'),
);
export const PhonelinkOutlined = loadableIcon(() => import('@material-ui/icons/PhonelinkOutlined'));
export const PhonelinkRingOutlined = loadableIcon(() =>
  import('@material-ui/icons/PhonelinkRingOutlined'),
);
export const PhonelinkSetupOutlined = loadableIcon(() =>
  import('@material-ui/icons/PhonelinkSetupOutlined'),
);
export const PhoneLockedOutlined = loadableIcon(() =>
  import('@material-ui/icons/PhoneLockedOutlined'),
);
export const PhoneMissedOutlined = loadableIcon(() =>
  import('@material-ui/icons/PhoneMissedOutlined'),
);
export const PhoneOutlined = loadableIcon(() => import('@material-ui/icons/PhoneOutlined'));
export const PhonePausedOutlined = loadableIcon(() =>
  import('@material-ui/icons/PhonePausedOutlined'),
);
export const PhotoAlbumOutlined = loadableIcon(() =>
  import('@material-ui/icons/PhotoAlbumOutlined'),
);
export const PhotoCameraOutlined = loadableIcon(() =>
  import('@material-ui/icons/PhotoCameraOutlined'),
);
export const PhotoFilterOutlined = loadableIcon(() =>
  import('@material-ui/icons/PhotoFilterOutlined'),
);
export const PhotoLibraryOutlined = loadableIcon(() =>
  import('@material-ui/icons/PhotoLibraryOutlined'),
);
export const PhotoOutlined = loadableIcon(() => import('@material-ui/icons/PhotoOutlined'));
export const PhotoSizeSelectActualOutlined = loadableIcon(() =>
  import('@material-ui/icons/PhotoSizeSelectActualOutlined'),
);
export const PhotoSizeSelectLargeOutlined = loadableIcon(() =>
  import('@material-ui/icons/PhotoSizeSelectLargeOutlined'),
);
export const PhotoSizeSelectSmallOutlined = loadableIcon(() =>
  import('@material-ui/icons/PhotoSizeSelectSmallOutlined'),
);
export const PictureAsPdfOutlined = loadableIcon(() =>
  import('@material-ui/icons/PictureAsPdfOutlined'),
);
export const PictureInPictureAltOutlined = loadableIcon(() =>
  import('@material-ui/icons/PictureInPictureAltOutlined'),
);
export const PictureInPictureOutlined = loadableIcon(() =>
  import('@material-ui/icons/PictureInPictureOutlined'),
);
export const PieChartOutlined = loadableIcon(() => import('@material-ui/icons/PieChartOutlined'));
export const PinDropOutlined = loadableIcon(() => import('@material-ui/icons/PinDropOutlined'));
export const PlaceOutlined = loadableIcon(() => import('@material-ui/icons/PlaceOutlined'));
export const PlayArrowOutlined = loadableIcon(() => import('@material-ui/icons/PlayArrowOutlined'));
export const PlayCircleFilledOutlined = loadableIcon(() =>
  import('@material-ui/icons/PlayCircleFilledOutlined'),
);
export const PlayCircleFilledWhiteOutlined = loadableIcon(() =>
  import('@material-ui/icons/PlayCircleFilledWhiteOutlined'),
);
export const PlayCircleOutlineOutlined = loadableIcon(() =>
  import('@material-ui/icons/PlayCircleOutlineOutlined'),
);
export const PlayForWorkOutlined = loadableIcon(() =>
  import('@material-ui/icons/PlayForWorkOutlined'),
);
export const PlaylistAddCheckOutlined = loadableIcon(() =>
  import('@material-ui/icons/PlaylistAddCheckOutlined'),
);
export const PlaylistAddOutlined = loadableIcon(() =>
  import('@material-ui/icons/PlaylistAddOutlined'),
);
export const PlaylistPlayOutlined = loadableIcon(() =>
  import('@material-ui/icons/PlaylistPlayOutlined'),
);
export const PlusOneOutlined = loadableIcon(() => import('@material-ui/icons/PlusOneOutlined'));
export const PolicyOutlined = loadableIcon(() => import('@material-ui/icons/PolicyOutlined'));
export const PollOutlined = loadableIcon(() => import('@material-ui/icons/PollOutlined'));
export const PolymerOutlined = loadableIcon(() => import('@material-ui/icons/PolymerOutlined'));
export const PoolOutlined = loadableIcon(() => import('@material-ui/icons/PoolOutlined'));
export const PortableWifiOffOutlined = loadableIcon(() =>
  import('@material-ui/icons/PortableWifiOffOutlined'),
);
export const PortraitOutlined = loadableIcon(() => import('@material-ui/icons/PortraitOutlined'));
export const PostAddOutlined = loadableIcon(() => import('@material-ui/icons/PostAddOutlined'));
export const PowerInputOutlined = loadableIcon(() =>
  import('@material-ui/icons/PowerInputOutlined'),
);
export const PowerOffOutlined = loadableIcon(() => import('@material-ui/icons/PowerOffOutlined'));
export const PowerOutlined = loadableIcon(() => import('@material-ui/icons/PowerOutlined'));
export const PowerSettingsNewOutlined = loadableIcon(() =>
  import('@material-ui/icons/PowerSettingsNewOutlined'),
);
export const PregnantWomanOutlined = loadableIcon(() =>
  import('@material-ui/icons/PregnantWomanOutlined'),
);
export const PresentToAllOutlined = loadableIcon(() =>
  import('@material-ui/icons/PresentToAllOutlined'),
);
export const PrintDisabledOutlined = loadableIcon(() =>
  import('@material-ui/icons/PrintDisabledOutlined'),
);
export const PrintOutlined = loadableIcon(() => import('@material-ui/icons/PrintOutlined'));
export const PriorityHighOutlined = loadableIcon(() =>
  import('@material-ui/icons/PriorityHighOutlined'),
);
export const PublicOutlined = loadableIcon(() => import('@material-ui/icons/PublicOutlined'));
export const PublishOutlined = loadableIcon(() => import('@material-ui/icons/PublishOutlined'));
export const QueryBuilderOutlined = loadableIcon(() =>
  import('@material-ui/icons/QueryBuilderOutlined'),
);
export const QuestionAnswerOutlined = loadableIcon(() =>
  import('@material-ui/icons/QuestionAnswerOutlined'),
);
export const QueueMusicOutlined = loadableIcon(() =>
  import('@material-ui/icons/QueueMusicOutlined'),
);
export const QueueOutlined = loadableIcon(() => import('@material-ui/icons/QueueOutlined'));
export const QueuePlayNextOutlined = loadableIcon(() =>
  import('@material-ui/icons/QueuePlayNextOutlined'),
);
export const RadioButtonCheckedOutlined = loadableIcon(() =>
  import('@material-ui/icons/RadioButtonCheckedOutlined'),
);
export const RadioButtonUncheckedOutlined = loadableIcon(() =>
  import('@material-ui/icons/RadioButtonUncheckedOutlined'),
);
export const RadioOutlined = loadableIcon(() => import('@material-ui/icons/RadioOutlined'));
export const RateReviewOutlined = loadableIcon(() =>
  import('@material-ui/icons/RateReviewOutlined'),
);
export const ReceiptOutlined = loadableIcon(() => import('@material-ui/icons/ReceiptOutlined'));
export const RecentActorsOutlined = loadableIcon(() =>
  import('@material-ui/icons/RecentActorsOutlined'),
);
export const RecordVoiceOverOutlined = loadableIcon(() =>
  import('@material-ui/icons/RecordVoiceOverOutlined'),
);
export const RedeemOutlined = loadableIcon(() => import('@material-ui/icons/RedeemOutlined'));
export const RedoOutlined = loadableIcon(() => import('@material-ui/icons/RedoOutlined'));
export const RefreshOutlined = loadableIcon(() => import('@material-ui/icons/RefreshOutlined'));
export const RemoveCircleOutlined = loadableIcon(() =>
  import('@material-ui/icons/RemoveCircleOutlined'),
);
export const RemoveCircleOutlineOutlined = loadableIcon(() =>
  import('@material-ui/icons/RemoveCircleOutlineOutlined'),
);
export const RemoveFromQueueOutlined = loadableIcon(() =>
  import('@material-ui/icons/RemoveFromQueueOutlined'),
);
export const RemoveOutlined = loadableIcon(() => import('@material-ui/icons/RemoveOutlined'));
export const RemoveRedEyeOutlined = loadableIcon(() =>
  import('@material-ui/icons/RemoveRedEyeOutlined'),
);
export const RemoveShoppingCartOutlined = loadableIcon(() =>
  import('@material-ui/icons/RemoveShoppingCartOutlined'),
);
export const ReorderOutlined = loadableIcon(() => import('@material-ui/icons/ReorderOutlined'));
export const RepeatOneOutlined = loadableIcon(() => import('@material-ui/icons/RepeatOneOutlined'));
export const RepeatOutlined = loadableIcon(() => import('@material-ui/icons/RepeatOutlined'));
export const Replay10Outlined = loadableIcon(() => import('@material-ui/icons/Replay10Outlined'));
export const Replay30Outlined = loadableIcon(() => import('@material-ui/icons/Replay30Outlined'));
export const Replay5Outlined = loadableIcon(() => import('@material-ui/icons/Replay5Outlined'));
export const ReplayOutlined = loadableIcon(() => import('@material-ui/icons/ReplayOutlined'));
export const ReplyAllOutlined = loadableIcon(() => import('@material-ui/icons/ReplyAllOutlined'));
export const ReplyOutlined = loadableIcon(() => import('@material-ui/icons/ReplyOutlined'));
export const ReportOffOutlined = loadableIcon(() => import('@material-ui/icons/ReportOffOutlined'));
export const ReportOutlined = loadableIcon(() => import('@material-ui/icons/ReportOutlined'));
export const ReportProblemOutlined = loadableIcon(() =>
  import('@material-ui/icons/ReportProblemOutlined'),
);
export const RestaurantMenuOutlined = loadableIcon(() =>
  import('@material-ui/icons/RestaurantMenuOutlined'),
);
export const RestaurantOutlined = loadableIcon(() =>
  import('@material-ui/icons/RestaurantOutlined'),
);
export const RestoreFromTrashOutlined = loadableIcon(() =>
  import('@material-ui/icons/RestoreFromTrashOutlined'),
);
export const RestoreOutlined = loadableIcon(() => import('@material-ui/icons/RestoreOutlined'));
export const RestorePageOutlined = loadableIcon(() =>
  import('@material-ui/icons/RestorePageOutlined'),
);
export const RingVolumeOutlined = loadableIcon(() =>
  import('@material-ui/icons/RingVolumeOutlined'),
);
export const RoomOutlined = loadableIcon(() => import('@material-ui/icons/RoomOutlined'));
export const RoomServiceOutlined = loadableIcon(() =>
  import('@material-ui/icons/RoomServiceOutlined'),
);
export const Rotate90DegreesCcwOutlined = loadableIcon(() =>
  import('@material-ui/icons/Rotate90DegreesCcwOutlined'),
);
export const RotateLeftOutlined = loadableIcon(() =>
  import('@material-ui/icons/RotateLeftOutlined'),
);
export const RotateRightOutlined = loadableIcon(() =>
  import('@material-ui/icons/RotateRightOutlined'),
);
export const RoundedCornerOutlined = loadableIcon(() =>
  import('@material-ui/icons/RoundedCornerOutlined'),
);
export const RouterOutlined = loadableIcon(() => import('@material-ui/icons/RouterOutlined'));
export const RowingOutlined = loadableIcon(() => import('@material-ui/icons/RowingOutlined'));
export const RssFeedOutlined = loadableIcon(() => import('@material-ui/icons/RssFeedOutlined'));
export const RvHookupOutlined = loadableIcon(() => import('@material-ui/icons/RvHookupOutlined'));
export const SatelliteOutlined = loadableIcon(() => import('@material-ui/icons/SatelliteOutlined'));
export const SaveAltOutlined = loadableIcon(() => import('@material-ui/icons/SaveAltOutlined'));
export const SaveOutlined = loadableIcon(() => import('@material-ui/icons/SaveOutlined'));
export const ScannerOutlined = loadableIcon(() => import('@material-ui/icons/ScannerOutlined'));
export const ScatterPlotOutlined = loadableIcon(() =>
  import('@material-ui/icons/ScatterPlotOutlined'),
);
export const ScheduleOutlined = loadableIcon(() => import('@material-ui/icons/ScheduleOutlined'));
export const SchoolOutlined = loadableIcon(() => import('@material-ui/icons/SchoolOutlined'));
export const ScoreOutlined = loadableIcon(() => import('@material-ui/icons/ScoreOutlined'));
export const ScreenLockLandscapeOutlined = loadableIcon(() =>
  import('@material-ui/icons/ScreenLockLandscapeOutlined'),
);
export const ScreenLockPortraitOutlined = loadableIcon(() =>
  import('@material-ui/icons/ScreenLockPortraitOutlined'),
);
export const ScreenLockRotationOutlined = loadableIcon(() =>
  import('@material-ui/icons/ScreenLockRotationOutlined'),
);
export const ScreenRotationOutlined = loadableIcon(() =>
  import('@material-ui/icons/ScreenRotationOutlined'),
);
export const ScreenShareOutlined = loadableIcon(() =>
  import('@material-ui/icons/ScreenShareOutlined'),
);
export const SdCardOutlined = loadableIcon(() => import('@material-ui/icons/SdCardOutlined'));
export const SdStorageOutlined = loadableIcon(() => import('@material-ui/icons/SdStorageOutlined'));
export const SearchOutlined = loadableIcon(() => import('@material-ui/icons/SearchOutlined'));
export const SecurityOutlined = loadableIcon(() => import('@material-ui/icons/SecurityOutlined'));
export const SelectAllOutlined = loadableIcon(() => import('@material-ui/icons/SelectAllOutlined'));
export const SendOutlined = loadableIcon(() => import('@material-ui/icons/SendOutlined'));
export const SentimentDissatisfiedOutlined = loadableIcon(() =>
  import('@material-ui/icons/SentimentDissatisfiedOutlined'),
);
export const SentimentSatisfiedAltOutlined = loadableIcon(() =>
  import('@material-ui/icons/SentimentSatisfiedAltOutlined'),
);
export const SentimentSatisfiedOutlined = loadableIcon(() =>
  import('@material-ui/icons/SentimentSatisfiedOutlined'),
);
export const SentimentVeryDissatisfiedOutlined = loadableIcon(() =>
  import('@material-ui/icons/SentimentVeryDissatisfiedOutlined'),
);
export const SentimentVerySatisfiedOutlined = loadableIcon(() =>
  import('@material-ui/icons/SentimentVerySatisfiedOutlined'),
);
export const SettingsApplicationsOutlined = loadableIcon(() =>
  import('@material-ui/icons/SettingsApplicationsOutlined'),
);
export const SettingsBackupRestoreOutlined = loadableIcon(() =>
  import('@material-ui/icons/SettingsBackupRestoreOutlined'),
);
export const SettingsBluetoothOutlined = loadableIcon(() =>
  import('@material-ui/icons/SettingsBluetoothOutlined'),
);
export const SettingsBrightnessOutlined = loadableIcon(() =>
  import('@material-ui/icons/SettingsBrightnessOutlined'),
);
export const SettingsCellOutlined = loadableIcon(() =>
  import('@material-ui/icons/SettingsCellOutlined'),
);
export const SettingsEthernetOutlined = loadableIcon(() =>
  import('@material-ui/icons/SettingsEthernetOutlined'),
);
export const SettingsInputAntennaOutlined = loadableIcon(() =>
  import('@material-ui/icons/SettingsInputAntennaOutlined'),
);
export const SettingsInputComponentOutlined = loadableIcon(() =>
  import('@material-ui/icons/SettingsInputComponentOutlined'),
);
export const SettingsInputCompositeOutlined = loadableIcon(() =>
  import('@material-ui/icons/SettingsInputCompositeOutlined'),
);
export const SettingsInputHdmiOutlined = loadableIcon(() =>
  import('@material-ui/icons/SettingsInputHdmiOutlined'),
);
export const SettingsInputSvideoOutlined = loadableIcon(() =>
  import('@material-ui/icons/SettingsInputSvideoOutlined'),
);
export const SettingsOutlined = loadableIcon(() => import('@material-ui/icons/SettingsOutlined'));
export const SettingsOverscanOutlined = loadableIcon(() =>
  import('@material-ui/icons/SettingsOverscanOutlined'),
);
export const SettingsPhoneOutlined = loadableIcon(() =>
  import('@material-ui/icons/SettingsPhoneOutlined'),
);
export const SettingsPowerOutlined = loadableIcon(() =>
  import('@material-ui/icons/SettingsPowerOutlined'),
);
export const SettingsRemoteOutlined = loadableIcon(() =>
  import('@material-ui/icons/SettingsRemoteOutlined'),
);
export const SettingsSystemDaydreamOutlined = loadableIcon(() =>
  import('@material-ui/icons/SettingsSystemDaydreamOutlined'),
);
export const SettingsVoiceOutlined = loadableIcon(() =>
  import('@material-ui/icons/SettingsVoiceOutlined'),
);
export const ShareOutlined = loadableIcon(() => import('@material-ui/icons/ShareOutlined'));
export const ShopOutlined = loadableIcon(() => import('@material-ui/icons/ShopOutlined'));
export const ShoppingBasketOutlined = loadableIcon(() =>
  import('@material-ui/icons/ShoppingBasketOutlined'),
);
export const ShoppingCartOutlined = loadableIcon(() =>
  import('@material-ui/icons/ShoppingCartOutlined'),
);
export const ShopTwoOutlined = loadableIcon(() => import('@material-ui/icons/ShopTwoOutlined'));
export const ShortTextOutlined = loadableIcon(() => import('@material-ui/icons/ShortTextOutlined'));
export const ShowChartOutlined = loadableIcon(() => import('@material-ui/icons/ShowChartOutlined'));
export const ShuffleOutlined = loadableIcon(() => import('@material-ui/icons/ShuffleOutlined'));
export const ShutterSpeedOutlined = loadableIcon(() =>
  import('@material-ui/icons/ShutterSpeedOutlined'),
);
export const SignalCellular0BarOutlined = loadableIcon(() =>
  import('@material-ui/icons/SignalCellular0BarOutlined'),
);
export const SignalCellular1BarOutlined = loadableIcon(() =>
  import('@material-ui/icons/SignalCellular1BarOutlined'),
);
export const SignalCellular2BarOutlined = loadableIcon(() =>
  import('@material-ui/icons/SignalCellular2BarOutlined'),
);
export const SignalCellular3BarOutlined = loadableIcon(() =>
  import('@material-ui/icons/SignalCellular3BarOutlined'),
);
export const SignalCellular4BarOutlined = loadableIcon(() =>
  import('@material-ui/icons/SignalCellular4BarOutlined'),
);
export const SignalCellularAltOutlined = loadableIcon(() =>
  import('@material-ui/icons/SignalCellularAltOutlined'),
);
export const SignalCellularConnectedNoInternet0BarOutlined = loadableIcon(() =>
  import('@material-ui/icons/SignalCellularConnectedNoInternet0BarOutlined'),
);
export const SignalCellularConnectedNoInternet1BarOutlined = loadableIcon(() =>
  import('@material-ui/icons/SignalCellularConnectedNoInternet1BarOutlined'),
);
export const SignalCellularConnectedNoInternet2BarOutlined = loadableIcon(() =>
  import('@material-ui/icons/SignalCellularConnectedNoInternet2BarOutlined'),
);
export const SignalCellularConnectedNoInternet3BarOutlined = loadableIcon(() =>
  import('@material-ui/icons/SignalCellularConnectedNoInternet3BarOutlined'),
);
export const SignalCellularConnectedNoInternet4BarOutlined = loadableIcon(() =>
  import('@material-ui/icons/SignalCellularConnectedNoInternet4BarOutlined'),
);
export const SignalCellularNoSimOutlined = loadableIcon(() =>
  import('@material-ui/icons/SignalCellularNoSimOutlined'),
);
export const SignalCellularNullOutlined = loadableIcon(() =>
  import('@material-ui/icons/SignalCellularNullOutlined'),
);
export const SignalCellularOffOutlined = loadableIcon(() =>
  import('@material-ui/icons/SignalCellularOffOutlined'),
);
export const SignalWifi0BarOutlined = loadableIcon(() =>
  import('@material-ui/icons/SignalWifi0BarOutlined'),
);
export const SignalWifi1BarLockOutlined = loadableIcon(() =>
  import('@material-ui/icons/SignalWifi1BarLockOutlined'),
);
export const SignalWifi1BarOutlined = loadableIcon(() =>
  import('@material-ui/icons/SignalWifi1BarOutlined'),
);
export const SignalWifi2BarLockOutlined = loadableIcon(() =>
  import('@material-ui/icons/SignalWifi2BarLockOutlined'),
);
export const SignalWifi2BarOutlined = loadableIcon(() =>
  import('@material-ui/icons/SignalWifi2BarOutlined'),
);
export const SignalWifi3BarLockOutlined = loadableIcon(() =>
  import('@material-ui/icons/SignalWifi3BarLockOutlined'),
);
export const SignalWifi3BarOutlined = loadableIcon(() =>
  import('@material-ui/icons/SignalWifi3BarOutlined'),
);
export const SignalWifi4BarLockOutlined = loadableIcon(() =>
  import('@material-ui/icons/SignalWifi4BarLockOutlined'),
);
export const SignalWifi4BarOutlined = loadableIcon(() =>
  import('@material-ui/icons/SignalWifi4BarOutlined'),
);
export const SignalWifiOffOutlined = loadableIcon(() =>
  import('@material-ui/icons/SignalWifiOffOutlined'),
);
export const SimCardOutlined = loadableIcon(() => import('@material-ui/icons/SimCardOutlined'));
export const SingleBedOutlined = loadableIcon(() => import('@material-ui/icons/SingleBedOutlined'));
export const SkipNextOutlined = loadableIcon(() => import('@material-ui/icons/SkipNextOutlined'));
export const SkipPreviousOutlined = loadableIcon(() =>
  import('@material-ui/icons/SkipPreviousOutlined'),
);
export const SlideshowOutlined = loadableIcon(() => import('@material-ui/icons/SlideshowOutlined'));
export const SlowMotionVideoOutlined = loadableIcon(() =>
  import('@material-ui/icons/SlowMotionVideoOutlined'),
);
export const SmartphoneOutlined = loadableIcon(() =>
  import('@material-ui/icons/SmartphoneOutlined'),
);
export const SmokeFreeOutlined = loadableIcon(() => import('@material-ui/icons/SmokeFreeOutlined'));
export const SmokingRoomsOutlined = loadableIcon(() =>
  import('@material-ui/icons/SmokingRoomsOutlined'),
);
export const SmsFailedOutlined = loadableIcon(() => import('@material-ui/icons/SmsFailedOutlined'));
export const SmsOutlined = loadableIcon(() => import('@material-ui/icons/SmsOutlined'));
export const SnoozeOutlined = loadableIcon(() => import('@material-ui/icons/SnoozeOutlined'));
export const SortByAlphaOutlined = loadableIcon(() =>
  import('@material-ui/icons/SortByAlphaOutlined'),
);
export const SortOutlined = loadableIcon(() => import('@material-ui/icons/SortOutlined'));
export const SpaceBarOutlined = loadableIcon(() => import('@material-ui/icons/SpaceBarOutlined'));
export const SpaOutlined = loadableIcon(() => import('@material-ui/icons/SpaOutlined'));
export const SpeakerGroupOutlined = loadableIcon(() =>
  import('@material-ui/icons/SpeakerGroupOutlined'),
);
export const SpeakerNotesOffOutlined = loadableIcon(() =>
  import('@material-ui/icons/SpeakerNotesOffOutlined'),
);
export const SpeakerNotesOutlined = loadableIcon(() =>
  import('@material-ui/icons/SpeakerNotesOutlined'),
);
export const SpeakerOutlined = loadableIcon(() => import('@material-ui/icons/SpeakerOutlined'));
export const SpeakerPhoneOutlined = loadableIcon(() =>
  import('@material-ui/icons/SpeakerPhoneOutlined'),
);
export const SpeedOutlined = loadableIcon(() => import('@material-ui/icons/SpeedOutlined'));
export const SpellcheckOutlined = loadableIcon(() =>
  import('@material-ui/icons/SpellcheckOutlined'),
);
export const SportsBaseballOutlined = loadableIcon(() =>
  import('@material-ui/icons/SportsBaseballOutlined'),
);
export const SportsBasketballOutlined = loadableIcon(() =>
  import('@material-ui/icons/SportsBasketballOutlined'),
);
export const SportsCricketOutlined = loadableIcon(() =>
  import('@material-ui/icons/SportsCricketOutlined'),
);
export const SportsEsportsOutlined = loadableIcon(() =>
  import('@material-ui/icons/SportsEsportsOutlined'),
);
export const SportsFootballOutlined = loadableIcon(() =>
  import('@material-ui/icons/SportsFootballOutlined'),
);
export const SportsGolfOutlined = loadableIcon(() =>
  import('@material-ui/icons/SportsGolfOutlined'),
);
export const SportsHandballOutlined = loadableIcon(() =>
  import('@material-ui/icons/SportsHandballOutlined'),
);
export const SportsHockeyOutlined = loadableIcon(() =>
  import('@material-ui/icons/SportsHockeyOutlined'),
);
export const SportsKabaddiOutlined = loadableIcon(() =>
  import('@material-ui/icons/SportsKabaddiOutlined'),
);
export const SportsMmaOutlined = loadableIcon(() => import('@material-ui/icons/SportsMmaOutlined'));
export const SportsMotorsportsOutlined = loadableIcon(() =>
  import('@material-ui/icons/SportsMotorsportsOutlined'),
);
export const SportsOutlined = loadableIcon(() => import('@material-ui/icons/SportsOutlined'));
export const SportsRugbyOutlined = loadableIcon(() =>
  import('@material-ui/icons/SportsRugbyOutlined'),
);
export const SportsSoccerOutlined = loadableIcon(() =>
  import('@material-ui/icons/SportsSoccerOutlined'),
);
export const SportsTennisOutlined = loadableIcon(() =>
  import('@material-ui/icons/SportsTennisOutlined'),
);
export const SportsVolleyballOutlined = loadableIcon(() =>
  import('@material-ui/icons/SportsVolleyballOutlined'),
);
export const SquareFootOutlined = loadableIcon(() =>
  import('@material-ui/icons/SquareFootOutlined'),
);
export const StarBorderOutlined = loadableIcon(() =>
  import('@material-ui/icons/StarBorderOutlined'),
);
export const StarHalfOutlined = loadableIcon(() => import('@material-ui/icons/StarHalfOutlined'));
export const StarOutlined = loadableIcon(() => import('@material-ui/icons/StarOutlined'));
export const StarOutlineOutlined = loadableIcon(() =>
  import('@material-ui/icons/StarOutlineOutlined'),
);
export const StarRateOutlined = loadableIcon(() => import('@material-ui/icons/StarRateOutlined'));
export const StarsOutlined = loadableIcon(() => import('@material-ui/icons/StarsOutlined'));
export const StayCurrentLandscapeOutlined = loadableIcon(() =>
  import('@material-ui/icons/StayCurrentLandscapeOutlined'),
);
export const StayCurrentPortraitOutlined = loadableIcon(() =>
  import('@material-ui/icons/StayCurrentPortraitOutlined'),
);
export const StayPrimaryLandscapeOutlined = loadableIcon(() =>
  import('@material-ui/icons/StayPrimaryLandscapeOutlined'),
);
export const StayPrimaryPortraitOutlined = loadableIcon(() =>
  import('@material-ui/icons/StayPrimaryPortraitOutlined'),
);
export const StopOutlined = loadableIcon(() => import('@material-ui/icons/StopOutlined'));
export const StopScreenShareOutlined = loadableIcon(() =>
  import('@material-ui/icons/StopScreenShareOutlined'),
);
export const StorageOutlined = loadableIcon(() => import('@material-ui/icons/StorageOutlined'));
export const StorefrontOutlined = loadableIcon(() =>
  import('@material-ui/icons/StorefrontOutlined'),
);
export const StoreMallDirectoryOutlined = loadableIcon(() =>
  import('@material-ui/icons/StoreMallDirectoryOutlined'),
);
export const StoreOutlined = loadableIcon(() => import('@material-ui/icons/StoreOutlined'));
export const StraightenOutlined = loadableIcon(() =>
  import('@material-ui/icons/StraightenOutlined'),
);
export const StreetviewOutlined = loadableIcon(() =>
  import('@material-ui/icons/StreetviewOutlined'),
);
export const StrikethroughSOutlined = loadableIcon(() =>
  import('@material-ui/icons/StrikethroughSOutlined'),
);
export const StyleOutlined = loadableIcon(() => import('@material-ui/icons/StyleOutlined'));
export const SubdirectoryArrowLeftOutlined = loadableIcon(() =>
  import('@material-ui/icons/SubdirectoryArrowLeftOutlined'),
);
export const SubdirectoryArrowRightOutlined = loadableIcon(() =>
  import('@material-ui/icons/SubdirectoryArrowRightOutlined'),
);
export const SubjectOutlined = loadableIcon(() => import('@material-ui/icons/SubjectOutlined'));
export const SubscriptionsOutlined = loadableIcon(() =>
  import('@material-ui/icons/SubscriptionsOutlined'),
);
export const SubtitlesOutlined = loadableIcon(() => import('@material-ui/icons/SubtitlesOutlined'));
export const SubwayOutlined = loadableIcon(() => import('@material-ui/icons/SubwayOutlined'));
export const SupervisedUserCircleOutlined = loadableIcon(() =>
  import('@material-ui/icons/SupervisedUserCircleOutlined'),
);
export const SupervisorAccountOutlined = loadableIcon(() =>
  import('@material-ui/icons/SupervisorAccountOutlined'),
);
export const SurroundSoundOutlined = loadableIcon(() =>
  import('@material-ui/icons/SurroundSoundOutlined'),
);
export const SwapCallsOutlined = loadableIcon(() => import('@material-ui/icons/SwapCallsOutlined'));
export const SwapHorizontalCircleOutlined = loadableIcon(() =>
  import('@material-ui/icons/SwapHorizontalCircleOutlined'),
);
export const SwapHorizOutlined = loadableIcon(() => import('@material-ui/icons/SwapHorizOutlined'));
export const SwapVerticalCircleOutlined = loadableIcon(() =>
  import('@material-ui/icons/SwapVerticalCircleOutlined'),
);
export const SwapVertOutlined = loadableIcon(() => import('@material-ui/icons/SwapVertOutlined'));
export const SwitchCameraOutlined = loadableIcon(() =>
  import('@material-ui/icons/SwitchCameraOutlined'),
);
export const SwitchVideoOutlined = loadableIcon(() =>
  import('@material-ui/icons/SwitchVideoOutlined'),
);
export const SyncAltOutlined = loadableIcon(() => import('@material-ui/icons/SyncAltOutlined'));
export const SyncDisabledOutlined = loadableIcon(() =>
  import('@material-ui/icons/SyncDisabledOutlined'),
);
export const SyncOutlined = loadableIcon(() => import('@material-ui/icons/SyncOutlined'));
export const SyncProblemOutlined = loadableIcon(() =>
  import('@material-ui/icons/SyncProblemOutlined'),
);
export const SystemUpdateAltOutlined = loadableIcon(() =>
  import('@material-ui/icons/SystemUpdateAltOutlined'),
);
export const SystemUpdateOutlined = loadableIcon(() =>
  import('@material-ui/icons/SystemUpdateOutlined'),
);
export const TableChartOutlined = loadableIcon(() =>
  import('@material-ui/icons/TableChartOutlined'),
);
export const TabletAndroidOutlined = loadableIcon(() =>
  import('@material-ui/icons/TabletAndroidOutlined'),
);
export const TabletMacOutlined = loadableIcon(() => import('@material-ui/icons/TabletMacOutlined'));
export const TabletOutlined = loadableIcon(() => import('@material-ui/icons/TabletOutlined'));
export const TabOutlined = loadableIcon(() => import('@material-ui/icons/TabOutlined'));
export const TabUnselectedOutlined = loadableIcon(() =>
  import('@material-ui/icons/TabUnselectedOutlined'),
);
export const TagFacesOutlined = loadableIcon(() => import('@material-ui/icons/TagFacesOutlined'));
export const TapAndPlayOutlined = loadableIcon(() =>
  import('@material-ui/icons/TapAndPlayOutlined'),
);
export const TerrainOutlined = loadableIcon(() => import('@material-ui/icons/TerrainOutlined'));
export const TextFieldsOutlined = loadableIcon(() =>
  import('@material-ui/icons/TextFieldsOutlined'),
);
export const TextFormatOutlined = loadableIcon(() =>
  import('@material-ui/icons/TextFormatOutlined'),
);
export const TextRotateUpOutlined = loadableIcon(() =>
  import('@material-ui/icons/TextRotateUpOutlined'),
);
export const TextRotateVerticalOutlined = loadableIcon(() =>
  import('@material-ui/icons/TextRotateVerticalOutlined'),
);
export const TextRotationAngledownOutlined = loadableIcon(() =>
  import('@material-ui/icons/TextRotationAngledownOutlined'),
);
export const TextRotationAngleupOutlined = loadableIcon(() =>
  import('@material-ui/icons/TextRotationAngleupOutlined'),
);
export const TextRotationDownOutlined = loadableIcon(() =>
  import('@material-ui/icons/TextRotationDownOutlined'),
);
export const TextRotationNoneOutlined = loadableIcon(() =>
  import('@material-ui/icons/TextRotationNoneOutlined'),
);
export const TextsmsOutlined = loadableIcon(() => import('@material-ui/icons/TextsmsOutlined'));
export const TextureOutlined = loadableIcon(() => import('@material-ui/icons/TextureOutlined'));
export const TheatersOutlined = loadableIcon(() => import('@material-ui/icons/TheatersOutlined'));
export const ThreeDRotationOutlined = loadableIcon(() =>
  import('@material-ui/icons/ThreeDRotationOutlined'),
);
export const ThreeSixtyOutlined = loadableIcon(() =>
  import('@material-ui/icons/ThreeSixtyOutlined'),
);
export const ThumbDownAltOutlined = loadableIcon(() =>
  import('@material-ui/icons/ThumbDownAltOutlined'),
);
export const ThumbDownOutlined = loadableIcon(() => import('@material-ui/icons/ThumbDownOutlined'));
export const ThumbsUpDownOutlined = loadableIcon(() =>
  import('@material-ui/icons/ThumbsUpDownOutlined'),
);
export const ThumbUpAltOutlined = loadableIcon(() =>
  import('@material-ui/icons/ThumbUpAltOutlined'),
);
export const ThumbUpOutlined = loadableIcon(() => import('@material-ui/icons/ThumbUpOutlined'));
export const TimelapseOutlined = loadableIcon(() => import('@material-ui/icons/TimelapseOutlined'));
export const TimelineOutlined = loadableIcon(() => import('@material-ui/icons/TimelineOutlined'));
export const Timer10Outlined = loadableIcon(() => import('@material-ui/icons/Timer10Outlined'));
export const Timer3Outlined = loadableIcon(() => import('@material-ui/icons/Timer3Outlined'));
export const TimerOffOutlined = loadableIcon(() => import('@material-ui/icons/TimerOffOutlined'));
export const TimerOutlined = loadableIcon(() => import('@material-ui/icons/TimerOutlined'));
export const TimeToLeaveOutlined = loadableIcon(() =>
  import('@material-ui/icons/TimeToLeaveOutlined'),
);
export const TitleOutlined = loadableIcon(() => import('@material-ui/icons/TitleOutlined'));
export const TocOutlined = loadableIcon(() => import('@material-ui/icons/TocOutlined'));
export const TodayOutlined = loadableIcon(() => import('@material-ui/icons/TodayOutlined'));
export const ToggleOffOutlined = loadableIcon(() => import('@material-ui/icons/ToggleOffOutlined'));
export const ToggleOnOutlined = loadableIcon(() => import('@material-ui/icons/ToggleOnOutlined'));
export const TollOutlined = loadableIcon(() => import('@material-ui/icons/TollOutlined'));
export const TonalityOutlined = loadableIcon(() => import('@material-ui/icons/TonalityOutlined'));
export const TouchAppOutlined = loadableIcon(() => import('@material-ui/icons/TouchAppOutlined'));
export const ToysOutlined = loadableIcon(() => import('@material-ui/icons/ToysOutlined'));
export const TrackChangesOutlined = loadableIcon(() =>
  import('@material-ui/icons/TrackChangesOutlined'),
);
export const TrafficOutlined = loadableIcon(() => import('@material-ui/icons/TrafficOutlined'));
export const TrainOutlined = loadableIcon(() => import('@material-ui/icons/TrainOutlined'));
export const TramOutlined = loadableIcon(() => import('@material-ui/icons/TramOutlined'));
export const TransferWithinAStationOutlined = loadableIcon(() =>
  import('@material-ui/icons/TransferWithinAStationOutlined'),
);
export const TransformOutlined = loadableIcon(() => import('@material-ui/icons/TransformOutlined'));
export const TransitEnterexitOutlined = loadableIcon(() =>
  import('@material-ui/icons/TransitEnterexitOutlined'),
);
export const TranslateOutlined = loadableIcon(() => import('@material-ui/icons/TranslateOutlined'));
export const TrendingDownOutlined = loadableIcon(() =>
  import('@material-ui/icons/TrendingDownOutlined'),
);
export const TrendingFlatOutlined = loadableIcon(() =>
  import('@material-ui/icons/TrendingFlatOutlined'),
);
export const TrendingUpOutlined = loadableIcon(() =>
  import('@material-ui/icons/TrendingUpOutlined'),
);
export const TripOriginOutlined = loadableIcon(() =>
  import('@material-ui/icons/TripOriginOutlined'),
);
export const TuneOutlined = loadableIcon(() => import('@material-ui/icons/TuneOutlined'));
export const TurnedInNotOutlined = loadableIcon(() =>
  import('@material-ui/icons/TurnedInNotOutlined'),
);
export const TurnedInOutlined = loadableIcon(() => import('@material-ui/icons/TurnedInOutlined'));
export const TvOffOutlined = loadableIcon(() => import('@material-ui/icons/TvOffOutlined'));
export const TvOutlined = loadableIcon(() => import('@material-ui/icons/TvOutlined'));
export const TwoWheelerOutlined = loadableIcon(() =>
  import('@material-ui/icons/TwoWheelerOutlined'),
);
export const UnarchiveOutlined = loadableIcon(() => import('@material-ui/icons/UnarchiveOutlined'));
export const UndoOutlined = loadableIcon(() => import('@material-ui/icons/UndoOutlined'));
export const UnfoldLessOutlined = loadableIcon(() =>
  import('@material-ui/icons/UnfoldLessOutlined'),
);
export const UnfoldMoreOutlined = loadableIcon(() =>
  import('@material-ui/icons/UnfoldMoreOutlined'),
);
export const UnsubscribeOutlined = loadableIcon(() =>
  import('@material-ui/icons/UnsubscribeOutlined'),
);
export const UpdateOutlined = loadableIcon(() => import('@material-ui/icons/UpdateOutlined'));
export const UsbOutlined = loadableIcon(() => import('@material-ui/icons/UsbOutlined'));
export const VerifiedUserOutlined = loadableIcon(() =>
  import('@material-ui/icons/VerifiedUserOutlined'),
);
export const VerticalAlignBottomOutlined = loadableIcon(() =>
  import('@material-ui/icons/VerticalAlignBottomOutlined'),
);
export const VerticalAlignCenterOutlined = loadableIcon(() =>
  import('@material-ui/icons/VerticalAlignCenterOutlined'),
);
export const VerticalAlignTopOutlined = loadableIcon(() =>
  import('@material-ui/icons/VerticalAlignTopOutlined'),
);
export const VerticalSplitOutlined = loadableIcon(() =>
  import('@material-ui/icons/VerticalSplitOutlined'),
);
export const VibrationOutlined = loadableIcon(() => import('@material-ui/icons/VibrationOutlined'));
export const VideoCallOutlined = loadableIcon(() => import('@material-ui/icons/VideoCallOutlined'));
export const VideocamOffOutlined = loadableIcon(() =>
  import('@material-ui/icons/VideocamOffOutlined'),
);
export const VideocamOutlined = loadableIcon(() => import('@material-ui/icons/VideocamOutlined'));
export const VideogameAssetOutlined = loadableIcon(() =>
  import('@material-ui/icons/VideogameAssetOutlined'),
);
export const VideoLabelOutlined = loadableIcon(() =>
  import('@material-ui/icons/VideoLabelOutlined'),
);
export const VideoLibraryOutlined = loadableIcon(() =>
  import('@material-ui/icons/VideoLibraryOutlined'),
);
export const ViewAgendaOutlined = loadableIcon(() =>
  import('@material-ui/icons/ViewAgendaOutlined'),
);
export const ViewArrayOutlined = loadableIcon(() => import('@material-ui/icons/ViewArrayOutlined'));
export const ViewCarouselOutlined = loadableIcon(() =>
  import('@material-ui/icons/ViewCarouselOutlined'),
);
export const ViewColumnOutlined = loadableIcon(() =>
  import('@material-ui/icons/ViewColumnOutlined'),
);
export const ViewComfyOutlined = loadableIcon(() => import('@material-ui/icons/ViewComfyOutlined'));
export const ViewCompactOutlined = loadableIcon(() =>
  import('@material-ui/icons/ViewCompactOutlined'),
);
export const ViewDayOutlined = loadableIcon(() => import('@material-ui/icons/ViewDayOutlined'));
export const ViewHeadlineOutlined = loadableIcon(() =>
  import('@material-ui/icons/ViewHeadlineOutlined'),
);
export const ViewListOutlined = loadableIcon(() => import('@material-ui/icons/ViewListOutlined'));
export const ViewModuleOutlined = loadableIcon(() =>
  import('@material-ui/icons/ViewModuleOutlined'),
);
export const ViewQuiltOutlined = loadableIcon(() => import('@material-ui/icons/ViewQuiltOutlined'));
export const ViewStreamOutlined = loadableIcon(() =>
  import('@material-ui/icons/ViewStreamOutlined'),
);
export const ViewWeekOutlined = loadableIcon(() => import('@material-ui/icons/ViewWeekOutlined'));
export const VignetteOutlined = loadableIcon(() => import('@material-ui/icons/VignetteOutlined'));
export const VisibilityOffOutlined = loadableIcon(() =>
  import('@material-ui/icons/VisibilityOffOutlined'),
);
export const VisibilityOutlined = loadableIcon(() =>
  import('@material-ui/icons/VisibilityOutlined'),
);
export const VoiceChatOutlined = loadableIcon(() => import('@material-ui/icons/VoiceChatOutlined'));
export const VoicemailOutlined = loadableIcon(() => import('@material-ui/icons/VoicemailOutlined'));
export const VoiceOverOffOutlined = loadableIcon(() =>
  import('@material-ui/icons/VoiceOverOffOutlined'),
);
export const VolumeDownOutlined = loadableIcon(() =>
  import('@material-ui/icons/VolumeDownOutlined'),
);
export const VolumeMuteOutlined = loadableIcon(() =>
  import('@material-ui/icons/VolumeMuteOutlined'),
);
export const VolumeOffOutlined = loadableIcon(() => import('@material-ui/icons/VolumeOffOutlined'));
export const VolumeUpOutlined = loadableIcon(() => import('@material-ui/icons/VolumeUpOutlined'));
export const VpnKeyOutlined = loadableIcon(() => import('@material-ui/icons/VpnKeyOutlined'));
export const VpnLockOutlined = loadableIcon(() => import('@material-ui/icons/VpnLockOutlined'));
export const WallpaperOutlined = loadableIcon(() => import('@material-ui/icons/WallpaperOutlined'));
export const WarningOutlined = loadableIcon(() => import('@material-ui/icons/WarningOutlined'));
export const WatchLaterOutlined = loadableIcon(() =>
  import('@material-ui/icons/WatchLaterOutlined'),
);
export const WatchOutlined = loadableIcon(() => import('@material-ui/icons/WatchOutlined'));
export const WavesOutlined = loadableIcon(() => import('@material-ui/icons/WavesOutlined'));
export const WbAutoOutlined = loadableIcon(() => import('@material-ui/icons/WbAutoOutlined'));
export const WbCloudyOutlined = loadableIcon(() => import('@material-ui/icons/WbCloudyOutlined'));
export const WbIncandescentOutlined = loadableIcon(() =>
  import('@material-ui/icons/WbIncandescentOutlined'),
);
export const WbIridescentOutlined = loadableIcon(() =>
  import('@material-ui/icons/WbIridescentOutlined'),
);
export const WbSunnyOutlined = loadableIcon(() => import('@material-ui/icons/WbSunnyOutlined'));
export const WcOutlined = loadableIcon(() => import('@material-ui/icons/WcOutlined'));
export const WebAssetOutlined = loadableIcon(() => import('@material-ui/icons/WebAssetOutlined'));
export const WebOutlined = loadableIcon(() => import('@material-ui/icons/WebOutlined'));
export const WeekendOutlined = loadableIcon(() => import('@material-ui/icons/WeekendOutlined'));
export const WhatshotOutlined = loadableIcon(() => import('@material-ui/icons/WhatshotOutlined'));
export const WhereToVoteOutlined = loadableIcon(() =>
  import('@material-ui/icons/WhereToVoteOutlined'),
);
export const WidgetsOutlined = loadableIcon(() => import('@material-ui/icons/WidgetsOutlined'));
export const WifiLockOutlined = loadableIcon(() => import('@material-ui/icons/WifiLockOutlined'));
export const WifiOffOutlined = loadableIcon(() => import('@material-ui/icons/WifiOffOutlined'));
export const WifiOutlined = loadableIcon(() => import('@material-ui/icons/WifiOutlined'));
export const WifiTetheringOutlined = loadableIcon(() =>
  import('@material-ui/icons/WifiTetheringOutlined'),
);
export const WorkOffOutlined = loadableIcon(() => import('@material-ui/icons/WorkOffOutlined'));
export const WorkOutlined = loadableIcon(() => import('@material-ui/icons/WorkOutlined'));
export const WorkOutlineOutlined = loadableIcon(() =>
  import('@material-ui/icons/WorkOutlineOutlined'),
);
export const WrapTextOutlined = loadableIcon(() => import('@material-ui/icons/WrapTextOutlined'));
export const YoutubeSearchedForOutlined = loadableIcon(() =>
  import('@material-ui/icons/YoutubeSearchedForOutlined'),
);
export const ZoomInOutlined = loadableIcon(() => import('@material-ui/icons/ZoomInOutlined'));
export const ZoomOutMapOutlined = loadableIcon(() =>
  import('@material-ui/icons/ZoomOutMapOutlined'),
);
