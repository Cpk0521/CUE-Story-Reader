export const AdvAssetsResource = {
    TouchScreenText : './Assets/Images/ui/Common_TouchScreenText.png',
    Copyright : './Assets/Images/misc/Title_CopyW.png',
    //Meun
    MenuPanel : './Assets/Images/ui/Scenario_MenuPanel.png',
    MenuPanel_Off  : './Assets/Images/ui/Scenario_MenuPanelOff.png',
    MenuButton : './Assets/Images/ui/Scenario_MenuButton.png',
    MenuButton_On : './Assets/Images/ui/Scenario_MenuButton_On.png',
    MenuBackButton : './Assets/Images/ui/Scenario_MenuBackButton.png',
    MenuAutoButton_On : './Assets/Images/ui/Scenario_MenuAutoButton_On.png',
    MenuAutoButton : './Assets/Images/ui/Scenario_MenuAutoButton.png',
    MenuLogButton : './Assets/Images/ui/Scenario_MenuLogButton.png',
    MenuUIHideButton : './Assets/Images/ui/Scenario_MenuUIHideButton.png',
    MenuSkipButton : './Assets/Images/ui/Scenario_MenuSkipButton.png',
    //Message
    nameTag : './Assets/Images/ui/Scenario_NameBg1.png',
    messgaePanel : './Assets/Images/ui/Scenario_TalkPanel.png',
    messgaePanel_long : './Assets/Images/ui/Scenario_TalkPanel_long.png',
    TalkIcon : './Assets/Images/ui/Scenario_TalkIcon.png',
    Auto1 : './Assets/Images/ui/Scenario_Auto1.png',
    Auto2 : './Assets/Images/ui/Scenario_Auto2.png',
    Auto3 : './Assets/Images/ui/Scenario_Auto3.png',
    Auto4 : './Assets/Images/ui/Scenario_Auto4.png',
    //Loading
    book_anm_reverse : './Assets/Images/misc/ef_book_anm_reverse.png',
    book_shadow : './Assets/Images/misc/ef_book_shadow.png',
    gradation : './Assets/Images/misc/ef_gradation_alpha_4.png',
    loadingtext : './Assets/Images/misc/ef_loadingtext_e2.png',
    //Trans
    T4 : './Assets/Images/misc/T4.png',
    T9 : './Assets/Images/misc/T9.png',
    //tap effect
    Tap_Texture : './Assets/Images/misc/Tap_Texture02.png',
}

export const AdvFont = {
    normal : {
        normal : './Assets/Font/FOT_RodinCattleya_Pro_DB.otf',
        Bold : './Assets/Font/FOT_RodinCattleya_Pro_B.otf',
        bolder : './Assets/Font/FOT_RodinCattleya_Pro_EB.otf',
    },
    zh : {
        normal : './Assets/Font/NotoSansTC_Medium.otf',
        Bold : './Assets/Font/NotoSansTC_Bold.otf',
        bolder : './Assets/Font/NotoSansTC_Black.otf',
    }
}

export const ResourcePath = {
    scenarioSrc : './Assets/Scenario/',
    translationSrc : 'https://raw.githubusercontent.com/Cpk0521/CueStoryResource/main/scenario/',
    bgSrc : './Assets/Backgrounds/',
    l2dSrc : 'https://raw.githubusercontent.com/Cpk0521/CueStoryResource/main/',
    voiceSrc : 'https://raw.githubusercontent.com/Cpk0521/CueStoryResource/main/voice/',
    imageSrc : 'https://raw.githubusercontent.com/Cpk0521/CUECardsViewer/master/public/Cards/',
    movieSrc : './Assets/Movie/',
}

export const ADV_WIDTH = 1334
export const ADV_HIGHT = 750

export const VERSION = "0.1.1";

export const AssetConfig = {
    AdvAssetsResource,
    AdvFont,
}

export default {
    VERSION,
    ADV_WIDTH,
    ADV_HIGHT,
    ResourcePath,
    AssetConfig
}
