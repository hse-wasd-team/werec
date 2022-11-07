package ru.pepegma.asd.kwic;

import org.apache.commons.lang3.StringUtils;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class App {
    public static void main(String[] args) {
        final String path = args[0];
        List<String> text = readFromFile(path);
        Scanner scanner = new Scanner(System.in);
        System.out.println("Enter your query:");
        while (scanner.hasNext()){
            String query = scanner.nextLine();
            for (var index : Kwic.getKwicList(new ArrayList<>(List.of(query.split(" "))), text)){
                System.out.println(index );
            }
            System.out.println("Enter your query:");
        }
    }

    private static List<String> readFromFile(String path){
        BufferedReader reader;
        List<String> result = new ArrayList<>();
        try {
            reader = new BufferedReader(new FileReader(
                    path));
            String line = reader.readLine();
            while (line != null) {
                line = reader.readLine();
                if(line!= null)
                    result.add(line);
            }
            reader.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return result;
    }

}