---
title: 'NoobAI-XL (перевод)'
date: '2025-04-26'
description: 'NoobAI-XL — Введение и Руководство пользователя'
---

## 1. Введение

[Оригинал](https://d0xb9r3fg5h.feishu.cn/docx/WWOHdr6RMoQZxQxCZRGc5KlEnUi)

[English Version](https://civitai.com/articles/9986/noobai-xl-full-official-guide-translated)

Этот документ предназначен для подробного и актуального ознакомления с моделью **NoobAI-XL**.

> Обратите внимание: из-за динамичного характера информации и сложности поддержания актуальности, данный документ может содержать ошибки или упущения.

### 1.1 Основная информация

**NoobAI-XL** — это модель диффузии текст-в-изображение, разработанная **[Laxhar Dream Lab](https://huggingface.co/Laxhar)** при поддержке **BlueRun**.  
Лицензия модели основана на **[fair-ai-public-license-1.0-sd](https://freedevproject.org/faipl-1.0-sd/)**, с дополнительными ограничениями лицензии **[NoobAI-XL](https://huggingface.co/Laxhar/noobai-XL-1.0#model-license)**.

Модель построена на архитектуре **SDXL** и использует **[Illustrious-xl-early-release-v0](https://huggingface.co/OnomaAIResearch/Illustrious-xl-early-release-v0)** в качестве базовой модели.  
Обучение проводилось на полном датасете **Danbooru** и **e621** (около 13 000 000 изображений), что обеспечило обширные знания и отличную производительность.

### 1.2 Общее описание

**NoobAI-XL** обладает огромной базой знаний:

- Воспроизводит десятки тысяч аниме-персонажей и стили художников.
- Узнаёт множество специализированных концепций в области аниме и furry.
- Имеет две версии: **noise prediction** и **V-prediction**.

**Отличия версий:**

- **Noise Prediction** — более разнообразные и креативные изображения.
- **V-Prediction** — лучшее соответствие подсказкам, расширенная цветовая гамма, улучшенные светотени.

Модель имеет растущее сообщество, поддерживающее:

- **LoRA**, **ControlNet**, **IP-Adapter** и другие расширения.

> В серии моделей NoobAI-XL подробно описаны обе версии — noise prediction и V-prediction.

---

# 2. Быстрый старт

## Загрузка модели

Сайты для загрузки:

- **CivitAI**: [Перейти](https://civitai.com/models/833294)
- **LiblibAI**: [Перейти](https://www.liblib.art/modelinfo/acc221fc9d4e4a2394a2bc72b236ab4e?versionUuid=94307193325c4f69a95fe345d53b505c)
- **Huggingface**: [Перейти](https://huggingface.co/collections/Laxhar/noobai-sdxl-6736dfcb52c60632e5593747)

Если не уверены, какую версию скачать, можно просмотреть [эту страницу](https://chatgpt.com/?temporary-chat=true&model=gpt-4o#).

## Загрузка моделей

V-Prediction-это относительно редкая техника обучения моделей, а модели, обученные с использованием этой техники, называются V-предсмертными моделями. По сравнению с прогнозированием шума, модели V-Prediction известны своей более высокой приверженностью, более широкой цветовой гаммой, более сильным светом и тени. Примеры включают в себя Diffusion V3 и COSXL. Из -за их позднего появления и дефицита таких моделей некоторые основные проекты генерации изображений и пользовательские интерфейсы не поддерживают их напрямую. Поэтому, если вы собираетесь использовать модели V-Prediction, требуются некоторые дополнительные операции. Этот раздел представит их конкретное использование. Если вы столкнетесь с какими -либо трудностями во время использования, вы также можете напрямую связаться с любым из авторов модели для получения помощи.

### 2.2.1 Загрузка V-prediction моделей

#### Использование в forge или reForge

**forge** и **reForge** поддерживают V-prediction напрямую.

- Обновление: `git pull` в каталоге установки.
- Установка: следуйте онлайн-руководствам.

#### Использование в ComfyUI

**ComfyUI** позволяет работать с V-prediction, добавив специальные узлы.

#### Использование в Diffusers

Для разработчиков и исследователей.

Пример кода:

```python
import torch
from diffusers import StableDiffusionXLPipeline, EulerDiscreteScheduler

ckpt_path = "/path/to/model.safetensors"
pipe = StableDiffusionXLPipeline.from_single_file(
    ckpt_path,
    use_safetensors=True,
    torch_dtype=torch.float16,
)

scheduler_args = {"prediction_type": "v_prediction", "rescale_betas_zero_snr": True}
pipe.scheduler = EulerDiscreteScheduler.from_config(pipe.scheduler.config, **scheduler_args)
pipe.enable_xformers_memory_efficient_attention()
pipe = pipe.to("cuda")

prompt = """masterpiece, best quality, john_kafka, nixeu, chromatic aberration, horror (theme)"""
negative_prompt = "nsfw, worst quality, low quality, bad hands, furry, semi-anthro"

image = pipe(
    prompt=prompt,
    negative_prompt=negative_prompt,
    width=832,
    height=1216,
    num_inference_steps=28,
    guidance_scale=5,
    generator=torch.Generator().manual_seed(42),
).images[0]

image.save("output.png")
```

---

# 2.3 Использование модели (продолжение)

NoobAI-XL не предъявляет строгих требований к промптам, а рекомендуемые в этой статье действия — лишь дополнительное улучшение.

NoobAI-XL рекомендует использовать теги в качестве промптов для добавления желаемого контента. Каждый тег представляет собой английское слово или фразу, а теги разделяются запятыми ", ". Теги, взятые напрямую из Danbooru и e621, дают более сильный эффект. Чтобы добиться ещё лучших результатов, можно ориентироваться на приведённые ниже рекомендации по составлению промптов.  
Рекомендуется всегда добавлять в промпт эстетический тег **"very awa"** и тег качества **"masterpiece"**.

NoobAI-XL поддерживает генерацию высокоточных персонажей и стилей художников, которые активируются с помощью тегов — их называют **"триггер-словами"**. Для персонажей триггер-словом служит их имя, для стилей художников — имя художника. Полную таблицу триггер-слов можно скачать с noob-wiki. Подробное описание триггер-слов приведено ниже.

Аналогично NovelAI, NoobAI-XL поддерживает специальные теги, такие как качество, эстетика, год создания, исторический период и рейтинг безопасности, которые используются в качестве вспомогательных инструментов. Заинтересованные пользователи могут ознакомиться с ними в детальном описании ниже.

### Параметры генерации

#### Базовые параметры

**Рекомендуемые параметры для noise prediction версий:**

| Параметр          | Значение    |
| :---------------- | :---------- |
| Самплер (Sampler) | **Euler A** |
| CFG Scale (cfg)   | 5–7         |
| Sampling Steps    | 28–35       |

**Рекомендуемые параметры для V-prediction версий:**

| Версия                 | Самплер       | CFG Scale | Sampling Steps |
| :--------------------- | :------------ | :-------- | :------------- |
| V-pred 0.9r            | Euler         | 3.5–5.5   | 32–40          |
| V-pred 0.75s           | Euler A       | 3–4       | 38–40          |
| V-pred 0.65s           | Euler A       | 3–5       | 28–40          |
| V-pred 0.6             | Euler A/Euler | 3.5–5.5   | 32–40          |
| V-pred 0.5             | Euler         | 3.5–5.5   | 28–35          |
| Тестовая версия V-pred | Euler A       | 5–7       | 28–35          |

#### Особенности для V-prediction моделей

- Используйте оптимизаторы с параметром **Rescale CFG (около 0.7)**.
- Или **Euler Ancestor CFG++** с масштабом CFG от 1 до 1.8.
- Внимание: некоторые сэмплеры могут вызывать пересвет и пересатурацию.

#### Разрешение

**Рекомендованные разрешения для NoobAI-XL:**

| Разрешение | Соотношение сторон |
| :--------- | :----------------- |
| 768x1344   | 9:16               |
| 832x1216   | 2:3                |
| 896x1152   | 3:4                |
| 1024x1024  | 1:1                |
| 1152x896   | 4:3                |
| 1216x832   | 3:2                |
| 1344x768   | 16:9               |

> Не рекомендуется увеличивать площадь более чем в 1.5 раза.

#### Другие рекомендации

- **CLIP skip** не требуется.
- **VAE** внешний не нужен.
- **V-prediction** более чувствительны к промптам и параметрам.

---

## 2.4 Дополнительные ресурсы

- 📘 **[NOOBAI XL Quick Guide](https://civitai.com/articles/8962)** от 年糕特工队 (руководство для новичков).

---

# 3. Обзор моделей

## Базовые версии моделей

| Версия            | Тип предсказания | Ссылка на скачивание                                                                                                                    | Итерация от                     | Особенности версии                                                                                                      |
| ----------------- | ---------------- | --------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Early-Access      | Прогноз шума     | [CivitAI](https://civitai.com/models/833294?modelVersionId=932238), [Huggingface](https://huggingface.co/Laxhar/noobai-xl-EarlyAccess)  | Illustrious-xl-early-release-v0 | Самая ранняя версия, но уже хорошо обученная                                                                            |
| Epsilon-pred 0.5  | Прогноз шума     | [CivitAI](https://civitai.com/models/833294?modelVersionId=968495), [Huggingface](https://huggingface.co/Laxhar/noobai-XL-0.5)          | Early-Access                    | (Рекомендуется) Самая стабильная версия, но недостаточно знаний о редких концепциях                                     |
| Epsilon-pred 0.6  | Прогноз шума     | [Huggingface](https://huggingface.co/Laxhar/noobai-XL-0.6)                                                                              | Early-Access 0.5                | (Рекомендуется) Последняя чисто UNet обученная версия, отличный результат сходимости, любимая тестовой группой "178000" |
| Epsilon-pred 0.75 | Прогноз шума     | [CivitAI](https://civitai.com/models/833294?modelVersionId=998979), [Huggingface](https://huggingface.co/Laxhar/noobai-XL-0.75)         | Epsilon-pred 0.6                | Обучение текстового кодировщика (tte) для лучшего знания редких концепций, но снижение качества                         |
| Epsilon-pred 0.77 | Прогноз шума     | [Huggingface](https://huggingface.co/Laxhar/noobai-XL-0.77)                                                                             | Epsilon-pred 0.75               | Продолжено обучение на 2 эпохи, улучшение деградации качества                                                           |
| Epsilon-pred 1.0  | Прогноз шума     | [CivitAI](https://civitai.com/models/833294?modelVersionId=1022833), [Huggingface](https://huggingface.co/Laxhar/noobai-XL-1.0)         | Epsilon-pred 0.77               | (Рекомендуется) Дополнительное обучение 10 эпох для закрепления новых знаний, баланс производительности                 |
| V-pred test       | Прогноз V        | [CivitAI](https://civitai.com/models/833294?modelVersionId=962003), [Huggingface](https://huggingface.co/Laxhar/noob_sdxl_v_pred_test)  | Epsilon-pred 0.5                | (Не рекомендуется) Начальная тестовая версия V-предсказания                                                             |
| V-pred 0.5        | Прогноз V        | [CivitAI](https://civitai.com/models/833294?modelVersionId=1046043), [Huggingface](https://huggingface.co/Laxhar/noobai-XL-Vpred-0.5)   | Epsilon-pred 1.0                | Имеет проблему чрезмерной насыщенности                                                                                  |
| V-pred 0.6        | Прогноз V        | [CivitAI](https://civitai.com/models/833294?modelVersionId=1070239), [Huggingface](https://huggingface.co/Laxhar/noobai-XL-Vpred-0.6)   | V-pred 0.5                      | Проблема насыщенности частично решена, лучшее покрытие редких знаний и улучшенное качество                              |
| V-pred 0.65       | Прогноз V        | [Huggingface](https://huggingface.co/Laxhar/noobai-XL-Vpred-0.65)                                                                       | V-pred 0.6                      | Проблема насыщенности остается                                                                                          |
| V-pred 0.65s      | Прогноз V        | [CivitAI](https://civitai.com/models/833294?modelVersionId=1070239), [Huggingface](https://huggingface.co/Laxhar/noobai-XL-Vpred-0.65s) | V-pred 0.6                      | Проблема насыщенности почти решена                                                                                      |
| Epsilon-pred 1.1  | Прогноз шума     | [CivitAI](https://civitai.com/models/833294?modelVersionId=1116447), [Huggingface](https://huggingface.co/Laxhar/noobai-XL-1.1)         | Epsilon-pred 1.0                | (Рекомендуется) Исправлены проблемы средней яркости, общее улучшение                                                    |
| V-pred 0.75       | Прогноз V        | [Huggingface](https://huggingface.co/Laxhar/noobai-XL-Vpred-0.75)                                                                       | V-pred 0.65                     | Проблема насыщенности                                                                                                   |
| V-pred 0.75s      | Прогноз V        | [CivitAI](https://civitai.com/models/833294?modelVersionId=1140829), [Huggingface](https://huggingface.co/Laxhar/noobai-XL-Vpred-0.75s) | V-pred 0.65                     | (Рекомендуется) Исправлены насыщенность, шум и зернистость в экстремальных условиях                                     |
| V-pred 0.9r       | Прогноз V        | [CivitAI](https://civitai.com/models/833294?modelVersionId=1165792)                                                                     | V-pred 0.75                     | Добавлено 10% реалистичных данных, ухудшение производительности                                                         |
| V-pred 1.0        | Прогноз V        | CivitAI                                                                                                                                 | V-pred 0.75                     | (Рекомендуется) Наиболее сбалансированная эстетика после оптимизации                                                    |

---

## 3.2 Расширенные модели

### ControlNet

Доступные ControlNet модели:

| Тип предсказания     | Тип ControlNet                 | Ссылки                                                                                                                                                     | Тип препроцессора                              | Примечание   |
| :------------------- | :----------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------- | :----------- |
| Шумовое предсказание | hed soft edge                  | [CivitAI](https://civitai.com/models/929685?modelVersionId=1050852), [Huggingface](https://huggingface.co/Eugeoter/noob-sdxl-controlnet-softedge_hed)      | softedge_hed                                   |              |
| Шумовое предсказание | anime lineart                  | [CivitAI](https://civitai.com/models/929685?modelVersionId=1049196), [Huggingface](https://huggingface.co/Eugeoter/noob-sdxl-controlnet-lineart_anime)     | lineart_anime                                  |              |
| Шумовое предсказание | midas normal map               | [CivitAI](https://civitai.com/models/929685?modelVersionId=1044514), [Huggingface](https://huggingface.co/Eugeoter/noob-sdxl-controlnet-normal)            | normal_midas                                   |              |
| Шумовое предсказание | midas depth map                | [CivitAI](https://civitai.com/models/929685?modelVersionId=1042508), [Huggingface](https://huggingface.co/Eugeoter/noob-sdxl-controlnet-depth)             | depth_midas                                    |              |
| Шумовое предсказание | canny contours                 | [CivitAI](https://civitai.com/models/929685?modelVersionId=1040650), [Huggingface](https://huggingface.co/Eugeoter/noob-sdxl-controlnet-canny)             | canny                                          |              |
| Шумовое предсказание | openpose skeleton              | [CivitAI](https://civitai.com/models/962537/noobai-xl-controlnet-openpose), [Huggingface](https://huggingface.co/Laxhar/noob_openpose)                     | openpose                                       |              |
| Шумовое предсказание | manga line                     | [CivitAI](https://civitai.com/models/929685?modelVersionId=1087944), [Huggingface](https://huggingface.co/Eugeoter/noob-sdxl-controlnet-manga-line)        | manga_line / lineart_anime / lineart_realistic |              |
| Шумовое предсказание | realistic lineart              | [CivitAI](https://civitai.com/models/929685?modelVersionId=1091487), [Huggingface](https://huggingface.co/Eugeoter/noob-sdxl-controlnet-lineart_realistic) | lineart_realistic                              |              |
| Шумовое предсказание | midas depth map (новая версия) | [CivitAI](https://civitai.com/models/929685?modelVersionId=1091944), [Huggingface](https://huggingface.co/Eugeoter/noob-sdxl-controlnet-depth_midas-v1-1)  | depth_midas                                    | Новая версия |
| Шумовое предсказание | hed scribble                   | [CivitAI](https://civitai.com/models/929685?modelVersionId=1095278), [Huggingface](https://huggingface.co/Eugeoter/noob-sdxl-controlnet-scribble_hed)      | scribble_hed                                   |              |
| Шумовое предсказание | pidinet scribble               | [CivitAI](https://civitai.com/models/929685?modelVersionId=1097585), [Huggingface](https://huggingface.co/Eugeoter/noob-sdxl-controlnet-scribble_pidinet)  | scribble_pidinet                               |              |
| Шумовое предсказание | tile (плитка)                  | [CivitAI](https://civitai.com/models/929685?modelVersionId=1239319), [Huggingface](https://huggingface.co/Eugeoter/noob-sdxl-controlnet-tile)              | tile                                           |              |

> **Важно:** препроцессор и тип ControlNet должны совпадать.

### IP-Adapter (IPA)

**IP-Adapter (IPA)** доступен на Huggingface и [CivitAI](https://civitai.com/models/1000401?modelVersionId=1121145).

### LoRA модели

**Большинство LoRA** моделей, натренированных на noise prediction версии NoobAI-XL, совместимы и с V-prediction версиями, и наоборот.

---

# 3.3 Правила написания промптов

Прежде всего, нужно понимать:  
**роль промпта — это направлять модель**, помогая ей раскрывать потенциал.

- Хорошо составленные промпты улучшают результаты.
- Плохо составленные или даже ошибочные промпты **не всегда** ухудшают результаты.
- Разные модели имеют **разные оптимальные подходы** к написанию промптов.
- В некоторых случаях неправильное использование промпта может даже **улучшить** результат.

**NoobAI-XL** использует те же стандарты написания промптов, что и другие модели в аниме-стиле.  
В этом разделе систематически изложены основные правила создания промптов и разобраны типичные ошибки.

## Форматы промптов

Промпты можно условно разделить на две категории:

- **Теги (tags)** — чаще применяются в аниме-моделях.
- **Естественный язык (natural language)** — используется в реалистичных моделях.

### Общие требования

- Промпты должны содержать **только** английские буквы, цифры и английские знаки препинания.
- **Нельзя использовать китайские запятые** ("，") вместо английских (",") — это разные символы.

## Правила написания тегов

- Теги состоят из **маленьких английских слов** или фраз, разделённых английскими запятыми с пробелами (", ").
- Пример тега:

```
   1girl, solo, blue hair
```

- Лишние пробелы или переносы строк **не влияют** на результат генерации.
  - Примеры, дающие одинаковый эффект:
    ```text
    1girl, solo, blue hair
    ```
    ```text
    1girl,solo,blue hair
    ```
- **Нельзя использовать подчёркивания (`_`) вместо пробелов** между словами.
  - Пример ошибки:  
     `ganyu_(genshin_impact)` — неверно.
  - Следует заменить подчёркивания на пробелы:  
     `ganyu (genshin impact)`.
- **Не забудьте экранировать скобки** с помощью обратного слеша `\`:
  - Например:
    ```text
    ganyu \(genshin impact\)
    ```
  - Без экранирования скобки могут быть интерпретированы как команда на усиление важности содержимого.

### Этапы нормализации тега

1. Замените все подчёркивания `_` на пробелы.
2. Экранируйте скобки с помощью `\`.

## Использование тегов из Danbooru и e621

- Рекомендуется **искать и использовать теги** напрямую с **Danbooru** и **e621**.
- Однако:
  - У тегов с этих сайтов слова разделены подчёркиваниями.
  - Скобки не экранированы.

Перед использованием их нужно обработать:  
например, `ganyu_(genshin_impact)` преобразовать в `ganyu \(genshin impact\)`.

---

## Про мета-теги

- **Не используйте мета-теги**, не относящиеся к содержимому изображения.
- Примеры допустимых мета-тегов:
  - `highres` (высокое разрешение)
  - `oil painting (medium)` (стиль масляной живописи)
- Примеры недопустимых:
  - `commentary_request` — относится к переводу комментариев и **не влияет** на изображение.

---

## Рекомендуемый порядок тегов

NoobAI-XL рекомендует логический порядок написания промптов: от основного к дополнительному.

**Шаблон порядка:**

```text
<1girl/1boy/1other/female/male/...>, <персонаж>, <серия>, <художник(и)>, <общие теги>, <дополнительные теги>, <теги качества>
```

> _Теги качества можно размещать в начале списка._

---

## Промпты на естественном языке

- Состоят из полных английских предложений.
- Каждое предложение начинается с заглавной буквы и заканчивается точкой ".".

> Однако для аниме-моделей (включая NoobAI-XL) **предпочтительно использовать именно теги**, а естественный язык только как вспомогательный элемент.

---

# 3.2.2 Генерация персонажей и стилей художников

**NoobAI-XL** поддерживает прямую генерацию множества фанатских персонажей и стилей художников.

- Имена персонажей и стили являются **триггерными словами** (trigger words).
- Их можно найти на сайтах **Danbooru** и **e621**.
- После нормализации тегов их нужно вставлять в промпты **без изменений**.

---

✅ Переведено и оформлено в полном соответствии с вашим стилем!  
Текст готов для использования в `.md` файлах, документации или гайдах.

---

Хотите, я сразу ещё красиво оформлю примеры правильного написания промптов для персонажей и художников отдельно? 🚀  
(Если хотите, скажите: **"Сделай примеры"**)

## Способы использования триггеров для персонажей и художников

Триггеры для персонажей и художников применяются по-разному:

- **Для стиля художника**:  
   Просто добавьте имя художника в подсказку (prompt) — без каких-либо префиксов, суффиксов или дополнительных украшений.  
   **НЕ используйте**: `"by xxx"`, `"artist:xxx"`.  
   **Правильно**: только `"xxx"`.
- **Для персонажей**:  
   Используется формат **«Имя персонажа + Название серии»**.  
   То есть, кроме имени персонажа, необходимо **сразу после** триггерного слова добавить тег серии, указывающий, из какого произведения этот персонаж. - Если у персонажа несколько тегов серии, можно добавить один или несколько из них. - Даже если имя персонажа уже включает название серии, **всё равно нужно дополнительно указать тег серии** — повторение допускается.
  Обычно комбинации **"Имя персонажа + Серия"** достаточно для правильного восстановления.
  **Пример:**  
  Для персонажа **"ganyu\_(genshin_impact)"** правильный триггер:

```text
ganyu \(genshin impact\), genshin impact
```

(скобки необходимо экранировать обратной косой чертой `\`)

---

# Примеры правильного и неправильного использования триггеров

| Тип             | Промпт                                             | Статус       | Причина                                                                             |
| :-------------- | :------------------------------------------------- | :----------- | :---------------------------------------------------------------------------------- |
| Персонаж        | Rei Ayanami                                        | ❌ Ошибка    | 1. Имя должно быть "ayanami rei". 2. Нет тега серии "neon genesis evangelion".      |
| Персонаж        | character:ganyu \(genshin impact\), genshin impact | ❌ Ошибка    | Лишний префикс "character:".                                                        |
| Персонаж        | ganyu\_\(genshin impact\)                          | ❌ Ошибка    | 1. Не нормализован тег: есть подчёркивания. 2. Нет тега серии.                      |
| Персонаж        | ganyu (genshin impact), genshin impact             | ❌ Ошибка    | Скобки не экранированы.                                                             |
| Персонаж        | ganyu (genshin impact\), genshin impact            | ❌ Ошибка    | Левая скобка не экранирована.                                                       |
| Персонаж        | ganyu \(genshin impact\)，genshin impact           | ❌ Ошибка    | Использована китайская запятая вместо английской.                                   |
| Персонаж        | ganyu \(genshin impact\), genshin impact           | ✅ Правильно | Всё корректно нормализовано и добавлен тег серии.                                   |
| Стиль художника | by wlop                                            | ❌ Ошибка    | Лишний префикс "by ".                                                               |
| Стиль художника | artist:wlop                                        | ❌ Ошибка    | Лишний префикс "artist:".                                                           |
| Стиль художника | dino                                               | ❌ Ошибка    | Неверное имя художника: должно быть "dino \(dinoartforame\)" по стандарту Danbooru. |
| Стиль художника | wlop                                               | ✅ Правильно | Правильное использование имени художника.                                           |

---

## Энциклопедия триггерных слов

Для вашего удобства мы также привели полный список триггерных слов в [noob-wiki](https://huggingface.co/datasets/Laxhar/noob-wiki).
**Энциклопедии триггеров:**

- Danbooru Characters: [Перейти](https://huggingface.co/datasets/Laxhar/noob-wiki/blob/main/danbooru_character_webui.csv)
- Danbooru Artists: [Перейти](https://huggingface.co/datasets/Laxhar/noob-wiki/blob/main/danbooru_artist_webui.csv)
- e621 Characters: [Перейти](https://huggingface.co/datasets/Laxhar/noob-wiki/blob/main/e621_character_webui.csv)
- e621 Artists: [Перейти](https://huggingface.co/datasets/Laxhar/noob-wiki/blob/main/e621_artist_webui.csv)
  Каждый файл таблицы включает триггерные слова из одной из баз данных — **Danbooru** или **e621**.  
  Каждая строка таблицы представляет одного персонажа или стиль художника.

> Чтобы использовать, нужно:
> Найти строку с нужным персонажем или стилем художника.
> Скопировать значение из столбца **"trigger"** и вставить его в ваш промпт **без изменений**.

Если вы не уверены в нужном персонаже или стиле, можно нажать на ссылку в колонке **"url"** и просмотреть примеры изображений на сайте.
Ниже описаны значения каждой колонки.  
Не все таблицы содержат все перечисленные колонки.

| Название столбца | Описание                                                   | Примечание                                                                         |
| :--------------- | :--------------------------------------------------------- | :--------------------------------------------------------------------------------- |
| character        | Название тега персонажа на соответствующем сайте           |                                                                                    |
| artist           | Название тега стиля художника на соответствующем сайте     |                                                                                    |
| trigger          | Нормализованный триггер                                    | Копировать и вставлять в промпт без изменений                                      |
| count            | Количество изображений с этим тегом                        | >200 для хорошего восстановления персонажей, >100 для стилей;                      |
| url              | Ссылка на страницу тега на оригинальном сайте              |                                                                                    |
| solo_count       | Количество изображений с одним персонажем (для персонажей) | >50 для надёжного восстановления; более точный показатель, чем count               |
| core_tags        | Ключевые особенности персонажа: внешность, пол, одежда     | Только для таблицы персонажей Danbooru; можно добавить для усиления восстановления |

---

# 3.4 Специальные теги

## Теги качества (Quality Tags)

По убыванию качества:

```text
masterpiece > best quality > high quality / good quality > normal quality > low quality / bad quality > worst quality
```

## Эстетические теги (Aesthetic Tags)

Эстетические теги получены путём оценки изображений с помощью специализированной модели эстетической оценки.  
На данный момент существует только два основных тега:

- **very awa** — представляет верхние 5% данных по оценке моделей **[waifu-scorer-v3](https://huggingface.co/Eugeoter/waifu-scorer-v3)** и **[waifu-scorer-v4-beta](https://huggingface.co/Eugeoter/waifu-scorer-v4-beta)**.
- **worst aesthetic** — представляет нижние 5% данных.

Тег **very awa** получил своё название благодаря схожести эстетических стандартов с моделью **[ArtiWaifu Diffusion](https://civitai.com/models/435207/artiwaifu-diffusion)**.

Дополнительно существует эстетический тег **very as2**, который всё ещё находится на стадии обучения и оказывает незначительное влияние.  
**very as2** представляет верхние 5% данных, оценённых моделью **[aesthetic-shadow-v2-5](https://github.com/discus0434/aesthetic-predictor-v2-5)**.

---

### Сравнение эстетических и качественных тегов

- **Качественные теги** отражают **популярность** изображения среди пользователей.
- **Эстетические теги** отражают **эстетическую оценку**, данную специализированной моделью.

Пример: изображение было сгенерировано с использованием версии **v-pred-0.65s**.

- Тег **very awa** помогает повысить **художественную эстетику** изображения и устраняет ощущение "искусственности" (эффект "AI feeling").
- Тег **very as2** имеет лучшие показатели на этапе обучения, но пока что его влияние на результат **незаметно**.

---

✅ Всё оформлено аккуратно в соответствии с вашим стилем.

Хотите, я ещё покажу, как это можно оформить в виде таблички для ещё более красивой структуризации? 🚀  
(если да, напишите: **"Сделай таблицу"**)

## Теги рейтинга безопасности

Есть четыре метки рейтинга безопасности:

- `general`
- `sensitive`
- `nsfw`
- `explicit`

## Теги годов и эпох

Теги года используются для обозначения года создания работы, косвенно влияя на качество, стиль, точность характера и т. Д. Формат - «Год XXXX», где «XXXX» является конкретным годом, таким как «2024 год». Периодные теги представляют собой диапазон тегов года, которые также оказывают большое влияние на качество изображения. Переписка между метками и годами показана в таблице ниже:

| Период | Годы      | Тег    |
| :----- | :-------- | :----- |
| newest | 2021–2024 | newest |
| recent | 2018–2020 | recent |
| mid    | 2014–2017 | mid    |
| early  | 2011–2013 | early  |
| old    | 2005–2010 | old    |

---

# 3.5 Советы по промпингу

## Стартовая формула

Следующая рекомендуемая стартовая формула использует специальные теги, которые являются наиболее соответствующими тегами, связанными с качеством изображения:

```text
masterpiece, best quality, very awa
```

## Примеры негативных промптов

В таблице ниже представлены общие теги с отрицательными операциями и их источники. Не все негативные теги обязательно плохие, и правильное использование может иметь неожиданные эффекты.

| Tag                 | Описание                                                                   | Источник           |
| :------------------ | :------------------------------------------------------------------------- | :----------------- |
| worst aesthetic     | Худшая эстетика: включает низкое качество, водяные знаки, мангу, скетчи    | Aesthetic Tags     |
| worst quality       | Худшее качество                                                            | Quality Tags       |
| low quality         | Низкое качество (данные с Danbooru)                                        | Quality Tags       |
| bad quality         | Плохое качество (данные с e621)                                            | Quality Tags       |
| lowres              | Низкое разрешение                                                          | Danbooru           |
| scan artifacts      | Артефакты сканирования                                                     | Danbooru           |
| jpeg artifacts      | Артефакты JPEG-сжатия                                                      | Danbooru           |
| lossy-lossless      | Перевод изображения из lossy в lossless вызывает артефакты                 | Danbooru           |
| ai-generated        | Сгенерировано ИИ, часто с жирным эффектом                                  | Danbooru           |
| abstract            | Абстрактное изображение: устраняет грязные линии                           | Danbooru           |
| official art        | Официальное искусство: может содержать логотипы, подписи и авторские права | Danbooru           |
| old                 | Раннее изображение                                                         | Period Tags        |
| 4koma               | Манга в 4 кадра                                                            | Danbooru           |
| multiple views      | Несколько видов                                                            | Danbooru           |
| reference sheet     | Лист персонажа                                                             | Danbooru           |
| dakimakura (medium) | Подушка дакымакура                                                         | Danbooru           |
| turnaround          | Полный разворот персонажа                                                  | Danbooru           |
| comic               | Комикс                                                                     | Danbooru           |
| greyscale           | Чёрно-белое изображение                                                    | Danbooru           |
| monochrome          | Монохромное изображение                                                    | Danbooru           |
| sketch              | Эскиз                                                                      | Danbooru           |
| unfinished          | Незавершённая работа                                                       | Danbooru           |
| furry               | Фурри                                                                      | e621               |
| anthro              | Антропоморфный фурри                                                       | e621               |
| feral               | Дикое животное                                                             | e621               |
| semi-anthro         | Полуантропоморфный фурри, может желтить изображение                        | e621               |
| mammal              | Млекопитающее (фурри)                                                      | e621               |
| watermark           | Водяной знак                                                               | Danbooru           |
| logo                | Логотип                                                                    | Danbooru           |
| signature           | Подпись художника                                                          | Danbooru           |
| text                | Текст                                                                      | Danbooru           |
| artist name         | Имя художника                                                              | Danbooru           |
| dated               | Дата                                                                       | Danbooru           |
| username            | Имя пользователя                                                           | Danbooru           |
| web address         | Веб-адрес                                                                  | Danbooru           |
| bad hands           | Плохие руки                                                                | Danbooru           |
| bad feet            | Плохие ноги                                                                | Danbooru           |
| extra digits        | Лишние пальцы                                                              | Danbooru           |
| fewer digits        | Недостаточно пальцев                                                       | Danbooru           |
| extra arms          | Лишние руки                                                                | Danbooru           |
| extra faces         | Лишние лица                                                                | Danbooru           |
| multiple heads      | Несколько голов                                                            | Danbooru           |
| missing limb        | Отсутствующая конечность                                                   | Danbooru           |
| amputee             | Ампутант                                                                   | Danbooru           |
| severed limb        | Отсечённая конечность                                                      | Danbooru           |
| mutated hands       | Мутировавшие руки                                                          | -                  |
| distorted anatomy   | Искажённая анатомия                                                        | -                  |
| nsfw                | Контент "не для работы" (NSFW)                                             | Safety Rating Tags |
| explicit            | Явный контент                                                              | Safety Rating Tags |
| censored            | Цензурированное изображение                                                | Danbooru           |

## Часто неправильно используемые теги

| Tag       | Описание                                                            | Источник |
| :-------- | :------------------------------------------------------------------ | :------- |
| bad id    | Повреждённый ID изображения: связано с метаданными, не с содержимым | Danbooru |
| bad link  | Повреждённая ссылка на изображение: связано с метаданными           | Danbooru |
| duplicate | Дубликат изображения на сайте: влияет на качество, но не на контент | Danbooru |
