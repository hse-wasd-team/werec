package ru.pepegma.asd.kwic;

import org.springframework.beans.factory.annotation.Autowired;

import java.text.Collator;
import java.util.*;
import java.util.stream.Collectors;

public class Kwic {
//    private final List<Filter> filters;

//

    private final static List<String> stopWords = Arrays.asList("of","the", "yes", "a", "an", "on", "behind", "and", "into", "in");//list of stop words
    public static List <String> getKwicList(List<String> query, List<String> text  ){
        List <String> result = new ArrayList<>();
        List <String> filteredQuery = query
                .stream()
                .map(String::toLowerCase)
                .filter(Kwic::filterStopwords)
                .collect(Collectors.toList());//sorting & removing stopwords
        text.forEach(it -> filterLine(filteredQuery,it, result));//filtering & shifting
        Collections.sort(result, Collator.getInstance());
        return result;
    }
    private static void filterLine(List<String> list, String text, List<String> result){
        list.forEach(it -> {
            if(text.toLowerCase().contains(it)){
                int i = text.toLowerCase().indexOf(it);
                String newText =  text.substring(i) +'/'+ text.substring(0,i);
                result.add(newText);
            }
        });
    }
    private  static boolean filterStopwords(String word){
       return !stopWords.contains(word);

    }
}
