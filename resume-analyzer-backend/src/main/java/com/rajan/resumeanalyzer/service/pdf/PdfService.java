package com.rajan.resumeanalyzer.service.pdf;

import java.io.File;
import java.io.IOException;

public interface PdfService {

    String extractText(File pdfFile) throws IOException;

}