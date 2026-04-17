import os
from pathlib import Path

from playwright.sync_api import sync_playwright


BASE_URL = os.environ.get("AUDIT_BASE_URL", "http://127.0.0.1:4173")
ROOT = Path(__file__).resolve().parents[1]
SCREENSHOTS_DIR = ROOT / "screenshots"


def open_page(page, path: str):
    page.goto(f"{BASE_URL}{path}", wait_until="networkidle")
    page.wait_for_timeout(1200)


def main():
    SCREENSHOTS_DIR.mkdir(parents=True, exist_ok=True)

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)

        desktop_context = browser.new_context(
            viewport={"width": 1440, "height": 1600},
            color_scheme="light",
            locale="pt-BR",
        )
        desktop_page = desktop_context.new_page()

        open_page(desktop_page, "/login")
        desktop_page.screenshot(path=str(SCREENSHOTS_DIR / "login-desktop.png"), full_page=True)

        open_page(desktop_page, "/login")
        desktop_page.get_by_role("button", name="Entrar no Care Plus").click()
        desktop_page.wait_for_timeout(500)
        desktop_page.screenshot(path=str(SCREENSHOTS_DIR / "login-erro.png"), full_page=True)

        iphone = p.devices["iPhone 13"]
        mobile_context = browser.new_context(**iphone, locale="pt-BR", color_scheme="light")
        mobile_page = mobile_context.new_page()

        open_page(mobile_page, "/login")
        mobile_page.screenshot(path=str(SCREENSHOTS_DIR / "login-mobile.png"), full_page=True)

        mobile_context.close()
        desktop_context.close()
        browser.close()


if __name__ == "__main__":
    main()
