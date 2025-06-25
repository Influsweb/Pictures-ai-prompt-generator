"use client"

import { useState } from 'react'

export default function Home() {
  const [subject, setSubject] = useState('')
  const [environment, setEnvironment] = useState('')
  const [timeOfDay, setTimeOfDay] = useState('Daylight')
  const [mood, setMood] = useState('Neutral')
  const [style, setStyle] = useState('Photorealistic')
  const [details, setDetails] = useState('')
  const [generatedPrompt, setGeneratedPrompt] = useState('')
  
  // Advanced Mode states
  const [advancedMode, setAdvancedMode] = useState(false)
  const [cameraModel, setCameraModel] = useState('None (Auto)')
  const [lensModel, setLensModel] = useState('None (Auto)')
  const [includeCamera, setIncludeCamera] = useState(true)
  const [includeNegative, setIncludeNegative] = useState(true)

  // Camera and lens data
  const cameras = [
    'None (Auto)',
    'Leica M11',
    'Sony A7RV', 
    'Sony A1 II',
    'Nikon Z8',
    'Canon EOS R5',
    'Fujifilm GFX 100S II'
  ]

  const lenses = [
    'None (Auto)',
    '--- Leica Lenses ---',
    'Leica Summilux-M 50mm f/1.4 ASPH',
    'Leica APO-Summicron-M 35mm f/2 ASPH',
    'Leica Elmarit-M 28mm f/2.8 ASPH',
    'Leica Super-Elmar-M 21mm f/3.4 ASPH',
    'Leica APO-Summicron-SL 90mm f/2 ASPH',
    'Leica Vario-Elmarit-SL 24-70mm f/2.8 ASPH',
    'Leica Noctilux 50mm f/0.95',
    '--- Sony Lenses ---',
    'Sony FE 24-70mm f/2.8 GM II',
    'Sony FE 50mm f/1.4 GM',
    'Sony FE 70-200mm f/2.8 GM OSS II',
    'Sony FE 135mm f/1.8 GM',
    'Sony FE 12-24mm f/2.8 GM',
    'Sony FE 90mm f/2.8 Macro G OSS',
    '--- Nikon Lenses ---',
    'Nikon Z 24-70mm f/2.8 S',
    'Nikon Z 70-200mm f/2.8 VR S',
    'Nikon Z 85mm f/1.2 S',
    'Nikon Z 14-24mm f/2.8 S',
    'Nikon Z 600mm f/4 TC VR S',
    'Nikon Z 28-75mm f/2.8',
    '--- Canon Lenses ---',
    'Canon RF 50mm f/1.2L USM',
    'Canon RF 24-70mm f/2.8L IS USM',
    'Canon RF 70-200mm f/2.8L IS USM',
    'Canon RF 85mm f/1.2L USM',
    'Canon RF 15-35mm f/2.8L IS USM',
    'Canon EF 50mm f/1.8 STM',
    'Canon EF 70-300mm f/4-5.6 IS II USM',
    '--- Fujifilm Lenses ---',
    'Fujinon XF 16-55mm f/2.8 R LM WR',
    'Fujinon XF 90mm f/2 R LM WR',
    'Fujinon XF 8-16mm f/2.8 R LM WR',
    'Fujinon XF 56mm f/1.2 R WR',
    'Fujinon XF 50-140mm f/2.8 R LM OIS WR',
    'Fujinon XF 16-80mm f/4 R OIS WR',
    'Fujinon XF 35mm f/1.4 R'
  ]

  const getFileExtension = (camera) => {
    if (camera.includes('Sony')) return 'RWL'
    if (camera.includes('Leica')) return 'RAW'
    if (camera.includes('Nikon')) return 'NEF'
    if (camera.includes('Canon')) return 'CR3'
    if (camera.includes('Fujifilm')) return 'RAF'
    return 'JPG'
  }

  const generateRandomFileNumber = () => {
    return Math.floor(1000 + Math.random() * 9000)
  }

  const styleConfig = {
    'Photorealistic': {
      type: 'photorealistic image',
      terms: '',
      negative: '--no blurry, distorted, low quality'
    },
    'Cinematic': {
      type: 'cinematic image',
      terms: 'cinematic lighting, movie still quality, film grain, anamorphic lens flare',
      negative: '--no amateur lighting, poor color grading, low quality, blurry, distorted'
    },
    'Editorial Photography': {
      type: 'editorial image',
      terms: 'editorial photography, magazine quality, professional retouching, micro contrast, vogue style, high fashion, studio lighting, natural lighting, everyday luxury, beauty retouching, macro detail, skin perfection',
      negative: '--no amateur quality, poor composition, low resolution, blurry, distorted'
    },
    'Documentary': {
      type: 'documentary image',
      terms: 'stills archive',
      negative: '--no staged, artificial, overly processed, blurry, distorted'
    },
    'Professional Portrait': {
      type: 'portrait image',
      terms: 'stills archive',
      negative: '--no unflattering angle, harsh shadows, distorted features, blurry'
    },
    'Fashion Photography': {
      type: 'fashion image',
      terms: 'fashion editorial, vogue style, high fashion, studio lighting, beauty retouching, fashion week quality',
      negative: '--no amateur lighting, poor makeup, unfashionable, blurry, distorted'
    },
    'Street Photography': {
      type: 'street photography image',
      terms: 'candid moment, urban photography, photojournalism, decisive moment, street culture',
      negative: '--no staged, artificial, studio lighting, blurry, distorted'
    },
    'Commercial Photography': {
      type: 'commercial image',
      terms: 'advertising quality, brand photography, product placement, commercial appeal, marketing ready',
      negative: '--no amateur quality, poor lighting, unprofessional, blurry, distorted'
    }
  }

  const generatePrompt = () => {
    if (!subject) {
      alert('Please enter a subject!')
      return
    }

    const config = styleConfig[style]
    let prompt = `Generate a ${config.type} of ${subject}`
    
    if (environment) {
      prompt += ` in ${environment}`
    }
    
    prompt += `, during ${timeOfDay.toLowerCase()}`
    
    // Always add atmosphere, including neutral
    prompt += `, with a ${mood.toLowerCase()} atmosphere`
    
    if (details) {
      prompt += `. ${details}`
    }
    
    // Add camera specs if enabled, or professional camera if not in advanced mode
    if (advancedMode && includeCamera && cameraModel !== 'None (Auto)') {
      prompt += `. Shot on ${cameraModel}`
      
      if (lensModel !== 'None (Auto)') {
        prompt += ` with ${lensModel}`
      }
      
      const fileNumber = generateRandomFileNumber()
      const extension = getFileExtension(cameraModel)
      prompt += `. IMG_${fileNumber}.${extension}`
    } else if (!advancedMode) {
      prompt += `. Shot on professional camera`
    }
    
    if (config.terms) {
      prompt += `. ${config.terms}`
    }
    
    prompt += '. Professional quality, highly detailed'
    
    if (includeNegative) {
      prompt += ' ' + config.negative
    }
    
    setGeneratedPrompt(prompt)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedPrompt)
    alert('Prompt copied to clipboard!')
  }

  const randomize = () => {
    const subjects = ['Woman', 'Man', 'Child', 'Cat', 'Dog', 'Car', 'House', 'Tree', 'Mountain', 'Ocean']
    const environments = ['magical forest', 'urban street', 'desert landscape', 'snowy mountain', 'tropical beach', 'city skyline']
    const times = ['Sunrise', 'Daylight', 'Golden Hour', 'Sunset', 'Blue Hour', 'Night']
    const moods = ['Neutral', 'Dramatic', 'Serene', 'Mysterious', 'Joyful', 'Tense']
    const styles = ['Photorealistic', 'Cinematic', 'Editorial Photography', 'Documentary', 'Professional Portrait']

    setSubject(subjects[Math.floor(Math.random() * subjects.length)])
    setEnvironment(environments[Math.floor(Math.random() * environments.length)])
    setTimeOfDay(times[Math.floor(Math.random() * times.length)])
    setMood(moods[Math.floor(Math.random() * moods.length)])
    setStyle(styles[Math.floor(Math.random() * styles.length)])
    setDetails('wearing elegant clothing')
  }

  const reset = () => {
    setSubject('')
    setEnvironment('')
    setTimeOfDay('Daylight')
    setMood('Neutral')
    setStyle('Photorealistic')
    setDetails('')
    setGeneratedPrompt('')
    setCameraModel('None (Auto)')
    setLensModel('None (Auto)')
    setIncludeCamera(true)
    setIncludeNegative(true)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI Image Prompt Generator
          </h1>
          <p className="text-lg text-gray-600">
            Create detailed prompts for AI image generation tools to produce professional-quality photos and cinematic visuals
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Panel - Form */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Prompt Parameters</h2>
              <button
                onClick={randomize}
                className="flex items-center gap-2 px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
              >
                🎲 Random
              </button>
            </div>

            {/* Subject */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subject
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g., astronaut, mountain landscape, vintage car"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">The main focus of your image</p>
            </div>

            {/* Environment */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Setting/Environment
              </label>
              <input
                type="text"
                value={environment}
                onChange={(e) => setEnvironment(e.target.value)}
                placeholder="e.g., forest, city skyline, Mars surface"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">Where the subject is located</p>
            </div>

            {/* Time of Day & Mood */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Time of Day
                </label>
                <select
                  value={timeOfDay}
                  onChange={(e) => setTimeOfDay(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option>Sunrise</option>
                  <option>Daylight</option>
                  <option>Golden Hour</option>
                  <option>Sunset</option>
                  <option>Blue Hour</option>
                  <option>Night</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mood
                </label>
                <select
                  value={mood}
                  onChange={(e) => setMood(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option>Neutral</option>
                  <option>Dramatic</option>
                  <option>Serene</option>
                  <option>Mysterious</option>
                  <option>Joyful</option>
                  <option>Tense</option>
                </select>
              </div>
            </div>

            {/* Style */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Style
              </label>
              <select
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>Photorealistic</option>
                <option>Cinematic</option>
                <option>Editorial Photography</option>
                <option>Documentary</option>
                <option>Professional Portrait</option>
                <option>Fashion Photography</option>
                <option>Street Photography</option>
                <option>Commercial Photography</option>
              </select>
            </div>

            {/* Additional Details */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Details (Optional)
              </label>
              <textarea
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="e.g., specific clothing, actions, expressions, or other details"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-20 resize-none"
              />
              <p className="text-xs text-gray-500 mt-1">Any extra details to enhance your prompt</p>
            </div>

            {/* Advanced Mode Toggle */}
            <div className="border-t pt-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Advanced Mode</h3>
                  <p className="text-sm text-gray-500">Enable additional prompt customization options</p>
                </div>
                <button
                  onClick={() => setAdvancedMode(!advancedMode)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    advancedMode ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      advancedMode ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Advanced Options */}
              {advancedMode && (
                <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-3">Advanced Options</h4>
                  
                  {/* Camera Model */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Camera Model
                    </label>
                    <select
                      value={cameraModel}
                      onChange={(e) => setCameraModel(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {cameras.map(camera => (
                        <option key={camera} value={camera}>{camera}</option>
                      ))}
                    </select>
                    <p className="text-xs text-gray-500 mt-1">Specific camera model to include in the prompt</p>
                  </div>

                  {/* Lens Model */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Lens Model
                    </label>
                    <select
                      value={lensModel}
                      onChange={(e) => setLensModel(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {lenses.map(lens => (
                        <option 
                          key={lens} 
                          value={lens}
                          disabled={lens.startsWith('---')}
                          className={lens.startsWith('---') ? 'font-medium text-gray-500 bg-gray-100' : ''}
                        >
                          {lens}
                        </option>
                      ))}
                    </select>
                    <p className="text-xs text-gray-500 mt-1">Specific lens model to include in the prompt</p>
                  </div>

                  {/* Camera Details Toggle */}
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="text-sm font-medium text-gray-900">Camera Details</h5>
                      <p className="text-xs text-gray-500">Include camera equipment</p>
                    </div>
                    <button
                      onClick={() => setIncludeCamera(!includeCamera)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                        includeCamera ? 'bg-blue-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          includeCamera ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Negative Prompt Toggle */}
                  <div className="flex items-center justify-between">
                    <div>
                      <h5 className="text-sm font-medium text-gray-900">Negative Prompt</h5>
                      <p className="text-xs text-gray-500">Add quality filters</p>
                    </div>
                    <button
                      onClick={() => setIncludeNegative(!includeNegative)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                        includeNegative ? 'bg-blue-600' : 'bg-gray-200'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          includeNegative ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                onClick={generatePrompt}
                className="flex-1 bg-black text-white py-3 px-6 rounded-md hover:bg-gray-800 transition-colors font-medium"
              >
                ✨ Generate Prompt
              </button>
              <button
                onClick={reset}
                className="px-4 py-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Right Panel - Generated Prompt */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Generated Prompt</h2>
              {generatedPrompt && (
                <div className="flex items-center gap-2">
                  <span className="text-green-600 text-sm flex items-center gap-1">
                    ✅ Ready to use
                  </span>
                  <button
                    onClick={copyToClipboard}
                    className="px-3 py-1 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors text-sm"
                  >
                    📋 Copy
                  </button>
                </div>
              )}
            </div>

            <div className="bg-gray-50 rounded-lg p-4 min-h-[300px] flex items-center justify-center">
              {generatedPrompt ? (
                <div className="w-full">
                  <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                    {generatedPrompt}
                  </p>
                </div>
              ) : (
                <div className="text-center text-gray-500">
                  <div className="text-4xl mb-4">📝</div>
                  <p>Fill out the form and click "Generate Prompt" to create your AI image prompt</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}