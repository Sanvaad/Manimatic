/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/generate/route";
exports.ids = ["app/api/generate/route"];
exports.modules = {

/***/ "(rsc)/./app/api/generate/route.ts":
/*!***********************************!*\
  !*** ./app/api/generate/route.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _google_generative_ai__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @google/generative-ai */ \"(rsc)/./node_modules/@google/generative-ai/dist/index.mjs\");\n/* harmony import */ var fs_promises__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! fs/promises */ \"fs/promises\");\n/* harmony import */ var fs_promises__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(fs_promises__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var child_process__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! child_process */ \"child_process\");\n/* harmony import */ var child_process__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(child_process__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var util__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! util */ \"util\");\n/* harmony import */ var util__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(util__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! path */ \"path\");\n/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! fs */ \"fs\");\n/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_6__);\n\n\n// Supabase removed - using local storage\n\n\n\n\n\nconst execAsync = (0,util__WEBPACK_IMPORTED_MODULE_4__.promisify)(child_process__WEBPACK_IMPORTED_MODULE_3__.exec);\nconst genAI = new _google_generative_ai__WEBPACK_IMPORTED_MODULE_1__.GoogleGenerativeAI(process.env.GEMINI_API_KEY);\nconst model = genAI.getGenerativeModel({\n    model: 'gemini-2.0-flash'\n});\nasync function generateManimCode(userPrompt) {\n    const prompt = `\n    ${userPrompt}\n\n    Generate valid and executable Python code for a Manim animation based strictly on the official Manim documentation (https://docs.manim.community). \n\n    Instructions:\n    - Start with all required imports (e.g., 'from manim import *').\n    - Define a class named 'Animation' that inherits from 'Scene' or a relevant Scene subclass.\n    - Implement a 'construct' method containing the animation logic.\n    - Python code can contain explanations, if specified by user (as part of the animation itself, but should be non intrusive and non-overlapping)\n    - Do not assume any external assets (e.g., SVGs, images, audio). Everything must be created using Manim primitives, objects, and methods.\n    - The code must be fully self-contained, syntactically correct, and ready to run.\n    - Do not include explanations, comments, or markdown—only return the raw Python code \n    `;\n    const response = await model.generateContent(prompt);\n    let code = response.response.text();\n    // Clean up the response\n    code = code.replace(/```python\\n?/g, '').replace(/```\\n?/g, '').trim();\n    return code;\n}\nasync function saveAnimation(filePath) {\n    try {\n        const fileName = `animation_${Date.now()}.mp4`;\n        const publicDir = path__WEBPACK_IMPORTED_MODULE_5___default().join(process.cwd(), 'public', 'animations');\n        // Ensure animations directory exists\n        await (0,fs_promises__WEBPACK_IMPORTED_MODULE_2__.mkdir)(publicDir, {\n            recursive: true\n        });\n        const destPath = path__WEBPACK_IMPORTED_MODULE_5___default().join(publicDir, fileName);\n        const fileBuffer = fs__WEBPACK_IMPORTED_MODULE_6___default().readFileSync(filePath);\n        await (0,fs_promises__WEBPACK_IMPORTED_MODULE_2__.writeFile)(destPath, fileBuffer);\n        const publicUrl = `/animations/${fileName}`;\n        return {\n            url: publicUrl,\n            success: true\n        };\n    } catch (error) {\n        console.error('Save animation error:', error);\n        return {\n            success: false,\n            error: error\n        };\n    }\n}\nasync function POST(request) {\n    try {\n        const { prompt } = await request.json();\n        console.log('Received prompt:', prompt);\n        if (!prompt) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                message: \"Prompt is required\"\n            }, {\n                status: 400\n            });\n        }\n        // Generate Manim code\n        const manimCode = await generateManimCode(prompt);\n        // Create temporary directory for this animation\n        const tempDir = path__WEBPACK_IMPORTED_MODULE_5___default().join(process.cwd(), 'temp', `animation_${Date.now()}`);\n        await (0,fs_promises__WEBPACK_IMPORTED_MODULE_2__.mkdir)(tempDir, {\n            recursive: true\n        });\n        // Write the code to a file\n        const pythonFile = path__WEBPACK_IMPORTED_MODULE_5___default().join(tempDir, 'main.py');\n        await (0,fs_promises__WEBPACK_IMPORTED_MODULE_2__.writeFile)(pythonFile, manimCode);\n        // Run Manim to generate the animation\n        const outputDir = path__WEBPACK_IMPORTED_MODULE_5___default().join(tempDir, 'media');\n        await (0,fs_promises__WEBPACK_IMPORTED_MODULE_2__.mkdir)(outputDir, {\n            recursive: true\n        });\n        try {\n            await execAsync(`cd \"${tempDir}\" && manim -ql main.py Animation`);\n            // Find the generated video file\n            const videoPath = path__WEBPACK_IMPORTED_MODULE_5___default().join(tempDir, 'media', 'videos', 'main', '480p15', 'Animation.mp4');\n            if (!fs__WEBPACK_IMPORTED_MODULE_6___default().existsSync(videoPath)) {\n                throw new Error('Animation file not generated');\n            }\n            // Save animation locally\n            const uploadResult = await saveAnimation(videoPath);\n            if (!uploadResult.success) {\n                throw new Error('Failed to save animation');\n            }\n            // Clean up temporary files\n            fs__WEBPACK_IMPORTED_MODULE_6___default().rmSync(tempDir, {\n                recursive: true,\n                force: true\n            });\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                message: \"Success\",\n                url: uploadResult.url\n            }, {\n                status: 200\n            });\n        } catch (execError) {\n            console.error('Manim execution error:', execError);\n            // Clean up temporary files\n            fs__WEBPACK_IMPORTED_MODULE_6___default().rmSync(tempDir, {\n                recursive: true,\n                force: true\n            });\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                message: \"Failed to generate animation\",\n                error: execError instanceof Error ? execError.message : 'Unknown error'\n            }, {\n                status: 500\n            });\n        }\n    } catch (error) {\n        console.error('Generate endpoint error:', error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            message: \"Internal server error\",\n            error: error instanceof Error ? error.message : 'Unknown error'\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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N0IsTUFBTSxJQUFJRSxNQUFNO1lBQ2xCO1lBRUEseUJBQXlCO1lBQ3pCLE1BQU1DLGVBQWUsTUFBTTlCLGNBQWMyQjtZQUV6QyxJQUFJLENBQUNHLGFBQWFoQixPQUFPLEVBQUU7Z0JBQ3pCLE1BQU0sSUFBSWUsTUFBTTtZQUNsQjtZQUVBLDJCQUEyQjtZQUMzQjlDLGdEQUFTLENBQUN5QyxTQUFTO2dCQUFFaEIsV0FBVztnQkFBTXdCLE9BQU87WUFBSztZQUVsRCxPQUFPeEQscURBQVlBLENBQUMyQyxJQUFJLENBQUM7Z0JBQ3ZCRSxTQUFTO2dCQUNUUixLQUFLaUIsYUFBYWpCLEdBQUc7WUFDdkIsR0FBRztnQkFBRVMsUUFBUTtZQUFJO1FBRW5CLEVBQUUsT0FBT1csV0FBVztZQUNsQmpCLFFBQVFELEtBQUssQ0FBQywwQkFBMEJrQjtZQUN4QywyQkFBMkI7WUFDM0JsRCxnREFBUyxDQUFDeUMsU0FBUztnQkFBRWhCLFdBQVc7Z0JBQU13QixPQUFPO1lBQUs7WUFDbEQsT0FBT3hELHFEQUFZQSxDQUFDMkMsSUFBSSxDQUFDO2dCQUN2QkUsU0FBUztnQkFDVE4sT0FBT2tCLHFCQUFxQkosUUFBUUksVUFBVVosT0FBTyxHQUFHO1lBQzFELEdBQUc7Z0JBQUVDLFFBQVE7WUFBSTtRQUNuQjtJQUVGLEVBQUUsT0FBT1AsT0FBTztRQUNkQyxRQUFRRCxLQUFLLENBQUMsNEJBQTRCQTtRQUMxQyxPQUFPdkMscURBQVlBLENBQUMyQyxJQUFJLENBQUM7WUFDdkJFLFNBQVM7WUFDVE4sT0FBT0EsaUJBQWlCYyxRQUFRZCxNQUFNTSxPQUFPLEdBQUc7UUFDbEQsR0FBRztZQUFFQyxRQUFRO1FBQUk7SUFDbkI7QUFDRiIsInNvdXJjZXMiOlsiL1VzZXJzL3NhbnZhZHNoZW5kZS9Eb3dubG9hZHMvTWFuaW1hdGljLW1hc3RlciAyL2FwcC9hcGkvZ2VuZXJhdGUvcm91dGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmV4dFJlcXVlc3QsIE5leHRSZXNwb25zZSB9IGZyb20gJ25leHQvc2VydmVyJ1xuaW1wb3J0IHsgR29vZ2xlR2VuZXJhdGl2ZUFJIH0gZnJvbSAnQGdvb2dsZS9nZW5lcmF0aXZlLWFpJ1xuLy8gU3VwYWJhc2UgcmVtb3ZlZCAtIHVzaW5nIGxvY2FsIHN0b3JhZ2VcbmltcG9ydCB7IHdyaXRlRmlsZSwgbWtkaXIgfSBmcm9tICdmcy9wcm9taXNlcydcbmltcG9ydCB7IGV4ZWMgfSBmcm9tICdjaGlsZF9wcm9jZXNzJ1xuaW1wb3J0IHsgcHJvbWlzaWZ5IH0gZnJvbSAndXRpbCdcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXG5pbXBvcnQgZnMgZnJvbSAnZnMnXG5cbmNvbnN0IGV4ZWNBc3luYyA9IHByb21pc2lmeShleGVjKVxuXG5jb25zdCBnZW5BSSA9IG5ldyBHb29nbGVHZW5lcmF0aXZlQUkocHJvY2Vzcy5lbnYuR0VNSU5JX0FQSV9LRVkhKVxuY29uc3QgbW9kZWwgPSBnZW5BSS5nZXRHZW5lcmF0aXZlTW9kZWwoeyBtb2RlbDogJ2dlbWluaS0yLjAtZmxhc2gnIH0pXG5cbmFzeW5jIGZ1bmN0aW9uIGdlbmVyYXRlTWFuaW1Db2RlKHVzZXJQcm9tcHQ6IHN0cmluZykge1xuICBjb25zdCBwcm9tcHQgPSBgXG4gICAgJHt1c2VyUHJvbXB0fVxuXG4gICAgR2VuZXJhdGUgdmFsaWQgYW5kIGV4ZWN1dGFibGUgUHl0aG9uIGNvZGUgZm9yIGEgTWFuaW0gYW5pbWF0aW9uIGJhc2VkIHN0cmljdGx5IG9uIHRoZSBvZmZpY2lhbCBNYW5pbSBkb2N1bWVudGF0aW9uIChodHRwczovL2RvY3MubWFuaW0uY29tbXVuaXR5KS4gXG5cbiAgICBJbnN0cnVjdGlvbnM6XG4gICAgLSBTdGFydCB3aXRoIGFsbCByZXF1aXJlZCBpbXBvcnRzIChlLmcuLCAnZnJvbSBtYW5pbSBpbXBvcnQgKicpLlxuICAgIC0gRGVmaW5lIGEgY2xhc3MgbmFtZWQgJ0FuaW1hdGlvbicgdGhhdCBpbmhlcml0cyBmcm9tICdTY2VuZScgb3IgYSByZWxldmFudCBTY2VuZSBzdWJjbGFzcy5cbiAgICAtIEltcGxlbWVudCBhICdjb25zdHJ1Y3QnIG1ldGhvZCBjb250YWluaW5nIHRoZSBhbmltYXRpb24gbG9naWMuXG4gICAgLSBQeXRob24gY29kZSBjYW4gY29udGFpbiBleHBsYW5hdGlvbnMsIGlmIHNwZWNpZmllZCBieSB1c2VyIChhcyBwYXJ0IG9mIHRoZSBhbmltYXRpb24gaXRzZWxmLCBidXQgc2hvdWxkIGJlIG5vbiBpbnRydXNpdmUgYW5kIG5vbi1vdmVybGFwcGluZylcbiAgICAtIERvIG5vdCBhc3N1bWUgYW55IGV4dGVybmFsIGFzc2V0cyAoZS5nLiwgU1ZHcywgaW1hZ2VzLCBhdWRpbykuIEV2ZXJ5dGhpbmcgbXVzdCBiZSBjcmVhdGVkIHVzaW5nIE1hbmltIHByaW1pdGl2ZXMsIG9iamVjdHMsIGFuZCBtZXRob2RzLlxuICAgIC0gVGhlIGNvZGUgbXVzdCBiZSBmdWxseSBzZWxmLWNvbnRhaW5lZCwgc3ludGFjdGljYWxseSBjb3JyZWN0LCBhbmQgcmVhZHkgdG8gcnVuLlxuICAgIC0gRG8gbm90IGluY2x1ZGUgZXhwbGFuYXRpb25zLCBjb21tZW50cywgb3IgbWFya2Rvd27igJRvbmx5IHJldHVybiB0aGUgcmF3IFB5dGhvbiBjb2RlIFxuICAgIGBcbiAgXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgbW9kZWwuZ2VuZXJhdGVDb250ZW50KHByb21wdClcbiAgbGV0IGNvZGUgPSByZXNwb25zZS5yZXNwb25zZS50ZXh0KClcbiAgXG4gIC8vIENsZWFuIHVwIHRoZSByZXNwb25zZVxuICBjb2RlID0gY29kZS5yZXBsYWNlKC9gYGBweXRob25cXG4/L2csICcnKS5yZXBsYWNlKC9gYGBcXG4/L2csICcnKS50cmltKClcbiAgXG4gIHJldHVybiBjb2RlXG59XG5cbmFzeW5jIGZ1bmN0aW9uIHNhdmVBbmltYXRpb24oZmlsZVBhdGg6IHN0cmluZykge1xuICB0cnkge1xuICAgIGNvbnN0IGZpbGVOYW1lID0gYGFuaW1hdGlvbl8ke0RhdGUubm93KCl9Lm1wNGBcbiAgICBjb25zdCBwdWJsaWNEaXIgPSBwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSwgJ3B1YmxpYycsICdhbmltYXRpb25zJylcbiAgICBcbiAgICAvLyBFbnN1cmUgYW5pbWF0aW9ucyBkaXJlY3RvcnkgZXhpc3RzXG4gICAgYXdhaXQgbWtkaXIocHVibGljRGlyLCB7IHJlY3Vyc2l2ZTogdHJ1ZSB9KVxuICAgIFxuICAgIGNvbnN0IGRlc3RQYXRoID0gcGF0aC5qb2luKHB1YmxpY0RpciwgZmlsZU5hbWUpXG4gICAgY29uc3QgZmlsZUJ1ZmZlciA9IGZzLnJlYWRGaWxlU3luYyhmaWxlUGF0aClcbiAgICBhd2FpdCB3cml0ZUZpbGUoZGVzdFBhdGgsIGZpbGVCdWZmZXIpXG4gICAgXG4gICAgY29uc3QgcHVibGljVXJsID0gYC9hbmltYXRpb25zLyR7ZmlsZU5hbWV9YFxuICAgIHJldHVybiB7IHVybDogcHVibGljVXJsLCBzdWNjZXNzOiB0cnVlIH1cbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKCdTYXZlIGFuaW1hdGlvbiBlcnJvcjonLCBlcnJvcilcbiAgICByZXR1cm4geyBzdWNjZXNzOiBmYWxzZSwgZXJyb3I6IGVycm9yIH1cbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gUE9TVChyZXF1ZXN0OiBOZXh0UmVxdWVzdCkge1xuICB0cnkge1xuICAgIGNvbnN0IHsgcHJvbXB0IH0gPSBhd2FpdCByZXF1ZXN0Lmpzb24oKVxuICAgIGNvbnNvbGUubG9nKCdSZWNlaXZlZCBwcm9tcHQ6JywgcHJvbXB0KVxuICAgIFxuICAgIGlmICghcHJvbXB0KSB7XG4gICAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBtZXNzYWdlOiBcIlByb21wdCBpcyByZXF1aXJlZFwiIH0sIHsgc3RhdHVzOiA0MDAgfSlcbiAgICB9XG5cbiAgICAvLyBHZW5lcmF0ZSBNYW5pbSBjb2RlXG4gICAgY29uc3QgbWFuaW1Db2RlID0gYXdhaXQgZ2VuZXJhdGVNYW5pbUNvZGUocHJvbXB0KVxuICAgIFxuICAgIC8vIENyZWF0ZSB0ZW1wb3JhcnkgZGlyZWN0b3J5IGZvciB0aGlzIGFuaW1hdGlvblxuICAgIGNvbnN0IHRlbXBEaXIgPSBwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSwgJ3RlbXAnLCBgYW5pbWF0aW9uXyR7RGF0ZS5ub3coKX1gKVxuICAgIGF3YWl0IG1rZGlyKHRlbXBEaXIsIHsgcmVjdXJzaXZlOiB0cnVlIH0pXG4gICAgXG4gICAgLy8gV3JpdGUgdGhlIGNvZGUgdG8gYSBmaWxlXG4gICAgY29uc3QgcHl0aG9uRmlsZSA9IHBhdGguam9pbih0ZW1wRGlyLCAnbWFpbi5weScpXG4gICAgYXdhaXQgd3JpdGVGaWxlKHB5dGhvbkZpbGUsIG1hbmltQ29kZSlcbiAgICBcbiAgICAvLyBSdW4gTWFuaW0gdG8gZ2VuZXJhdGUgdGhlIGFuaW1hdGlvblxuICAgIGNvbnN0IG91dHB1dERpciA9IHBhdGguam9pbih0ZW1wRGlyLCAnbWVkaWEnKVxuICAgIGF3YWl0IG1rZGlyKG91dHB1dERpciwgeyByZWN1cnNpdmU6IHRydWUgfSlcbiAgICBcbiAgICB0cnkge1xuICAgICAgYXdhaXQgZXhlY0FzeW5jKGBjZCBcIiR7dGVtcERpcn1cIiAmJiBtYW5pbSAtcWwgbWFpbi5weSBBbmltYXRpb25gKVxuICAgICAgXG4gICAgICAvLyBGaW5kIHRoZSBnZW5lcmF0ZWQgdmlkZW8gZmlsZVxuICAgICAgY29uc3QgdmlkZW9QYXRoID0gcGF0aC5qb2luKHRlbXBEaXIsICdtZWRpYScsICd2aWRlb3MnLCAnbWFpbicsICc0ODBwMTUnLCAnQW5pbWF0aW9uLm1wNCcpXG4gICAgICBcbiAgICAgIGlmICghZnMuZXhpc3RzU3luYyh2aWRlb1BhdGgpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignQW5pbWF0aW9uIGZpbGUgbm90IGdlbmVyYXRlZCcpXG4gICAgICB9XG4gICAgICBcbiAgICAgIC8vIFNhdmUgYW5pbWF0aW9uIGxvY2FsbHlcbiAgICAgIGNvbnN0IHVwbG9hZFJlc3VsdCA9IGF3YWl0IHNhdmVBbmltYXRpb24odmlkZW9QYXRoKVxuICAgICAgXG4gICAgICBpZiAoIXVwbG9hZFJlc3VsdC5zdWNjZXNzKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignRmFpbGVkIHRvIHNhdmUgYW5pbWF0aW9uJylcbiAgICAgIH1cbiAgICAgIFxuICAgICAgLy8gQ2xlYW4gdXAgdGVtcG9yYXJ5IGZpbGVzXG4gICAgICBmcy5ybVN5bmModGVtcERpciwgeyByZWN1cnNpdmU6IHRydWUsIGZvcmNlOiB0cnVlIH0pXG4gICAgICBcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IFxuICAgICAgICBtZXNzYWdlOiBcIlN1Y2Nlc3NcIiwgXG4gICAgICAgIHVybDogdXBsb2FkUmVzdWx0LnVybCBcbiAgICAgIH0sIHsgc3RhdHVzOiAyMDAgfSlcbiAgICAgIFxuICAgIH0gY2F0Y2ggKGV4ZWNFcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcignTWFuaW0gZXhlY3V0aW9uIGVycm9yOicsIGV4ZWNFcnJvcilcbiAgICAgIC8vIENsZWFuIHVwIHRlbXBvcmFyeSBmaWxlc1xuICAgICAgZnMucm1TeW5jKHRlbXBEaXIsIHsgcmVjdXJzaXZlOiB0cnVlLCBmb3JjZTogdHJ1ZSB9KVxuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgXG4gICAgICAgIG1lc3NhZ2U6IFwiRmFpbGVkIHRvIGdlbmVyYXRlIGFuaW1hdGlvblwiLFxuICAgICAgICBlcnJvcjogZXhlY0Vycm9yIGluc3RhbmNlb2YgRXJyb3IgPyBleGVjRXJyb3IubWVzc2FnZSA6ICdVbmtub3duIGVycm9yJ1xuICAgICAgfSwgeyBzdGF0dXM6IDUwMCB9KVxuICAgIH1cbiAgICBcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKCdHZW5lcmF0ZSBlbmRwb2ludCBlcnJvcjonLCBlcnJvcilcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBcbiAgICAgIG1lc3NhZ2U6IFwiSW50ZXJuYWwgc2VydmVyIGVycm9yXCIsXG4gICAgICBlcnJvcjogZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiAnVW5rbm93biBlcnJvcidcbiAgICB9LCB7IHN0YXR1czogNTAwIH0pXG4gIH1cbn0iXSwibmFtZXMiOlsiTmV4dFJlc3BvbnNlIiwiR29vZ2xlR2VuZXJhdGl2ZUFJIiwid3JpdGVGaWxlIiwibWtkaXIiLCJleGVjIiwicHJvbWlzaWZ5IiwicGF0aCIsImZzIiwiZXhlY0FzeW5jIiwiZ2VuQUkiLCJwcm9jZXNzIiwiZW52IiwiR0VNSU5JX0FQSV9LRVkiLCJtb2RlbCIsImdldEdlbmVyYXRpdmVNb2RlbCIsImdlbmVyYXRlTWFuaW1Db2RlIiwidXNlclByb21wdCIsInByb21wdCIsInJlc3BvbnNlIiwiZ2VuZXJhdGVDb250ZW50IiwiY29kZSIsInRleHQiLCJyZXBsYWNlIiwidHJpbSIsInNhdmVBbmltYXRpb24iLCJmaWxlUGF0aCIsImZpbGVOYW1lIiwiRGF0ZSIsIm5vdyIsInB1YmxpY0RpciIsImpvaW4iLCJjd2QiLCJyZWN1cnNpdmUiLCJkZXN0UGF0aCIsImZpbGVCdWZmZXIiLCJyZWFkRmlsZVN5bmMiLCJwdWJsaWNVcmwiLCJ1cmwiLCJzdWNjZXNzIiwiZXJyb3IiLCJjb25zb2xlIiwiUE9TVCIsInJlcXVlc3QiLCJqc29uIiwibG9nIiwibWVzc2FnZSIsInN0YXR1cyIsIm1hbmltQ29kZSIsInRlbXBEaXIiLCJweXRob25GaWxlIiwib3V0cHV0RGlyIiwidmlkZW9QYXRoIiwiZXhpc3RzU3luYyIsIkVycm9yIiwidXBsb2FkUmVzdWx0Iiwicm1TeW5jIiwiZm9yY2UiLCJleGVjRXJyb3IiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/api/generate/route.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fgenerate%2Froute&page=%2Fapi%2Fgenerate%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fgenerate%2Froute.ts&appDir=%2FUsers%2Fsanvadshende%2FDownloads%2FManimatic-master%202%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fsanvadshende%2FDownloads%2FManimatic-master%202&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fgenerate%2Froute&page=%2Fapi%2Fgenerate%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fgenerate%2Froute.ts&appDir=%2FUsers%2Fsanvadshende%2FDownloads%2FManimatic-master%202%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fsanvadshende%2FDownloads%2FManimatic-master%202&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Users_sanvadshende_Downloads_Manimatic_master_2_app_api_generate_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/generate/route.ts */ \"(rsc)/./app/api/generate/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/generate/route\",\n        pathname: \"/api/generate\",\n        filename: \"route\",\n        bundlePath: \"app/api/generate/route\"\n    },\n    resolvedPagePath: \"/Users/sanvadshende/Downloads/Manimatic-master 2/app/api/generate/route.ts\",\n    nextConfigOutput,\n    userland: _Users_sanvadshende_Downloads_Manimatic_master_2_app_api_generate_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZnZW5lcmF0ZSUyRnJvdXRlJnBhZ2U9JTJGYXBpJTJGZ2VuZXJhdGUlMkZyb3V0ZSZhcHBQYXRocz0mcGFnZVBhdGg9cHJpdmF0ZS1uZXh0LWFwcC1kaXIlMkZhcGklMkZnZW5lcmF0ZSUyRnJvdXRlLnRzJmFwcERpcj0lMkZVc2VycyUyRnNhbnZhZHNoZW5kZSUyRkRvd25sb2FkcyUyRk1hbmltYXRpYy1tYXN0ZXIlMjAyJTJGYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj0lMkZVc2VycyUyRnNhbnZhZHNoZW5kZSUyRkRvd25sb2FkcyUyRk1hbmltYXRpYy1tYXN0ZXIlMjAyJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUErRjtBQUN2QztBQUNxQjtBQUMwQjtBQUN2RztBQUNBO0FBQ0E7QUFDQSx3QkFBd0IseUdBQW1CO0FBQzNDO0FBQ0EsY0FBYyxrRUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLHNEQUFzRDtBQUM5RDtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUMwRjs7QUFFMUYiLCJzb3VyY2VzIjpbIiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiL1VzZXJzL3NhbnZhZHNoZW5kZS9Eb3dubG9hZHMvTWFuaW1hdGljLW1hc3RlciAyL2FwcC9hcGkvZ2VuZXJhdGUvcm91dGUudHNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL2dlbmVyYXRlL3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvZ2VuZXJhdGVcIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL2dlbmVyYXRlL3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiL1VzZXJzL3NhbnZhZHNoZW5kZS9Eb3dubG9hZHMvTWFuaW1hdGljLW1hc3RlciAyL2FwcC9hcGkvZ2VuZXJhdGUvcm91dGUudHNcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MgfSA9IHJvdXRlTW9kdWxlO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICB3b3JrQXN5bmNTdG9yYWdlLFxuICAgICAgICB3b3JrVW5pdEFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgcGF0Y2hGZXRjaCwgIH07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC1yb3V0ZS5qcy5tYXAiXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fgenerate%2Froute&page=%2Fapi%2Fgenerate%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fgenerate%2Froute.ts&appDir=%2FUsers%2Fsanvadshende%2FDownloads%2FManimatic-master%202%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fsanvadshende%2FDownloads%2FManimatic-master%202&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "child_process":
/*!********************************!*\
  !*** external "child_process" ***!
  \********************************/
/***/ ((module) => {

"use strict";
module.exports = require("child_process");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ "fs/promises":
/*!******************************!*\
  !*** external "fs/promises" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("fs/promises");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/@google"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fgenerate%2Froute&page=%2Fapi%2Fgenerate%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fgenerate%2Froute.ts&appDir=%2FUsers%2Fsanvadshende%2FDownloads%2FManimatic-master%202%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fsanvadshende%2FDownloads%2FManimatic-master%202&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();