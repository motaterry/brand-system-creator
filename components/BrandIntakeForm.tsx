"use client";

import { useState, useRef, useEffect } from "react";
import { BrandIntake } from "@/lib/schema";
import { DEFAULT_INTAKE, PRESET_OPTIONS, EXAMPLE_PRESETS } from "@/lib/presets";
import { generateCursorTask, downloadBrandPack, copyToClipboard } from "@/lib/generator";
import { Clipboard, Download } from "lucide-react";

export default function BrandIntakeForm() {
  const [intake, setIntake] = useState<BrandIntake>({
    ...DEFAULT_INTAKE,
    projectName: "",
    brandName: "",
    industry: "",
    outputPreset: [],
    primaryUseCase: "",
    positioningStatement: "",
    voiceCharacteristics: [],
    requiresLogoExploration: false,
    createdAt: new Date().toISOString(),
  } as BrandIntake);

  const [notification, setNotification] = useState<string>("");
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);
  const [presetsExpanded, setPresetsExpanded] = useState<boolean>(false);

  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(""), 3000);
  };

  const handleInputChange = (field: keyof BrandIntake, value: any) => {
    setIntake({ ...intake, [field]: value });
    // Resetar seleção visual quando usuário modifica campos manualmente
    if (selectedPreset && field !== 'createdAt') {
      setSelectedPreset(null);
    }
  };

  const handleArrayAdd = (field: keyof BrandIntake, value: string) => {
    if (value.trim()) {
      const currentArray = (intake[field] as string[]) || [];
      handleInputChange(field, [...currentArray, value.trim()]);
    }
  };

  const handleArrayRemove = (field: keyof BrandIntake, index: number) => {
    const currentArray = (intake[field] as string[]) || [];
    handleInputChange(
      field,
      currentArray.filter((_, i) => i !== index)
    );
  };

  const handleSliderChange = (attribute: keyof BrandIntake["toneAttributes"], value: number) => {
    handleInputChange("toneAttributes", {
      ...intake.toneAttributes,
      [attribute]: value,
    });
  };

  const handlePresetLoad = (presetName: string) => {
    const preset = EXAMPLE_PRESETS[presetName];
    if (preset) {
      // Converter outputPreset de string para array se necessário (compatibilidade)
      const outputPreset = Array.isArray(preset.outputPreset) 
        ? preset.outputPreset 
        : preset.outputPreset 
          ? [preset.outputPreset] 
          : [];
      
      setIntake({
        ...intake,
        ...preset,
        outputPreset,
        createdAt: new Date().toISOString(),
      });
      setSelectedPreset(presetName); // Marcar como selecionado
      showNotification(`Loaded preset: ${presetName}`);
    }
  };

  const handleCopyTask = async () => {
    const task = generateCursorTask(intake);
    try {
      await copyToClipboard(task);
      showNotification("Cursor task copied to clipboard!");
    } catch (err) {
      showNotification("Failed to copy to clipboard");
    }
  };

  const handleDownloadPack = () => {
    if (!intake.projectName || !intake.brandName) {
      showNotification("Please fill in Project Name and Brand Name first");
      return;
    }
    downloadBrandPack(intake);
    showNotification("Downloading brand pack...");
  };

  const isValid = intake.projectName && intake.brandName && intake.industry && intake.primaryUseCase && intake.outputPreset.length > 0;

  return (
    <div className="space-y-12">
      {/* Notification */}
      {notification && (
        <div className="fixed top-16 right-4 bg-primary dark:bg-primary text-neutral-dark-90 dark:text-neutral-dark-90 px-6 py-3 rounded-lg shadow-lg z-50 font-semibold transition-colors duration-300">
          {notification}
        </div>
      )}

      {/* Presets */}
      <div className="bg-tint-90 dark:bg-neutral-dark-70 rounded-lg p-6 transition-colors duration-300">
        <div className="flex items-center justify-between mb-4">
          <label className="block text-sm font-semibold text-neutral-dark-90 dark:text-neutral-light-90 transition-colors duration-300">
            Quick Start Presets
          </label>
          <button
            onClick={() => setPresetsExpanded(!presetsExpanded)}
            className="flex items-center gap-1 px-1.5 py-0.5 rounded-md text-xs text-neutral-dark-70 dark:text-neutral-light-60 hover:text-neutral-dark-90 dark:hover:text-neutral-light-90 hover:bg-primary/20 dark:hover:bg-primary/30 transition-all"
            aria-label={presetsExpanded ? "Colapsar presets" : "Expandir presets"}
          >
            <span>{presetsExpanded ? "Ocultar" : "Mostrar"}</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={`transition-transform duration-200 ${presetsExpanded ? 'rotate-180' : ''}`}
            >
              <path
                d="M4 6L8 10L12 6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        {!presetsExpanded && (
          <div className="flex flex-wrap gap-2 mb-2">
            {Object.entries(EXAMPLE_PRESETS).map(([presetName, presetData]) => {
              const isSelected = selectedPreset === presetName;
              return (
                <button
                  key={presetName}
                  onClick={() => handlePresetLoad(presetName)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    isSelected
                      ? "bg-primary text-neutral-dark-90 dark:text-neutral-dark-90 border border-neutral-dark-90 dark:border-neutral-dark-90"
                      : "bg-white/60 dark:bg-neutral-dark-60 text-neutral-dark-70 dark:text-neutral-light-60 border border-neutral-dark-40 dark:border-neutral-dark-50 hover:bg-primary/30 dark:hover:bg-primary/20 hover:border-primary"
                  }`}
                >
                  {presetName}
                </button>
              );
            })}
          </div>
        )}
        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${presetsExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
          <div>
            <p className="text-xs text-neutral-dark-50 dark:text-neutral-light-50 mb-4 transition-colors duration-300">Clique em um preset para preencher automaticamente o formulário com valores de exemplo</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 items-start">
          {Object.entries(EXAMPLE_PRESETS).map(([presetName, presetData]) => (
            <div
              key={presetName}
              className={`group text-left p-4 border-2 rounded-lg transition-all h-full flex flex-col relative ${
                selectedPreset === presetName
                  ? "border-neutral-dark-90 dark:border-primary dark:border-2 bg-primary dark:bg-primary shadow-md"
                  : "border border-neutral-dark-40 dark:border-neutral-dark-50 bg-tint-90 dark:bg-neutral-dark-70 hover:border-primary dark:hover:border-primary"
              }`}
            >
              {selectedPreset === presetName && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedPreset(null);
                  }}
                  className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center rounded-full hover:bg-neutral-light-10/20 dark:hover:bg-neutral-dark-60 transition-colors"
                  aria-label="Remover preset"
                >
                  <svg 
                    width="16" 
                    height="16" 
                    viewBox="0 0 16 16" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-neutral-dark-90 dark:text-neutral-dark-90"
                  >
                    <path 
                      d="M4 4L12 12M12 4L4 12" 
                      stroke="currentColor" 
                      strokeWidth="1.5" 
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              )}
              <button
                onClick={() => handlePresetLoad(presetName)}
                className="text-left w-full h-full flex flex-col cursor-pointer pr-10"
              >
                <div className={`font-semibold mb-2 ${selectedPreset === presetName ? 'text-neutral-dark-90 dark:text-neutral-dark-90' : 'text-neutral-dark-90 dark:text-neutral-light-90'} transition-colors duration-300`}>
                  <MultiLineBadge text={presetName} isSelected={selectedPreset === presetName} />
                </div>
                <div className={`text-xs leading-relaxed ${selectedPreset === presetName ? 'text-neutral-dark-80 dark:text-neutral-dark-80' : 'text-neutral-dark-50 dark:text-neutral-light-50'} transition-colors duration-300`}>
                  {presetData.positioningStatement || `${presetData.industry} • ${presetData.outputPreset}`}
                </div>
                <div className={`mt-3 pt-3 border-t ${selectedPreset === presetName ? 'border-neutral-dark-90 dark:border-primary' : 'border-neutral-light-60 dark:border-neutral-dark-50'} transition-colors duration-300`}>
                  <div className="flex flex-wrap gap-2">
                    {presetData.brandValues?.slice(0, 3).map((value) => (
                      <span 
                        key={value} 
                        className={`px-2 py-0.5 rounded-full text-xs transition-all font-medium border ${
                          selectedPreset === presetName
                            ? "border-neutral-dark-90 dark:border-primary text-neutral-dark-90 dark:text-neutral-dark-90 bg-primary dark:bg-primary"
                            : "bg-neutral-light-80 dark:bg-neutral-dark-60 text-neutral-dark-70 dark:text-neutral-light-70 hover:bg-neutral-light-70 dark:hover:bg-neutral-dark-50 border-neutral-light-60 dark:border-neutral-dark-50"
                        }`}
                      >
                        {value}
                      </span>
                    ))}
                  </div>
                </div>
              </button>
            </div>
          ))}
            </div>
          </div>
        </div>
      </div>

      {/* Basic Info */}
      <section>
        <h2 className="text-xl font-semibold text-neutral-dark-90 dark:text-neutral-light-90 mb-6 transition-colors duration-300">
          Basic Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-neutral-dark-70 dark:text-neutral-light-70 mb-1 transition-colors duration-300">
              Project Name <span className="text-shade-40 dark:text-primary">*</span>
            </label>
            <input
              type="text"
              value={intake.projectName}
              onChange={(e) => handleInputChange("projectName", e.target.value)}
              maxLength={100}
              className="w-full px-4 py-2 bg-white dark:bg-neutral-dark-70 border border-neutral-dark-40 dark:border-neutral-dark-50 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all"
              placeholder="my-awesome-project"
            />
            <span className="text-xs text-neutral-dark-40 dark:text-neutral-light-50 transition-colors duration-300">{intake.projectName.length}/100</span>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-dark-70 dark:text-neutral-light-70 mb-1 transition-colors duration-300">
              Brand Name <span className="text-shade-40 dark:text-primary">*</span>
            </label>
            <input
              type="text"
              value={intake.brandName}
              onChange={(e) => handleInputChange("brandName", e.target.value)}
              maxLength={100}
              className="w-full px-4 py-2 bg-white dark:bg-neutral-dark-70 border border-neutral-dark-40 dark:border-neutral-dark-50 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all"
              placeholder="Acme Inc."
            />
            <span className="text-xs text-neutral-dark-40 dark:text-neutral-light-50 transition-colors duration-300">{intake.brandName.length}/100</span>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-neutral-dark-70 dark:text-neutral-light-70 mb-1 transition-colors duration-300">
              Tagline
            </label>
            <input
              type="text"
              value={intake.tagline}
              onChange={(e) => handleInputChange("tagline", e.target.value)}
              maxLength={200}
              className="w-full px-4 py-2 bg-white dark:bg-neutral-dark-70 border border-neutral-dark-40 dark:border-neutral-dark-50 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all"
              placeholder="We make things awesome"
            />
            <span className="text-xs text-neutral-dark-40 dark:text-neutral-light-50 transition-colors duration-300">{intake.tagline.length}/200</span>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-dark-70 dark:text-neutral-light-70 mb-1 transition-colors duration-300">
              Industry <span className="text-shade-40 dark:text-primary">*</span>
            </label>
            <select
              value={intake.industry}
              onChange={(e) => handleInputChange("industry", e.target.value)}
              className="w-full pl-4 pr-10 py-2 bg-white dark:bg-neutral-dark-70 border border-neutral-dark-40 dark:border-neutral-dark-50 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all"
            >
              <option value="">Select industry...</option>
              {PRESET_OPTIONS.industries.map((ind) => (
                <option key={ind} value={ind}>
                  {ind}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-dark-70 dark:text-neutral-light-70 mb-1 transition-colors duration-300">
              Primary Use Case <span className="text-shade-40 dark:text-primary">*</span>
            </label>
            <input
              type="text"
              value={intake.primaryUseCase}
              onChange={(e) => handleInputChange("primaryUseCase", e.target.value)}
              className="w-full px-4 py-2 bg-white dark:bg-neutral-dark-70 border border-neutral-dark-40 dark:border-neutral-dark-50 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all"
              placeholder="E.g., Internal dashboard, Marketing website..."
            />
          </div>
        </div>
      </section>

      {/* Output Preset */}
      <section className="rounded-lg p-6 bg-tint-90 dark:bg-neutral-dark-70 transition-colors duration-300">
        <h2 className="text-xl font-semibold text-neutral-dark-90 dark:text-neutral-light-90 mb-6 transition-colors duration-300">
          Output Focus <span className="text-shade-40 dark:text-primary">*</span>
        </h2>
        <p className="text-sm text-neutral-dark-60 dark:text-neutral-light-60 mb-4 transition-colors duration-300">Selecione uma ou mais opções conforme suas necessidades</p>
        <div className="space-y-3">
          {PRESET_OPTIONS.outputPresets.map((preset) => {
            const isSelected = intake.outputPreset.includes(preset.value);
            return (
              <label
                key={preset.value}
                className={`flex items-start p-4 border rounded-lg cursor-pointer transition-all ${
                  isSelected
                    ? "border-neutral-dark-90 dark:border-primary bg-primary dark:bg-primary shadow-md"
                    : "border-neutral-dark-40 dark:border-neutral-dark-50 bg-tint-90 dark:bg-neutral-dark-70 hover:border-primary dark:hover:border-primary"
                }`}
              >
                <input
                  type="checkbox"
                  value={preset.value}
                  checked={isSelected}
                  onChange={(e) => {
                    const currentPresets = intake.outputPreset;
                    if (e.target.checked) {
                      handleInputChange("outputPreset", [...currentPresets, preset.value]);
                    } else {
                      handleInputChange("outputPreset", currentPresets.filter((v) => v !== preset.value));
                    }
                  }}
                  className="mt-1 mr-3 accent-primary"
                />
                <div className="flex-1">
                  <div className={`font-semibold transition-colors duration-300 ${isSelected ? 'text-neutral-dark-90 dark:text-neutral-dark-90' : 'text-neutral-dark-90 dark:text-neutral-light-90'}`}>{preset.label}</div>
                  <div className={`text-sm mt-1 transition-colors duration-300 ${isSelected ? 'text-neutral-dark-80 dark:text-neutral-dark-80' : 'text-neutral-dark-50 dark:text-neutral-light-50'}`}>{preset.description}</div>
                </div>
              </label>
            );
          })}
        </div>

        <div className="mt-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={intake.requiresLogoExploration}
              onChange={(e) => handleInputChange("requiresLogoExploration", e.target.checked)}
              className="mr-2 accent-primary"
            />
            <span className="text-sm text-neutral-dark-70 dark:text-neutral-light-70 transition-colors duration-300">Include logo exploration & concepts (optional)</span>
          </label>
        </div>
      </section>

      {/* Brand Positioning */}
      <section>
        <h2 className="text-xl font-semibold text-neutral-dark-90 dark:text-neutral-light-90 mb-6 transition-colors duration-300">
          Brand Positioning
        </h2>
        
        <div className="mb-8">
          <label className="block text-sm font-medium text-neutral-dark-70 dark:text-neutral-light-70 mb-2 transition-colors duration-300">
            Positioning Statement
          </label>
          <textarea
            value={intake.positioningStatement}
            onChange={(e) => handleInputChange("positioningStatement", e.target.value)}
            rows={3}
            maxLength={500}
            className="w-full px-4 py-2 bg-white dark:bg-neutral-dark-70 border border-neutral-dark-40 dark:border-neutral-dark-50 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all"
            placeholder="For [target audience], [brand] is the [category] that [unique benefit] because [reason to believe]."
          />
          <span className="text-xs text-neutral-dark-40 dark:text-neutral-light-50 transition-colors duration-300">{intake.positioningStatement.length}/500</span>
        </div>

        <div className="mb-8">
          <ArrayInput
            label="Target Audience"
            items={intake.targetAudience}
            onAdd={(value) => handleArrayAdd("targetAudience", value)}
            onRemove={(index) => handleArrayRemove("targetAudience", index)}
            placeholder="E.g., Small business owners, Tech professionals..."
          />
        </div>

        <div className="mb-8">
          <ChipSelect
            label="Brand Values"
            options={PRESET_OPTIONS.brandValues}
            selected={intake.brandValues}
            onChange={(values) => handleInputChange("brandValues", values)}
          />
        </div>

        <div className="mb-8">
          <ChipSelect
            label="Brand Personality"
            options={PRESET_OPTIONS.brandPersonalities}
            selected={intake.brandPersonality}
            onChange={(values) => handleInputChange("brandPersonality", values)}
          />
        </div>

        <div className="mb-8">
          <ArrayInput
            label="Unique Selling Points"
            items={intake.uniqueSellingPoints}
            onAdd={(value) => handleArrayAdd("uniqueSellingPoints", value)}
            onRemove={(index) => handleArrayRemove("uniqueSellingPoints", index)}
            placeholder="What makes you unique?"
          />
        </div>

        <div>
          <ArrayInput
            label="Competitor URLs (optional)"
            items={intake.competitorUrls}
            onAdd={(value) => handleArrayAdd("competitorUrls", value)}
            onRemove={(index) => handleArrayRemove("competitorUrls", index)}
            placeholder="https://competitor.com"
          />
        </div>
      </section>

      {/* Voice & Tone */}
      <section>
        <h2 className="text-xl font-semibold text-neutral-dark-90 dark:text-neutral-light-90 mb-6 transition-colors duration-300">
          Brand Voice & Tone
        </h2>

        <div className="mb-8">
          <ChipSelect
            label="Voice Characteristics"
            options={PRESET_OPTIONS.voiceCharacteristics}
            selected={intake.voiceCharacteristics}
            onChange={(values) => handleInputChange("voiceCharacteristics", values)}
          />
        </div>

        <div className="mb-8">
          <h3 className="text-sm font-medium text-neutral-dark-70 dark:text-neutral-light-70 mb-4 transition-colors duration-300">Tone Attributes</h3>
          <div className="space-y-4">
            <SliderInput
              label="Formal ↔ Casual"
              value={intake.toneAttributes.formal}
              onChange={(value) => handleSliderChange("formal", value)}
            />
            <SliderInput
              label="Serious ↔ Playful"
              value={intake.toneAttributes.playful}
              onChange={(value) => handleSliderChange("playful", value)}
            />
            <SliderInput
              label="Subtle ↔ Bold"
              value={intake.toneAttributes.bold}
              onChange={(value) => handleSliderChange("bold", value)}
            />
            <SliderInput
              label="Complex ↔ Minimalist"
              value={intake.toneAttributes.minimalist}
              onChange={(value) => handleSliderChange("minimalist", value)}
            />
          </div>
        </div>

        <div>
          <ArrayInput
            label="Key Messages"
            items={intake.keyMessages}
            onAdd={(value) => handleArrayAdd("keyMessages", value)}
            onRemove={(index) => handleArrayRemove("keyMessages", index)}
            placeholder="Core messages you want to communicate"
          />
        </div>
      </section>

      {/* Visual Direction */}
      <section>
        <h2 className="text-xl font-semibold text-neutral-dark-90 dark:text-neutral-light-90 mb-6 transition-colors duration-300">
          Visual Direction
        </h2>

        <div className="mb-8">
          <ChipSelect
            label="Color Preferences"
            options={PRESET_OPTIONS.colors}
            selected={intake.colorPreferences}
            onChange={(values) => handleInputChange("colorPreferences", values)}
          />
        </div>

        <div className="mb-8">
          <ArrayInput
            label="Mood Keywords (Embrace)"
            items={intake.moodKeywords}
            onAdd={(value) => handleArrayAdd("moodKeywords", value)}
            onRemove={(index) => handleArrayRemove("moodKeywords", index)}
            placeholder="E.g., Modern, Elegant, Energetic..."
          />
        </div>

        <div>
          <ArrayInput
            label="Keywords to Avoid"
            items={intake.avoidKeywords}
            onAdd={(value) => handleArrayAdd("avoidKeywords", value)}
            onRemove={(index) => handleArrayRemove("avoidKeywords", index)}
            placeholder="E.g., Corporate, Boring, Cluttered..."
          />
        </div>
      </section>

      {/* Technical */}
      <section>
        <h2 className="text-xl font-semibold text-neutral-dark-90 dark:text-neutral-light-90 mb-6 transition-colors duration-300">
          Platforms & Distribution
        </h2>
        <ChipSelect
          label="Target Platforms"
          options={PRESET_OPTIONS.platforms}
          selected={intake.platforms}
          onChange={(values) => handleInputChange("platforms", values)}
        />
      </section>

      {/* Additional Notes */}
      <section>
        <h2 className="text-xl font-semibold text-neutral-dark-90 dark:text-neutral-light-90 mb-6 transition-colors duration-300">
          Additional Notes
        </h2>
        <textarea
          value={intake.additionalNotes}
          onChange={(e) => handleInputChange("additionalNotes", e.target.value)}
          rows={4}
          className="w-full px-4 py-2 bg-white dark:bg-neutral-dark-70 border border-neutral-dark-40 dark:border-neutral-dark-50 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all"
          placeholder="Any other context, requirements, or preferences..."
        />
          <span className="text-xs text-neutral-dark-40 dark:text-neutral-light-50 transition-colors duration-300">{intake.additionalNotes.length} characters</span>
      </section>

      {/* Action Buttons */}
      <div className="sticky bottom-0 bg-bg-body dark:bg-neutral-dark-80 border-t-4 border-primary pt-6 pb-2 -mx-8 px-8 transition-colors duration-300">
        <div className="flex gap-4">
          <button
            onClick={handleCopyTask}
            disabled={!isValid}
            className="flex-1 px-6 py-4 border border-neutral-light-10 dark:border-neutral-dark-50 text-primary dark:text-primary rounded-lg disabled:text-neutral-dark-30 dark:disabled:text-neutral-dark-50 disabled:cursor-not-allowed font-semibold text-lg transition-all flex items-center justify-center gap-2"
          >
            <Clipboard size={20} />
            Copy Cursor Task
          </button>
          <button
            onClick={handleDownloadPack}
            disabled={!isValid}
            className={`flex-1 px-6 py-4 border border-neutral-light-10 dark:border-neutral-dark-50 text-neutral-dark-90 dark:text-neutral-dark-90 rounded-lg disabled:text-neutral-dark-30 dark:disabled:text-neutral-dark-50 disabled:cursor-not-allowed font-semibold text-lg transition-all flex items-center justify-center gap-2 ${
              !isValid 
                ? 'bg-neutral-light-60 dark:bg-neutral-dark-60' 
                : 'bg-primary dark:bg-primary'
            }`}
          >
            <Download size={20} />
            Download Brand Pack
          </button>
        </div>

        {!isValid && (
          <p className="text-sm text-shade-40 dark:text-primary text-center mt-3 font-medium transition-colors duration-300">
            Please fill in all required fields (*)
          </p>
        )}
      </div>
    </div>
  );
}

// Helper Components

function MultiLineBadge({ text, isSelected }: { text: string; isSelected: boolean }) {
  const textRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLSpanElement>(null);
  const [lineRanges, setLineRanges] = useState<Array<{ top: number; left: number; width: number; height: number }>>([]);

  useEffect(() => {
    const updateLineRanges = () => {
      if (!textRef.current || !containerRef.current) return;

      const textElement = textRef.current;
      const container = containerRef.current;
      
      // Get computed styles
      const computedStyle = window.getComputedStyle(textElement);
      const lineHeight = parseFloat(computedStyle.lineHeight) || parseFloat(computedStyle.fontSize) * 1.2;
      const paddingLeft = parseFloat(computedStyle.paddingLeft) || 4; // px-1 = 4px
      
      // Use Range API to measure actual rendered lines
      const range = document.createRange();
      range.selectNodeContents(textElement);
      
      const rects = Array.from(range.getClientRects());
      const containerRect = container.getBoundingClientRect();
      
      // Group rects by line (same Y position within tolerance)
      const lines: Array<{ top: number; left: number; right: number }> = [];
      
      rects.forEach(rect => {
        const top = rect.top - containerRect.top;
        const left = rect.left - containerRect.left;
        const right = rect.right - containerRect.left;
        
        // Find existing line at similar Y position
        const lineIndex = lines.findIndex(line => Math.abs(line.top - top) < lineHeight / 3);
        
        if (lineIndex >= 0) {
          // Merge with existing line
          lines[lineIndex].left = Math.min(lines[lineIndex].left, left);
          lines[lineIndex].right = Math.max(lines[lineIndex].right, right);
        } else {
          // New line
          lines.push({ top, left, right });
        }
      });
      
      // Sort lines by top position
      lines.sort((a, b) => a.top - b.top);
      
      // Convert to ranges with proper positioning
      const lineRanges = lines.map(line => ({
        top: line.top,
        left: line.left + paddingLeft,
        width: Math.max(0, line.right - line.left),
        height: lineHeight,
      }));
      
      setLineRanges(lineRanges);
    };

    const timeoutId = setTimeout(updateLineRanges, 0);
    window.addEventListener('resize', updateLineRanges);
    
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', updateLineRanges);
    };
  }, [text]);

  if (isSelected) {
    return <span className="relative z-10 px-1 break-words inline-block text-neutral-dark-90 dark:text-neutral-dark-90 transition-colors duration-300">{text}</span>;
  }

  return (
    <span ref={containerRef} className="relative inline-block w-full">
      {lineRanges.map((range, index) => (
        <span
          key={index}
          className="absolute bg-primary/50 dark:bg-primary/30 rounded-sm transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
          style={{
            top: `${range.top}px`,
            left: `${range.left}px`,
            width: `${range.width}px`,
            height: `${range.height}px`,
            zIndex: 0,
            transitionDelay: `${index * 150}ms`,
          }}
        />
      ))}
      <span ref={textRef} className="relative z-10 px-1 break-words inline-block w-full">
        {text}
      </span>
    </span>
  );
}

function ArrayInput({
  label,
  items,
  onAdd,
  onRemove,
  placeholder,
}: {
  label: string;
  items: string[];
  onAdd: (value: string) => void;
  onRemove: (index: number) => void;
  placeholder: string;
}) {
  const [value, setValue] = useState("");

  const handleAdd = () => {
    if (value.trim()) {
      onAdd(value);
      setValue("");
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-neutral-dark-70 dark:text-neutral-light-70 mb-2 transition-colors duration-300">{label}</label>
      <div className="flex gap-2 mb-2">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleAdd()}
          placeholder={placeholder}
          className="flex-1 px-4 py-2 bg-white dark:bg-neutral-dark-70 border border-neutral-dark-40 dark:border-neutral-dark-50 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all"
        />
        <button
          onClick={handleAdd}
              className="px-4 py-2 bg-primary dark:bg-primary text-neutral-dark-90 dark:text-neutral-dark-90 rounded-lg hover:bg-primary-light dark:hover:bg-primary-light font-medium transition-all"
        >
          Add
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {items.map((item, index) => (
          <span
            key={index}
            className="inline-flex items-center gap-1 px-3 py-1 bg-white dark:bg-neutral-dark-60 border border-neutral-light-70 dark:border-neutral-dark-50 rounded-full text-sm text-neutral-dark-70 dark:text-neutral-light-70 transition-colors duration-300"
          >
            {item}
            <button
              onClick={() => onRemove(index)}
              className="text-neutral-dark-90 dark:text-neutral-light-90 hover:text-neutral-dark-80 dark:hover:text-neutral-light-80 font-bold ml-1 transition-colors duration-300"
            >
              ×
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}

function ChipSelect({
  label,
  options,
  selected,
  onChange,
}: {
  label: string;
  options: string[];
  selected: string[];
  onChange: (values: string[]) => void;
}) {
  const toggleOption = (option: string) => {
    if (selected.includes(option)) {
      onChange(selected.filter((v) => v !== option));
    } else {
      onChange([...selected, option]);
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-neutral-dark-70 dark:text-neutral-light-70 mb-2 transition-colors duration-300">{label}</label>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const isSelected = selected.includes(option);
          return (
            <button
              key={option}
              onClick={() => toggleOption(option)}
              className={`px-3 py-1 rounded-full text-sm transition-all font-medium ${
                isSelected
                  ? "bg-primary dark:bg-primary text-neutral-dark-90 dark:text-neutral-dark-90 shadow-md border border-neutral-dark-90 dark:border-primary"
                  : "bg-neutral-light-80 dark:bg-neutral-dark-60 text-neutral-dark-70 dark:text-neutral-light-70 border border-neutral-light-60 dark:border-neutral-dark-50 hover:bg-primary/30 dark:hover:bg-primary/20 hover:border-primary dark:hover:border-primary"
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function SliderInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <label className="text-sm font-medium text-neutral-dark-70 dark:text-neutral-light-70 transition-colors duration-300">{label}</label>
        <span className="text-sm font-semibold text-primary">{value}/10</span>
      </div>
      <input
        type="range"
        min="1"
        max="10"
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="w-full h-2 bg-neutral-light-60 dark:bg-neutral-dark-60 border border-neutral-light-10 dark:border-neutral-dark-50 rounded-lg appearance-none cursor-pointer accent-primary transition-colors duration-300"
      />
    </div>
  );
}
