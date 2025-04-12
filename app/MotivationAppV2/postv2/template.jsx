import React from "react";
import CodeMirrorEditor from "../../components/CodeMirrorEditor";

export default function template() {
    return (
        <div className="mb-32">
            <section id="section-0-0" className="mb-12 scroll-mt-24">
                <h2 className="text-3xl font-bold mb-4 font-gowun underline decoration-pink-500">챕터 제목</h2>
                <h3 className="text-xl font-bold mb-4 font-gowun underline decoration-sky-500">제목</h3>
                <p className="text-lg text-gray-900 dark:text-gray-200 font-gowun">
                    내용
                </p>

            </section>

            <section id="section-0-1" className="mb-12 scroll-mt-24">
                <h3 className="text-xl font-bold mb-4 font-gowun underline decoration-sky-500">제목</h3>
                <p className="text-lg text-gray-900 dark:text-gray-200 font-gowun">
                    내용
                </p>
                <CodeMirrorEditor
                    code={`코드 표시`} //value= 나 typescript 사용 불필요
                />

            </section>
        </div>
    );
}