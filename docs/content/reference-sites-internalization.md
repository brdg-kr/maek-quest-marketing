# Reference Sites Internalization

This document converts the observed structure of the following reference sites into a product-local content model for the Internal Dev Platform.

- Source: https://vibecoding-glossary.pages.dev/
- Source: https://ui-design-dictionary.pages.dev/

The goal is not to mirror the original copy. The useful pattern is the learning system:

1. A searchable vocabulary for people who do not know what to ask an AI coding tool.
2. A visual UI pattern dictionary that connects component names to real shapes.
3. Practical examples that let a user start from a finished-looking result.
4. Prompt snippets that turn vocabulary into executable requests.

For this product, the content should become a Korean, internal-business-app-focused library: terms, visual patterns, sample apps, prompt recipes, and governance notes.

## What To Internalize

### From Vibe Coding Glossary

Observed structure:

- Top-level tabs: term list, visual UI guide, box model guide.
- Term list: searchable, category-filtered glossary.
- Visual guide: a full sample landing page annotated by UI part.
- Box model guide: CSS spacing concepts explained with diagrams and prompt examples.

Useful product lesson:

- Non-developers need names before they need code.
- A term is more useful when paired with "where it appears" and "how to ask AI for it."
- Layout concepts like padding, margin, gap, z-index, and responsive breakpoints should be explained visually because text-only explanations are weak for beginners.

### From UI Design Dictionary

Observed structure:

- A persistent search input with live result count.
- Left category navigation with pattern counts.
- Pattern cards with visual thumbnail, English name, local-language name, short description, and tags.
- Detail modal with overview, when to use, examples, and tags.

Useful product lesson:

- A visual card grid is the right format for component discovery.
- The detail page should answer: what is it, when do I use it, what are real examples, and what prompt can I copy?
- Tags help users browse by intent: admin, mobile, dashboard, form, approval, security, data, operation.

## Product Content Architecture

Recommended product sections:

| Section | Purpose |
| --- | --- |
| 업무앱 샘플 갤러리 | Show complete internal app examples users can start from. |
| UI 컴포넌트 사전 | Explain component names and visual roles. |
| 업무 패턴 사전 | Explain business workflows such as approval, ownership, audit log, status transition, and export. |
| AI 프롬프트 레시피 | Provide copyable prompts for Codex, Claude Code, Cursor, and internal templates. |
| 운영/보안 체크리스트 | Make generated apps safe enough for internal deployment. |
| 레이아웃 기초 도감 | Explain spacing, responsive layout, table density, and empty/error states visually. |

## Glossary Inventory

The reference glossary contains 84 observed terms. For our product, translate and group them into Korean-first labels, keeping English aliases for AI prompts.

### Page Structure

| Korean | English Alias | Product Use |
| --- | --- | --- |
| 헤더 | Header | Top area with product name, navigation, search, and user menu. |
| 푸터 | Footer | Bottom area for help, legal, version, and contact links. |
| 사이드바 | Sidebar | Admin navigation for workspaces, apps, settings, logs. |
| 섹션 | Section | A meaningful block in a page, dashboard, or report. |
| 히어로 섹션 | Hero Section | Intro section for sample app previews or template pages. |
| 컨테이너 | Container | Width-limited content wrapper for readable layouts. |
| CTA | Call To Action | Primary action such as create app, deploy, approve, export. |

### Navigation

| Korean | English Alias | Product Use |
| --- | --- | --- |
| 내비게이션 바 | Navigation Bar / Navbar | Main navigation on generated apps. |
| 햄버거 메뉴 | Hamburger Menu | Collapsed mobile navigation. |
| 브레드크럼 | Breadcrumb | Show current app or settings path. |
| 페이지네이션 | Pagination | Split long lists into pages. |
| 탭 | Tab | Switch between overview, logs, settings, deployments. |
| 앵커 링크 | Anchor Link | Jump to sections in long documentation or reports. |

### UI Parts

| Korean | English Alias | Product Use |
| --- | --- | --- |
| 버튼 | Button | Trigger actions such as save, restart, deploy. |
| 카드 | Card | Summarize apps, metrics, templates, or tasks. |
| 모달 | Modal / Dialog | Focused confirmation, form, or detail overlay. |
| 드롭다운 | Dropdown | Select an option or open contextual menu. |
| 아코디언 | Accordion | Collapse FAQ, policy details, or log groups. |
| 툴팁 | Tooltip | Explain icon-only or technical controls. |
| 토스트 알림 | Toast / Snackbar | Temporary success/failure feedback. |
| 배지 | Badge | Show status, count, tier, or risk level. |
| 아바타 | Avatar | Represent owner, approver, reviewer, or team. |
| 태그/칩 | Tag / Chip | Represent category, environment, status, or skill. |
| 진행 바 | Progress Bar | Show deployment, scan, import, or build progress. |
| 로딩 스피너 | Spinner / Loading | Show short waiting state. |
| 캐러셀/슬라이더 | Carousel / Slider | Browse screenshots or examples. |
| 구분선 | Divider / Separator | Separate dense panels or form groups. |
| 스켈레톤 | Skeleton Screen | Reserve layout while data loads. |

### Forms

| Korean | English Alias | Product Use |
| --- | --- | --- |
| 텍스트 입력 | Input / Text Field | Single-line input for names, emails, domains. |
| 텍스트 영역 | Textarea | Long input for notes, prompts, descriptions. |
| 체크박스 | Checkbox | Multiple independent options. |
| 라디오 버튼 | Radio Button | One selection among exclusive choices. |
| 셀렉트 박스 | Select / Dropdown | Pick team, environment, template, role. |
| 토글 스위치 | Toggle Switch | Turn a setting on or off. |
| 라벨 | Label | Name a form field clearly. |
| 플레이스홀더 | Placeholder | Show an example value before typing. |
| 유효성 검사 | Validation | Show invalid value, required field, or unsafe input. |

### Interaction

| Korean | English Alias | Product Use |
| --- | --- | --- |
| 호버 | Hover | Reveal affordance or extra detail on desktop. |
| 클릭/탭 | Click / Tap | Basic selection and command action. |
| 스크롤 | Scroll | Navigate long tables, logs, or docs. |
| 트랜지션 | Transition | Smooth visual change between states. |
| 애니메이션 | Animation | Use sparingly for progress and feedback. |
| 포커스 | Focus | Show current keyboard/input target. |
| 드래그 앤 드롭 | Drag & Drop | Reorder tasks or upload files. |
| 스와이프 | Swipe | Mobile action for list rows or cards. |

### Layout

| Korean | English Alias | Product Use |
| --- | --- | --- |
| 플렉스박스 | Flexbox | Align controls, toolbar items, small groups. |
| CSS 그리드 | CSS Grid | Build responsive card grids and dashboards. |
| 반응형 디자인 | Responsive Design | Support desktop, tablet, mobile. |
| 브레이크포인트 | Breakpoint | Decide when layout changes. |
| 마진 | Margin | Space between elements. |
| 패딩 | Padding | Space inside an element. |
| 갭 | Gap | Consistent spacing between flex/grid children. |
| z-index | z-index | Control overlay order for modal, dropdown, tooltip. |

### Text

| Korean | English Alias | Product Use |
| --- | --- | --- |
| 폰트 | Font / Font Family | Choose readable UI typography. |
| 폰트 크기 | Font Size | Keep dense business screens readable. |
| 글자 두께 | Font Weight | Show hierarchy and emphasis. |
| 행간 | Line Height | Improve readability in descriptions and logs. |
| 자간 | Letter Spacing | Use carefully, mostly default for UI. |
| 텍스트 정렬 | Text Align | Align labels, numeric columns, headings. |
| 제목 | Heading | Structure page hierarchy. |
| 말줄임 | Text Truncation / Ellipsis | Prevent long names from breaking tables/cards. |

### Visual Styling

| Korean | English Alias | Product Use |
| --- | --- | --- |
| 배경색 | Background Color | Separate page bands or status areas. |
| 그라데이션 | Gradient | Use lightly; business tools should stay restrained. |
| 그림자 | Box Shadow / Drop Shadow | Indicate elevation for popovers and cards. |
| 테두리 | Border | Separate table rows, cards, and inputs. |
| 모서리 둥글기 | Border Radius | Keep business UI modest and consistent. |
| 투명도 | Opacity | Indicate disabled or secondary state. |
| 배경 흐림 | Backdrop Blur / Glassmorphism | Only for intentional overlay effects. |

### Media

| Korean | English Alias | Product Use |
| --- | --- | --- |
| 이미지 | Image | Show screenshots, attachments, diagrams. |
| 동영상 | Video | Demo workflows or training content. |
| 아이콘 | Icon | Compactly represent actions and categories. |
| 파비콘 | Favicon | Identify generated apps in tabs/bookmarks. |
| OGP 이미지 | Open Graph Image | Preview app or documentation links. |
| 이미지 맞춤 | Object Fit | Crop/fit screenshots and thumbnails predictably. |

### Development Basics

| Korean | English Alias | Product Use |
| --- | --- | --- |
| 컴포넌트 | Component | Reusable UI building block. |
| API | API | Backend interface used by generated apps. |
| 배포 | Deploy | Publish an app to an internal URL. |
| npm/패키지 | npm / Package | Shared code dependency. |
| DOM | DOM | Browser-side document structure. |
| 이벤트 | Event | User or system action handler. |
| CSS 변수 | CSS Custom Properties / Variables | Shared design tokens. |
| CSS 클래스 | CSS Class | Styling hook for components. |
| 다크 모드 | Dark Mode | Optional theme mode. |
| 접근성 | Accessibility / a11y | Keyboard, screen reader, contrast, semantic UI. |

## UI Pattern Inventory

The reference UI dictionary exposes about 108 visual patterns. The following product inventory keeps the pattern names and adapts their usage to internal apps.

### Navigation Patterns

- Hamburger Menu: mobile navigation collapse.
- Tab Bar: bottom mobile section switcher.
- Breadcrumb: hierarchy path for workspace, app, and settings.
- Sidebar Navigation: persistent desktop admin navigation.
- Mega Menu: large categorized navigation panel.
- Pagination: page-based list navigation.
- Infinite Scroll: feed-like continuous loading.
- Sticky Header: header that remains available while scrolling.
- Drawer: side panel for navigation, filters, or details.
- Command Palette: keyboard-first command/search launcher.
- Segmented Control: compact exclusive mode switch.
- Tabs: switch visible content within one area.
- Stepper / Wizard: guided multi-step workflow.
- Anchor Navigation: jump links for long pages.

### Layout Patterns

- Grid Layout: equal card or tile grid.
- Masonry Layout: irregular card grid for mixed content height.
- Card Layout: repeated information blocks.
- Split Screen: two-pane comparison or editor/detail view.
- Hero Section: first-viewport intro for examples and templates.
- Bento Grid: mixed-size feature blocks.
- Holy Grail Layout: header/sidebar/content/footer admin layout.
- Full Bleed: edge-to-edge visual or data area.
- Sticky Sidebar: helper/sidebar that follows scroll.

### Forms And Input Patterns

- Text Field: single-line data entry.
- Textarea: long-form notes and prompts.
- Select / Dropdown: choose from known values.
- Checkbox: multiple independent selections.
- Radio Button: one exclusive selection.
- Toggle Switch: immediate on/off setting.
- Slider / Range: numeric range control.
- Date Picker: calendar-based date selection.
- File Upload: upload attachments, CSV, images, docs.
- Search Bar: keyword search.
- Autocomplete: suggest while typing.
- Tag Input: multi-value chip input.
- OTP Input: verification code entry.
- Password Strength Meter: password safety feedback.
- Color Picker: visual color selection.
- Inline Edit: edit displayed text directly.
- Multi-step Form: long form broken into steps.

### Data Display Patterns

- Table: dense row/column data.
- List View: simple vertical records.
- Tree View: hierarchy browser.
- Timeline: chronological events.
- Kanban Board: status-column task board.
- Stat Card: metric summary.
- Badge: compact status/count indicator.
- Tag / Chip: metadata label.
- Avatar: person or team identity.
- Progress Bar: completion status.
- Skeleton Screen: loading placeholder.
- Empty State: no-data guidance.
- Chart / Graph: visual analytics.

### Feedback Patterns

- Toast / Snackbar: temporary action result.
- Modal / Dialog: focused overlay.
- Alert / Banner: important persistent message.
- Tooltip: small contextual help.
- Popover: richer floating panel.
- Loading Spinner: wait indicator.
- Confirmation Dialog: explicit confirmation for risky actions.
- Notification Panel: collected notifications.

### Content Patterns

- Accordion: collapsible content.
- Carousel / Slider: rotate screenshots or cards.
- Lightbox: focused media preview.
- Pricing Table: plan comparison.
- Testimonial: quote or proof block.
- CTA Section: conversion action block.
- FAQ Section: questions and answers.
- Feature Section: feature grid.
- Comparison Table: compare options or plans.

### Action Patterns

- Button: direct command.
- FAB: floating primary action.
- Context Menu: right-click/secondary command menu.
- Action Sheet: mobile action chooser.
- Split Button: primary action plus dropdown alternatives.
- Button Group: grouped commands.
- Swipe Actions: mobile row actions.
- Pull to Refresh: mobile refresh gesture.

### Mobile Patterns

- Bottom Sheet: bottom-up mobile panel.
- Stories: full-screen sequence cards.
- App Bar: mobile top bar.
- Speed Dial: expandable floating actions.

### Social And Communication Patterns

- Comment Thread: nested discussion.
- Emoji Reactions: quick reaction control.
- Feed Card: activity feed entry.

### Onboarding And Guidance Patterns

- Walkthrough: step-by-step guided overlay.
- Welcome Screen: first-use entry screen.
- Progress Checklist: onboarding task checklist.

### Media Patterns

- Video Player: training or demo video.
- Audio Player: voice/audio playback.
- Image Gallery: inspect multiple images.

### Commerce Patterns

- Product Card: item summary card.
- Shopping Cart: selected item collection.
- Rating / Review: review score and comments.

### Advanced Patterns

- Dark Mode Toggle: theme switch.
- Virtual Scroll: efficient huge-list rendering.
- Responsive Breakpoints: responsive layout rules.
- Micro-interactions: small feedback motions.
- Keyboard Shortcuts: discoverable command keys.

### Authentication Patterns

- Login Form: sign-in UI.
- Sign Up Form: account registration.

### Error And System Patterns

- Error State: error explanation and recovery action.
- Maintenance Page: planned downtime notice.
- Cookie Banner: consent notice.

## Internal Business App Content Extensions

The two reference sites are web/UI focused. Our product needs internal-app-specific terms as first-class content.

Recommended additions:

- App Owner: person responsible for an internal app.
- Approver: person who approves publishing or access.
- Data Classification: public/internal/confidential/personal data level.
- Audit Log: record of who changed what and when.
- Deployment History: list of releases and pipeline results.
- Environment: dev/staging/production target.
- Secret: API key or credential that must not be exposed.
- Role-Based Access Control: permission by role or group.
- Approval Flow: ordered review and decision workflow.
- Status Transition: allowed movement between states.
- Retention Policy: how long logs/files/data are kept.
- Archive: stop active use while preserving records.
- Rollback: restore previous deployment or version.
- Export: download table/report data.
- Import: upload CSV or source data.
- Webhook: event-based integration callback.
- SLA: support or recovery commitment.
- Health Check: automated availability check.

## Prompt Recipe Format

Each content item should support this schema:

```yaml
id: unique-slug
title_ko: Korean display title
aliases:
  - English alias
category: ui | workflow | data | security | operations
what_it_is: one sentence in Korean
when_to_use: one sentence in Korean
visual_notes:
  - what the user should see
ai_prompt:
  codex: copyable implementation prompt
  cursor: copyable implementation prompt
governance_notes:
  - security, audit, ownership, permission, or deployment note
related_patterns:
  - linked pattern ids
```

## Product Rule

Every entry should end with an action:

- "이 컴포넌트로 화면 만들기"
- "이 패턴으로 새 앱 만들기"
- "이 프롬프트 복사하기"
- "이 템플릿에서 시작하기"

That is the key difference between a dictionary and an app factory.
