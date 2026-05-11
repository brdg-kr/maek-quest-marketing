# 사내망 AI/Vibe Coding App Factory 제품화 검토

작성일: 2026-05-08  
대상 폴더: `D:\source\repos\brdg-kr\internal-dev-platform`  
문서 목적: 사용자가 제시한 사업 아이디어와 후속 질문을 바탕으로, Ubuntu 기반 사내망 웹앱 생성/배포 플랫폼의 제품화 가능성, 설치 구조, MVP 범위, 리스크를 정리한다.

## 1. 사용자 문제 정의

바이브코딩이 많아지면서 전문 개발자가 아닌 직원들도 직접 개발을 시작하고 있다. 설치형 앱도 만들어지지만, 특히 웹 서비스가 많이 만들어지고 있다.

문제는 사내에서 만드는 웹 서비스가 보통 사내망 안에서 호스팅되어야 한다는 점이다. 대기업처럼 사내 IT 전문 조직이 충분하면 내부 호스팅, GitLab, CI/CD, 배포, 보안 검토를 지원할 수 있다. 하지만 중소규모 업체에서는 IT팀이 처리해야 할 일이 많고, 현업이 만든 작은 업무용 웹서비스를 매번 받아서 서버, 도메인, 배포, 인증, 로그, 보안까지 봐주기 어렵다.

이 공백에 니치마켓이 있다. 직원들이 사내망 안에서 직접 웹서비스를 만들고, GitLab 기반 자동 CI/CD와 배포까지 할 수 있게 해주는 솔루션 또는 플랫폼을 판매할 수 있다.

이미 내부에서는 다음과 유사한 솔루션을 만들어 사용한 경험이 있다.

- 바이브코딩 시작 시 npm 패키지와 지정 프롬프트로 표준 스킬셋을 제공한다.
- Next.js 템플릿을 자동으로 깐다.
- GitLab 자동 배포 구성을 만든다.
- Ubuntu에서 Nginx 설정을 자동화한다.
- 앱 생성 직후 1차 도메인이 나오고, 잠시 후 접속하면 템플릿 앱이 뜬다.
- 이후 직원들은 그 안에 업무 기능을 추가한다.

후속 요구는 Ubuntu용 솔루션/패키지를 만들 때 다음까지 거의 자동 포함하는 것이다.

- 관리 대시보드
- 바이브코딩으로 만들어진 웹앱을 사용자가 관리하는 웹 플랫폼
- 인증서 설치
- GitLab 설치
- 계정 설정
- GitLab Runner, Nginx, 도메인, 배포 파이프라인 자동 설정

## 2. 결론

가능하다. 방향도 맞다.

다만 제품명을 단순히 "사내 웹서비스 호스팅 솔루션"으로 잡으면 작아 보인다. 더 적절한 카테고리는 다음에 가깝다.

> 사내망용 AI/Vibe Coding App Factory + Internal Developer Platform

핵심 가치는 배포 자동화 자체가 아니다. 핵심은 직원이 AI로 만든 내부 앱이 사내망 안에서 안전하게 생성, 배포, 운영, 폐기되는 표준 경로를 제공하는 것이다.

기술만 보면 5/10, 제품화하면 8/10으로 평가할 수 있다. GitLab CI/CD, Next.js 템플릿, Nginx 자동 설정, DNS 자동 발급은 기술적으로 훌륭하지만, 이것만 팔면 DevOps 스크립트 묶음으로 보인다. 여기에 권한, 보안, 감사로그, 앱 카탈로그, 소유자 관리, 템플릿 정책, 배포 승인, 취약점 검사, 백업, 장애 대응을 붙이면 구매자가 이해하는 제품이 된다.

가장 좋은 한 줄 설명은 다음이다.

> 직원이 AI로 만든 업무용 웹서비스를 사내망 안에서 5분 만에 만들고, IT팀은 보안, 배포, 운영을 통제하는 플랫폼.

## 3. 검증한 현재 상태

현재 로컬 폴더 상태는 다음과 같다.

- `D:\source\repos\brdg-kr\internal-dev-platform` 폴더는 존재한다.
- 현재 시점에는 Git 저장소가 아니다. `git status --short` 실행 시 `fatal: not a git repository`가 반환되었다.
- 폴더 내부에 기존 프로젝트 파일은 보이지 않았다.

따라서 이 문서는 현재 빈 제품 저장소의 1차 기획/아키텍처 문서 역할을 한다.

## 4. 시장 타이밍

시장 방향은 제안한 문제와 맞다.

Gartner는 플랫폼 엔지니어링을 재사용 가능한 서비스, 컴포넌트, 도구를 제공하는 내부 공급자 모델로 설명한다. Gartner 페이지에서는 2026년까지 대형 소프트웨어 엔지니어링 조직의 80%가 플랫폼 엔지니어링 팀을 내부 공급자로 둘 것이라고 전망한다. 이는 대기업은 내부 플랫폼 팀을 만들지만, 중소/중견기업은 같은 역량을 직접 만들기 어렵다는 기회로 해석할 수 있다.

Internal Developer Portal/Platform도 이미 시장 카테고리로 잡혀 있다. Gartner Peer Insights는 Internal Developer Portal을 셀프서비스 검색, 자동화, 재사용 컴포넌트, 플랫폼 서비스, 지식 자산 접근을 제공하는 도구로 정의하고, 주요 기능으로 대시보드, 플랫폼 연동, 소프트웨어 카탈로그, RBAC/SSO, scorecard, self-service action, curated template 등을 든다.

AI 코딩 확산은 이런 제품 수요를 키운다. GitLab의 2025년 DevSecOps 조사 발표에서는 응답자의 73%가 vibe coding으로 만들어진 코드에서 문제를 경험했고, 70%는 AI가 컴플라이언스 관리를 더 어렵게 만든다고 답했다. 또한 85%는 agentic AI가 플랫폼 엔지니어링 접근 안에서 구현될 때 가장 성공적일 것이라고 봤다.

보안 리스크도 구매 논리가 된다. Veracode의 2025 GenAI Code Security Report 요약은 100개 이상의 LLM을 테스트한 결과 AI 생성 코드 샘플의 45%가 보안 테스트에 실패해 OWASP Top 10 취약점을 만들었다고 설명한다. JavaScript도 43% 실패율로 제시되어, Next.js 기반 내부 앱도 "작동한다"와 "안전하다"가 다르다는 메시지를 줄 수 있다.

최근 공개 웹에 바로 배포되는 vibe-coded 앱의 위험 사례도 있다. WIRED는 2026년 5월 7일 기사에서 RedAccess 조사를 인용해 Lovable, Replit, Base44, Netlify 등으로 만든 vibe-coded 웹앱 중 5,000개 이상이 사실상 인증 없이 노출되었고, 약 40%가 민감 데이터를 노출했다고 보도했다. 다만 해당 업체들이 일부 주장에 반박했고, WIRED도 모든 데이터의 실재성을 확인한 것은 아니라고 밝혔다. 이 사례는 "아무나 만든 앱이 공개 웹에 바로 올라가는 위험"을 설명하는 보조 근거로 쓰는 것이 적절하다.

국내 금융권의 망분리 완화 흐름도 "통제된 내부 개발환경"의 필요성을 약화시키기보다 강화한다. 금융위원회는 2026년 1월 19일 보도자료에서 SaaS를 망분리 예외사유로 명시하는 방향을 추진한다고 밝혔지만, 이용자의 고유식별정보 또는 개인 신용정보를 처리하는 경우에는 예외를 허용하지 않을 예정이라고 밝혔다. 또한 보안성 평가, 단말 보호, 안전한 인증, 최소권한, 중요정보 모니터링, 외부 인터넷 접근 통제, 네트워크 구간 암호화, 반기별 정보보호통제 평가 등을 요구한다.

## 5. 제품 포지셔닝

팔아야 할 것은 CI/CD 자동화가 아니다. 팔아야 할 것은 사내 AI 앱 생성, 배포, 운영의 표준 경로다.

권장 포지셔닝:

> 현업 직원이 AI로 만든 웹앱을 사내망에서 안전하게 만들고 배포하는 플랫폼.

또는:

> Ubuntu 서버 한 대로 사내망용 AI 웹앱 개발, 배포, 운영 플랫폼을 자동 구축합니다.

제품 축은 세 가지로 잡는 것이 좋다.

| 축 | 설명 |
| --- | --- |
| Vibe Coding Enablement | 직원이 지정 프롬프트와 템플릿으로 앱을 시작하면 기본 구조, 인증, 라우팅, 배포까지 자동 구성 |
| Internal Hosting Platform | 사내 Ubuntu/VM/Nginx/GitLab 기반으로 내부 도메인, reverse proxy, 배포, 로그, 모니터링 제공 |
| Governance Layer | 앱 소유자, 승인자, 접근권한, 보안검사, 감사로그, 폐기정책, 백업, 장애 알림 제공 |

현재 내부에서 이미 만든 기능은 첫 번째와 두 번째 축에 가깝다. 앞으로 제품 가격을 만들 부분은 세 번째 축이다.

## 6. 구매자와 타깃

1차 타깃은 직원 100명에서 2,000명 규모의 중소/중견기업이다.

| 타깃 | 적합한 이유 |
| --- | --- |
| 제조, 물류, 건설, 병원, 교육기관 | 현장 업무 자동화 수요가 많고, ERP 밖의 작은 웹서비스가 많이 필요함 |
| 내부 IT팀 2명에서 10명 규모 회사 | 요청은 많지만 GitLab, 서버, Nginx, 배포, 보안을 일일이 봐줄 여력이 없음 |
| 외부 SaaS 사용이 어려운 회사 | 내부망 호스팅, 자체 GitLab, 사내 DNS, 내부 인증이 강점 |
| 그룹사/계열사 IT팀 | 계열사별 작은 업무앱 수요가 많고, 중앙 IT가 표준 플랫폼을 제공해야 함 |
| 금융, 공공, 의료 주변 시장 | 망분리, 개인정보, 감사 대응 때문에 통제된 내부 개발환경의 가치가 큼 |

영업 메시지는 대상별로 나눠야 한다.

| 대상 | 메시지 |
| --- | --- |
| CEO/임원 | 현업 자동화 속도를 높이고 IT 병목을 줄입니다. |
| IT팀장 | GitLab, 배포, DNS, Nginx, 로그, 권한을 표준화합니다. |
| 보안팀 | AI 생성 앱을 방치하지 않고 승인, 검사, 감사 가능한 경로로 묶습니다. |

## 7. 경쟁 구도와 차별화

직접 경쟁자는 Internal Developer Portal/Platform 제품군이다. Backstage, Port, Atlassian Compass, Cortex, OpsLevel, Roadie 같은 제품이 있다.

하지만 이들이 모두 직접 경쟁자는 아니다. 많은 제품은 글로벌 엔터프라이즈, 클라우드, Kubernetes, SaaS 중심이다. 이 제품의 차별화는 다음이어야 한다.

| 기존 IDP 제품 | 차별화 방향 |
| --- | --- |
| 개발자 중심 | 비전문 개발자와 현업의 vibe coding까지 포함 |
| 클라우드/Kubernetes 중심 | 사내망, Ubuntu, Nginx, GitLab, 폐쇄망 중심 |
| 포털/카탈로그 중심 | 프롬프트 시작, repo 생성, CI/CD, DNS, 접속 가능까지 end-to-end |
| 대기업 플랫폼팀 대상 | 플랫폼팀이 없는 중소/중견 IT팀 대상 |
| 영어권/글로벌 워크플로 | 한국 기업의 내부망, 결재, 보안감사, 운영대행 문맥에 최적화 |

## 8. Ubuntu 솔루션/패키지 구조

제품은 단일 `.deb` 패키지처럼 보일 수 있지만, 실제 역할은 사내 개발 플랫폼을 부트스트랩하는 설치기여야 한다.

권장 구성:

| 구성요소 | 역할 |
| --- | --- |
| `idpctl` CLI | 설치, 점검, 업그레이드, 백업, 장애진단을 수행하는 관리자 CLI |
| 관리 대시보드 | GitLab, Runner, Nginx, 인증서, DNS, 앱 상태, 로그, 사용자, 정책 관리 |
| 사용자 앱 포털 | 직원이 앱 생성, 배포상태 확인, 로그 확인, 환경변수 설정, URL 확인 |
| App Runtime | vibe coding으로 만든 Next.js/Node 앱을 실행하는 표준 런타임 |
| GitLab 자동화 모듈 | GitLab 설치, 그룹/프로젝트/템플릿/CI/CD 생성 |
| Runner 자동화 모듈 | GitLab Runner 설치 및 등록 |
| Nginx 자동화 모듈 | 앱별 reverse proxy, WebSocket, HTTPS, 도메인 라우팅 |
| 인증서 모듈 | Let's Encrypt, 사내 CA, 수동 wildcard 인증서, step-ca 중 선택 |
| 계정/권한 모듈 | 로컬 계정, LDAP/AD, OIDC/SSO 연동 |
| 감사/보안 모듈 | 앱 소유자, 접근권한, 배포 승인, secret 검사, dependency 검사 |

패키지 레이아웃 예시:

```text
internal-dev-platform.deb
  /usr/bin/idpctl
  /opt/internal-dev-platform/
    api/
    web-admin/
    web-portal/
    worker/
    templates/
    nginx/
    ansible/
    migrations/
  /etc/internal-dev-platform/config.yaml
  /etc/systemd/system/internal-dev-platform-api.service
  /etc/systemd/system/internal-dev-platform-worker.service
  /var/lib/internal-dev-platform/
```

핵심은 idempotent installer다. 같은 명령을 여러 번 실행해도 시스템이 깨지지 않아야 한다.

```bash
sudo idpctl preflight
sudo idpctl init
sudo idpctl install gitlab
sudo idpctl install runner
sudo idpctl install gateway
sudo idpctl install platform
sudo idpctl bootstrap
sudo idpctl create-sample-app
sudo idpctl status
```

## 9. 설치 흐름 예시

고객사는 Ubuntu 서버 한 대를 준비하고 다음 흐름으로 설치한다.

```bash
curl -fsSL https://your-domain/install.sh | sudo bash
sudo idpctl init
sudo idpctl install
sudo idpctl status
```

`idpctl init`에서 받는 설정 예시:

```yaml
platform:
  domain: platform.company.internal
  apps_domain: apps.company.internal
  gitlab_domain: gitlab.company.internal

install:
  mode: all-in-one
  ubuntu_version: "24.04"
  gitlab: ce
  runner: true
  nginx: platform-gateway

certificate:
  mode: internal-ca
  ca: step-ca
  wildcard_cert: "*.apps.company.internal"

auth:
  mode: oidc
  provider: keycloak
  allow_local_admin: true

gitlab:
  root_email: admin@company.internal
  create_service_account: true
  default_group: vibe-apps

app_runtime:
  type: node
  template: nextjs
  deploy_strategy: docker-compose
```

설치 완료 후 URL 구조:

| URL | 용도 |
| --- | --- |
| `https://platform.company.internal` | 관리자 대시보드 |
| `https://apps.company.internal` | 사용자 앱 포털 |
| `https://gitlab.company.internal` | GitLab |
| `https://sample.apps.company.internal` | 자동 생성된 샘플 웹앱 |

## 10. GitLab 설계 판단

GitLab을 직접 대체하려고 하면 제품 범위가 너무 커진다. GitLab은 저장소와 CI/CD 엔진으로 쓰고, 플랫폼은 GitLab을 설치, 설정, 자동화하는 상위 레이어가 되어야 한다.

공식 문서 기준 확인 사항:

- GitLab Linux package는 Ubuntu에 설치할 수 있다.
- 설치 시 `EXTERNAL_URL="https://gitlab.example.com"` 형태로 외부 URL을 지정할 수 있다.
- GitLab CE/EE는 Ubuntu 22.04와 24.04를 지원한다.
- GitLab Runner는 Debian/Ubuntu용 공식 repository 설치 경로가 있다.
- GitLab REST API에는 프로젝트 생성을 위한 `POST /projects`가 있다.
- GitLab CI/CD 변수는 masked 또는 hidden 처리할 수 있다.

권장 운영 모드:

| 모드 | 설명 | 권장 대상 |
| --- | --- | --- |
| All-in-one | GitLab, Runner, Nginx, 플랫폼, 앱 런타임을 한 서버에 설치 | PoC, 소규모 고객 |
| Split | GitLab 서버와 앱 실행 서버를 분리 | 실사용 고객 |
| Enterprise | GitLab, Runner, Proxy, DB, 로그, 백업을 분리 | 중견/대기업 |

초기에는 All-in-one으로 쉽게 설치되게 만들고, 실제 판매에서는 Split 구성을 권장하는 방식이 좋다.

## 11. Nginx와 인증서 설계

주의할 점은 GitLab Omnibus도 자체 Nginx를 포함하고, 플랫폼도 앱 라우팅을 위해 Nginx가 필요하다는 점이다.

권장 방식은 플랫폼 Nginx를 front gateway로 두는 것이다.

```text
사용자 요청
  -> Platform Nginx : 80/443
      -> gitlab.company.internal  -> GitLab
      -> platform.company.internal -> 관리 대시보드
      -> apps.company.internal     -> 사용자 앱 포털
      -> *.apps.company.internal   -> 개별 웹앱
```

제품화 관점에서는 다음 순서가 현실적이다.

| 단계 | 권장 방식 |
| --- | --- |
| PoC | GitLab bundled Nginx 유지, 앱 Gateway는 별도 포트 또는 별도 VM |
| 상용 v1 | Platform Nginx를 front gateway로 사용 |
| Enterprise | L4/L7 로드밸런서 + Nginx gateway + GitLab 분리 |

Next.js 앱과 실시간 기능이 있는 앱은 WebSocket도 고려해야 한다. Nginx 공식 문서는 WebSocket reverse proxy에서 `Upgrade`와 `Connection` 헤더를 명시적으로 넘겨야 한다고 설명한다. 앱별 Nginx 템플릿에는 이 설정을 기본 포함하는 것이 좋다.

인증서 모드는 세 가지가 필요하다.

| 인증서 모드 | 설명 | 적합한 환경 |
| --- | --- | --- |
| Public Let's Encrypt | 외부에서 검증 가능한 실제 도메인 사용 | 인터넷 연결 가능, public DNS 사용 |
| Internal CA | 사내 CA, AD CS, step-ca 등으로 내부 인증서 발급 | 사내망 전용 도메인 |
| Manual wildcard | 고객이 `*.apps.company.internal` 인증서와 key를 업로드 | 보안팀이 인증서를 직접 관리 |

사내망용 자동 인증서에는 `step-ca`가 좋은 후보이다. Smallstep 문서 기준으로 `step-ca`는 private infrastructure용 TLS 인증서를 ACME 프로토콜로 발급하고 자동 갱신할 수 있다.

## 12. 계정/권한/SSO

로컬 계정만으로 가면 사내 판매용 제품이 되기 어렵다. 기본 구조는 다음을 지원해야 한다.

| 방식 | 설명 |
| --- | --- |
| Local admin | 초기 설치/비상복구용 |
| LDAP/AD | 중소/중견기업의 Windows AD 환경 대응 |
| OIDC/SAML | Keycloak, Azure AD, Okta, Google Workspace 등 대응 |

초기 설치 흐름:

```text
초기 설치
  -> root admin 생성
  -> platform-bot 서비스 계정 생성
  -> GitLab API token 발급/저장
  -> vibe-apps 그룹 생성
  -> template repositories 생성
  -> GitLab Runner 등록
  -> 관리자 대시보드와 GitLab 연결
```

가능하면 같은 인증 소스를 다음에 모두 태워야 한다.

```text
SSO/OIDC/LDAP
  -> GitLab 로그인
  -> 관리 대시보드 로그인
  -> 앱 포털 로그인
  -> 개별 업무앱 접근권한
```

## 13. 사용자 앱 포털

사용자 앱 포털은 GitLab을 모르는 직원도 앱을 만들 수 있게 해야 한다.

필수 화면:

| 화면 | 기능 |
| --- | --- |
| 내 앱 목록 | 내가 만든 앱, 배포 상태, URL, 최근 배포시간 |
| 새 앱 만들기 | 앱 이름, 템플릿, 접근권한, 데이터 등급 선택 |
| 앱 상세 | GitLab repo, 배포 이력, 로그, 환경변수, 도메인 |
| 배포 상태 | pipeline 성공/실패, rollback |
| 접근권한 | 개인, 팀, 전사, 관리자 승인 필요 |
| 운영 메뉴 | restart, stop, archive, owner 변경 |
| AI 개발 시작 | Cursor, Claude Code, Codex용 프롬프트와 npm package 설치 안내 |

사용자가 "새 앱 만들기"를 누를 때 내부 흐름은 다음과 같다.

```text
1. 앱 이름 입력: inventory-dashboard
2. 플랫폼이 slug 생성: inventory-dashboard
3. GitLab project 생성
4. Next.js template push
5. .gitlab-ci.yml 생성
6. 환경변수/secret 등록
7. Runner pipeline 실행
8. 앱 빌드
9. 런타임 서버에 배포
10. Nginx vhost 생성
11. 인증서 발급/연결
12. DNS 또는 wildcard routing 연결
13. URL 반환:
    https://inventory-dashboard.apps.company.internal
```

## 14. 관리 대시보드

관리 대시보드는 단순 상태 페이지가 아니라 운영/보안 통제 화면이어야 한다.

필수 화면:

| 화면 | 기능 |
| --- | --- |
| 시스템 상태 | GitLab, Runner, Nginx, 인증서, 디스크, CPU, 메모리 |
| 앱 카탈로그 | 전체 앱, owner, URL, 데이터 등급, 마지막 배포일 |
| 보안 정책 | 인증 필수 여부, 외부 API 허용, secret 정책 |
| 템플릿 관리 | Next.js 템플릿, API 템플릿, dashboard 템플릿 |
| 사용자/그룹 | SSO/LDAP 동기화, 권한 매핑 |
| 배포 정책 | 자동 배포, 승인 배포, 운영 배포 제한 |
| 인증서 | 만료일, 발급 방식, 갱신 상태 |
| 로그/감사 | 누가 앱 생성/배포/중지/삭제했는지 |
| 백업/복구 | GitLab, 플랫폼 DB, 앱 설정, Nginx 설정 백업 |
| 업그레이드 | GitLab/Runner/platform 버전 점검 |

이 대시보드가 있어야 자동화 스크립트가 아니라 상용 플랫폼으로 보인다.

## 15. MVP 범위

처음부터 모든 기능을 넣지 말고, v1은 "사내 앱 생성/배포의 golden path"에 집중해야 한다.

| v1 기능 | 포함 여부 |
| --- | --- |
| Ubuntu 24.04 설치 지원 | 필수 |
| GitLab CE 자동 설치 | 필수 |
| GitLab Runner 자동 설치 | 필수 |
| 관리 대시보드 | 필수 |
| 사용자 앱 포털 | 필수 |
| Next.js 템플릿 앱 생성 | 필수 |
| GitLab project 자동 생성 | 필수 |
| `.gitlab-ci.yml` 자동 생성 | 필수 |
| Nginx reverse proxy 자동 설정 | 필수 |
| HTTPS 인증서 3모드 | 필수 |
| 앱별 로그 조회 | 필수 |
| 앱별 restart/stop | 필수 |
| SSO/OIDC 또는 LDAP 연동 | 최소 1개 필수 |
| 앱 소유자/승인자 관리 | 필수 |
| 보안 검사 | 기본 secret scan부터 |
| Kubernetes | v1 제외 가능 |
| 복잡한 멀티테넌시 | v1 제외 가능 |

Kubernetes는 처음부터 중심으로 두지 않는 편이 좋다. 중소/중견 내부망 고객은 Kubernetes 운영 역량이 부족할 가능성이 높다. 초기 시장에는 Ubuntu + Docker/PM2 + Nginx + GitLab Runner 조합이 더 팔리기 쉽다. Kubernetes는 엔터프라이즈 옵션으로 두는 편이 현실적이다.

## 16. 폐쇄망 설치

사내망 제품은 인터넷이 안 되는 환경을 반드시 고려해야 한다.

폐쇄망 설치 패키지 예시:

```text
offline-bundle.tar.gz
  deb-packages/
  docker-images/
  npm-cache/
  gitlab-package/
  gitlab-runner-package/
  nodejs-package/
  platform-package/
  templates/
  install-manifest.yaml
```

폐쇄망 번들은 별도 상품으로 만들 수 있다. 제조, 금융, 공공, 병원 쪽에서는 이 기능이 구매 요인이 될 수 있다.

## 17. Preflight와 운영 패키지

설치 자동화에서 가장 중요한 것은 `preflight`다.

필수 점검:

```text
preflight checks
  -> Ubuntu 버전 확인
  -> root/sudo 권한 확인
  -> DNS 해석 확인
  -> 80/443 포트 충돌 확인
  -> GitLab 도메인 접속 가능성 확인
  -> wildcard domain 확인
  -> 디스크 용량 확인
  -> 메모리 확인
  -> 방화벽 확인
  -> outbound internet 가능 여부 확인
  -> 폐쇄망 설치 여부 확인
```

제품화하려면 다음도 필요하다.

- diagnostic bundle 생성
- backup/restore
- upgrade
- rollback
- uninstall 또는 data-preserving uninstall
- GitLab/Runner/Nginx/platform health check
- 인증서 만료 경고
- 앱별 owner 미확인/장기 미사용 알림

## 18. 과금 모델

추천은 설치비 + 연간 구독 + 운영지원이다. 순수 SaaS 구독형은 이 시장과 잘 맞지 않을 수 있다. 사내망 설치, 보안 검토, 장애 지원, 업그레이드가 필요하기 때문이다.

| 플랜 | 대상 | 가격 방향 |
| --- | --- | --- |
| Starter | 직원 100명에서 300명, 앱 20개 이하 | 초기 설치비 + 월/연 구독 |
| Business | 직원 300명에서 1,000명, 앱 100개 이하 | 구독 + SLA + 템플릿 커스터마이징 |
| Enterprise | 계열사/금융/공공/의료 | 별도 구축비 + 보안문서 + 운영대행 |
| Managed On-Prem | 고객 서버에 설치하되 원격 운영 지원 | 월 운영비 과금 |

가격 메시지는 "개발자 1명에서 2명 인건비보다 싸게 내부 앱 플랫폼을 갖는다"가 되어야 한다. 고객은 기능보다 IT팀 병목 제거, 보안사고 방지, 현업 자동화 속도에 돈을 낸다.

## 19. 가장 큰 리스크

첫 번째 리스크는 지원 비용이다. 고객마다 내부망, DNS, 방화벽, AD, GitLab 버전, Ubuntu 버전, 보안정책이 다르다. 매번 커스터마이징하면 SI가 되고, 제품 마진이 사라진다. 지원 OS, 네트워크 구조, GitLab 버전, Nginx 구조, 인증 방식을 제한해야 한다.

두 번째 리스크는 보안 책임이다. 직원이 AI로 만든 앱에서 개인정보가 새거나 DB가 깨지면 고객은 플랫폼을 탓할 수 있다. 그래서 제품 안에 "개발자는 자유롭게 만들되, 운영 반영은 정책을 통과해야 한다"는 구조가 필요하다.

세 번째 리스크는 구매자 혼선이다. 현업은 좋아하지만 예산은 IT팀에 있고, IT팀은 좋아하지만 보안팀이 막을 수 있다. CEO/IT팀장/보안팀 메시지를 분리해야 한다.

네 번째 리스크는 GitLab/Nginx/인증서 충돌이다. GitLab bundled Nginx와 platform gateway Nginx의 포트/도메인 설계가 흔히 꼬인다. PoC와 상용 v1의 구조를 분리해야 한다.

다섯 번째 리스크는 폐쇄망 설치 난이도다. GitLab package, Runner, Node, Docker image, npm cache, 템플릿, 취약점 DB를 어떻게 동봉하고 업데이트할지 설계해야 한다.

## 20. 추천 구현 순서

```text
1단계: idpctl installer 만들기
2단계: preflight와 config.yaml 확정
3단계: GitLab/Runner/Nginx 자동 설치 안정화
4단계: Platform API와 DB 만들기
5단계: 관리 대시보드 만들기
6단계: 사용자 앱 포털 만들기
7단계: Next.js 앱 생성/배포 end-to-end 자동화
8단계: 인증서/SSO/로그/백업/보안정책 강화
9단계: 폐쇄망 설치 번들 제공
10단계: 설치/업그레이드/장애진단 패키지화
```

첫 번째 기술 검증 목표는 다음 하나로 잡는다.

> Ubuntu 24.04 서버 한 대에서 `sudo idpctl install` 후, `https://sample.apps.company.internal` 샘플 앱이 열리고, GitLab repo와 pipeline 이력이 생성되어 있어야 한다.

## 21. 제품 이름 후보

카테고리명:

- 사내망 AI 앱 플랫폼
- Vibe Coding Internal App Factory
- GitLab 기반 사내 개발/배포 플랫폼
- Internal Developer Platform for AI-built Apps

제품명 후보:

- Internal Dev Platform
- VibeApp Platform for Ubuntu
- Intranet App Factory
- Handoff App Factory
- 사내앱 팩토리

한국 시장 첫 문장은 영어 약어보다 명확한 한국어가 좋다.

> 현업 직원이 AI로 만든 웹앱을 사내망에서 안전하게 만들고 배포하는 플랫폼.

그 다음 설명으로 IDP, GitLab CI/CD, 사내망 배포, DevSecOps를 붙이는 편이 좋다.

## 22. 최종 판단

이 아이디어는 단순한 니치가 아니라 AI 코딩 확산으로 새로 생기는 운영/보안 병목을 해결하는 니치다. 특히 이미 회사 내부에서 작동하는 솔루션을 만든 경험이 있다는 점이 크다.

다만 지금 상태 그대로 팔면 좋은 내부 자동화 도구이고, 제품으로 팔려면 반드시 다음 세 가지를 보강해야 한다.

1. 앱 카탈로그와 소유자 관리
2. 보안/승인/감사 체계
3. 반복 설치 가능한 appliance/운영 패키지

가장 중요한 설계 원칙은 다음이다.

> GitLab은 개발 저장소와 CI/CD 엔진으로 쓰고, 플랫폼은 사내 앱 생성/배포/운영의 관제탑이 되어야 한다.

가장 중요한 사업 원칙은 다음이다.

> 바이브코딩을 막는 보안 솔루션이 아니라, 바이브코딩을 사내 표준 경로 안으로 흡수하는 플랫폼으로 팔아야 한다.

## 23. 확인한 주요 근거

- Gartner Platform Engineering: https://www.gartner.com/en/infrastructure-and-it-operations-leaders/topics/platform-engineering
- Gartner Internal Developer Portals: https://www.gartner.com/reviews/market/internal-developer-portals
- GitLab AI Paradox survey release: https://about.gitlab.com/press/releases/2025-11-10-gitlab-survey-reveals-the-ai-paradox/
- Veracode 2025 GenAI Code Security Report summary: https://www.veracode.com/blog/genai-code-security-report/
- WIRED vibe-coded apps exposure report: https://www.wired.com/story/thousands-of-vibe-coded-apps-expose-corporate-and-personal-data-on-the-open-web/
- 금융위원회 2026-01-19 망분리 규제 개선 보도자료: https://www.fsc.go.kr/no010101/86080
- GitLab Ubuntu Linux package install: https://docs.gitlab.com/install/package/ubuntu/
- GitLab supported platforms: https://docs.gitlab.com/install/package/
- GitLab Runner Linux repository install: https://docs.gitlab.com/runner/install/linux-repository/
- GitLab Projects API: https://docs.gitlab.com/api/projects/
- GitLab CI/CD variables: https://docs.gitlab.com/ci/variables/
- GitLab Omnibus Nginx settings: https://docs.gitlab.com/omnibus/settings/nginx/
- Smallstep step-ca: https://smallstep.com/docs/step-ca/
- Nginx WebSocket proxying: https://nginx.org/en/docs/http/websocket.html
