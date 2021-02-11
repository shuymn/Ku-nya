import { h, FunctionalComponent } from 'preact'
import AspectRatioSettingSection from '../components/AspectRatioSettingSection'
import ModeSettingsSection from '../components/ModeSettingSection'
import SafeSection from '../components/SafeSection'
import TagSettingSection from '../components/TagSettingSection'
import {
  Options,
  setMode,
  setAspectRatioSettings,
  setExcludingTags,
  setSafe,
} from '../lib/options'

interface Props {
  initialOptions: Options
}

const SettingPanel: FunctionalComponent<Props> = ({
  initialOptions: {
    mode,
    isExcludingHighAspectRatio,
    smallestIncludableAspectRatio,
    excludingTags,
    isSafe,
  },
}) => (
  <div>
    <SafeSection initial_is_safe={isSafe} update={setSafe} />
    <ModeSettingsSection initialValue={mode} update={setMode} />
    <AspectRatioSettingSection
      initial_is_excluding_high_aspect_ratio={isExcludingHighAspectRatio}
      initial_smallest_includable_aspect_ratio={smallestIncludableAspectRatio}
      update={setAspectRatioSettings}
    />
    <TagSettingSection initialTags={excludingTags} update={setExcludingTags} />
  </div>
)

export default SettingPanel
